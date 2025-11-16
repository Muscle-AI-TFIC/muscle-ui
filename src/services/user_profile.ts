import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const STORAGE_KEYS = {
	PROFILE_IMAGE: "@profile_image",
};

export const getData = async (id: string) => {
	const url = `${API_BASE_URL}/userProfile/${id}`;
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": API_KEY || "",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const json = await response.json();
		return json;
	} catch (error) {
		console.error("Erro ao buscar dados:", error);
		return null;
	}
};

export const loadProfileImage = async () => {
	try {
		const savedImage = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE);
		return savedImage;
	} catch (error) {
		console.error("Erro ao carregar imagem:", error);
		return null;
	}
};

export const saveProfileImage = async (imageUri: string) => {
	try {
		await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, imageUri);
	} catch (error) {
		Alert.alert("Erro", "Não foi possível salvar a imagem");
	}
};

export const removeProfileImage = async () => {
	try {
		await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
	} catch (error) {
		console.error("Erro ao remover imagem:", error);
		Alert.alert("Erro", "Não foi possível remover a imagem");
	}
};
