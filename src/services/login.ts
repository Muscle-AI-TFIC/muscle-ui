import { router } from "expo-router";
import { Alert } from "react-native";
import type { LoginParams } from "@/types/interfaces/loginParams";
import { supabase } from "./supabase";

export const loginUser = async ({
	email,
	password,
	setLoading,
	onSuccess,
}: LoginParams) => {
	if (!email || !password) {
		Alert.alert("Erro", "Preencha todos os campos");
		return;
	}

	setLoading(true);

	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.trim().toLowerCase(),
			password: password,
		});

		if (error) throw error;

		const userEmail = data.user?.email || email;
		onSuccess(userEmail);
	} catch (error: unknown) {
		let message = "Falha no login";
		if (error instanceof Error) {
			message = error.message;
		}
		Alert.alert("Erro", message);
	} finally {
		setLoading(false);
	}
};

export const navigateToHome = () => {
	router.push("/tabs/home");
};

export const navigateToRegister = () => {
	router.push("/auth/register");
};
