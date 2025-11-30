import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { supabase } from "./supabase";

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
	} catch (_error) {
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

export const updateFirstAccessStatus = async (
	userId: string,
	status: boolean,
): Promise<boolean> => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return false;
		}

		const response = await fetch(
			`${API_BASE_URL}/userProfile/${userId}/first-access`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
					"x-api-key": API_KEY || "",
				},
				body: JSON.stringify({ first_access: status }),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`,
			);
		}

		return true;
	} catch (error: any) {
		console.error("Erro ao atualizar status de primeiro acesso:", error);
		Alert.alert(
			"Erro",
			`Não foi possível atualizar o status de primeiro acesso: ${error.message}`,
		);
		return false;
	}
};

export const getFirstAccessStatus = async (
	userId: string,
): Promise<boolean | null> => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		console.log("Session inside getFirstAccessStatus:", session);
		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return null;
		}

		const response = await fetch(
			`${API_BASE_URL}/userProfile/${userId}/first-access`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
					"x-api-key": API_KEY || "",
				},
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data.message.data.first_access;
	} catch (error: any) {
		console.error("Erro ao buscar status de primeiro acesso:", error);
		Alert.alert(
			"Erro",
			`Não foi possível buscar o status de primeiro acesso: ${error.message}`,
		);
		return null;
	}
};

export const updateWaitingStatus = async (
	userId: string,
	status: boolean,
): Promise<boolean> => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return false;
		}

		const response = await fetch(`${API_BASE_URL}/waiting/${userId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${session.access_token}`,
				"x-api-key": API_KEY || "",
			},
			body: JSON.stringify({ status }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`,
			);
		}

		Alert.alert("Sucesso", "Status de espera atualizado com sucesso!");
		return true;
	} catch (error: any) {
		console.error("Erro ao atualizar status de espera:", error);
		Alert.alert(
			"Erro",
			`Não foi possível atualizar o status de espera: ${error.message}`,
		);
		return false;
	}
};

