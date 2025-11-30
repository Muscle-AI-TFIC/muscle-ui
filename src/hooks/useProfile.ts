import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
	loadProfileImage,
	pickImageFromGallery,
	removeProfileImage,
	saveProfileImage,
} from "@/services/image";
import {
	loadUserProfile,
	logoutUser,
	updateUserProfile,
} from "@/services/profile";
import { supabase } from "@/services/supabase";
import type { UserInfo } from "@/types/UserInfo";
import { calculateIMC } from "@/utils/calcImc";
import { calculateAge } from "@/utils/calcAge";

export function useProfile() {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
	const [userEmail, setUserEmail] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [userId, setUserId] = useState<string>("");

	const initializeProfile = useCallback(async () => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (user) {
				setUserId(user.id);

				await loadUserProfile({
					userId: user.id,
					setUserInfo: (info) => {
						setUserInfo(info);
						if (info?.name) {
							setUserName(info.name);
						}
					},
					setUserEmail,
					setUserName,
				});

				const savedImage = await loadProfileImage();
				if (savedImage) {
					setImage(savedImage);
				}
			}
		} catch (error) {
			console.error("Erro ao inicializar perfil:", error);
		} finally {
			setLoadingProfile(false);
		}
	}, []);

	useEffect(() => {
		initializeProfile();
	}, [initializeProfile]);

	const handlePickImage = async () => {
		const imageUri = await pickImageFromGallery();

		if (imageUri) {
			setImage(imageUri);
			await saveProfileImage(imageUri);
		}
	};

	const handleRemoveImage = () => {
		Alert.alert("Remover Foto", "Deseja remover sua foto de perfil?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Remover",
				style: "destructive",
				onPress: async () => {
					try {
						await removeProfileImage();
						setImage(null);
						Alert.alert("Sucesso", "Foto removida com sucesso!");
					} catch (_error) {
						Alert.alert("Erro", "Não foi possível remover a foto");
					}
				},
			},
		]);
	};

	const handleSaveUserInfo = async () => {
		if (!userInfo) return;

		await updateUserProfile({
			userId,
			userInfo,
			onSuccess: () => {
				setModalVisible(false);
			},
			setLoading,
		});
	};

	const handleLogout = () => {
		Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Sair",
				style: "destructive",
				onPress: async () => {
					await logoutUser({
						setLoading,
						onSuccess: async () => {
							await removeProfileImage();
							router.replace("/auth/login");
						},
					});
				},
			},
		]);
	};

	return {
		image,
		loading,
		loadingProfile,
		userEmail,
		userName,
		modalVisible,
		userInfo,
		setImage,
		setLoading,
		setLoadingProfile,
		setUserEmail,
		setUserName,
		setModalVisible,
		setUserInfo,
		handlePickImage,
		handleRemoveImage,
		handleSaveUserInfo,
		handleLogout,
		calculateIMC,
		calculateAge,
	};
}
