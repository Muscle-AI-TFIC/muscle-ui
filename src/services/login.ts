import type { LoginParams } from "@/types/interfaces/loginParams";
import { supabase } from "./supabase";
import { Alert } from "react-native";
import { router } from "expo-router";

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
	} catch (error: any) {
		Alert.alert("Erro", error.message || "Falha no login");
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
