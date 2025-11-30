import { Alert } from "react-native";
import { supabase } from "@/services/supabase";
import type { LoadProfileParams } from "@/types/interfaces/load";
import type { LogoutParams } from "@/types/interfaces/logout";
import type { UpdateProfileParams } from "@/types/interfaces/update";
import type { UserInfo } from "@/types/UserInfo";

export const loadUserProfile = async ({
	userId,
	setUserInfo,
	setUserEmail,
	setUserName,
}: LoadProfileParams) => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return;
		}

		if (user) {
			setUserEmail(user.email || "");
			setUserName(
				user.user_metadata?.name || user.email?.split("@")[0] || "Usuário",
			);

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_BASE_URL}/userProfile/${userId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${session.access_token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const profileData = await response.json();

			if (profileData) {
				setUserInfo(profileData.message.data as UserInfo);
			}
		}
	} catch (error: unknown) {
		console.error("Erro ao carregar perfil:", error);
		Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
	}
};

// Atualizar perfil
export const updateUserProfile = async ({
	userId,
	userInfo,
	onSuccess,
	setLoading,
}: UpdateProfileParams) => {
	// Validações
	if (!userInfo.weight_kg || userInfo.weight_kg <= 0) {
		Alert.alert("Erro", "Peso inválido");
		return;
	}

	if (!userInfo.height_cm || userInfo.height_cm <= 0) {
		Alert.alert("Erro", "Altura inválida");
		return;
	}

	if (setLoading) setLoading(true);

	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return;
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/userProfile/${userId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
				},
				body: JSON.stringify(userInfo),
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
		onSuccess();
	} catch (error: unknown) {
		console.error("Erro ao atualizar perfil:", error);
		Alert.alert("Erro", "Não foi possível atualizar o perfil");
	} finally {
		if (setLoading) setLoading(false);
	}
};

export const deleteUserProfile = async (userId: string) => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return;
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/deleteProfile/${userId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		Alert.alert("Sucesso", "Perfil excluído com sucesso!");
	} catch (error: unknown) {
		console.error("Erro ao excluir perfil:", error);
		Alert.alert("Erro", "Não foi possível excluir o perfil");
	}
};

// Fazer logout
export const logoutUser = async ({ setLoading, onSuccess }: LogoutParams) => {
	setLoading(true);

	try {
		const { error } = await supabase.auth.signOut();

		if (error) throw error;

		onSuccess();
	} catch (error: unknown) {
		console.error("Erro ao fazer logout:", error);
		Alert.alert("Erro", "Não foi possível sair da conta");
	} finally {
		setLoading(false);
	}
};
