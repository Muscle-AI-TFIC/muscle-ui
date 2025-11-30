import { router } from "expo-router";
import { Alert } from "react-native";
import { ZodError } from "zod";
import { registerSchema } from "@/types/registerSchema";
import { supabase } from "./supabase";

export const submitRegistration = async (
	formData: Record<string, string>,
	setLoading: (loading: boolean) => void,
) => {
	try {
		const validated = registerSchema.parse(formData);
		setLoading(true);

		const { data, error } = await supabase.auth.signUp({
			email: formData.email.trim().toLowerCase(),
			password: formData.password,
		});

		if (error) throw error;

		if (data.user) {
			const profileData = {
				id: data.user.id,
				name: formData.name.trim(),
				birth_date: validated.dataNascimento,
				height_cm: validated.altura,
				weight_kg: validated.peso,
				gender: validated.gender,
				fitness_level: validated.fitness_level,
				goal: formData.goal.trim(),
			};

			const { error: insertError } = await supabase
				.from("user_profiles")
				.insert(profileData);

			if (insertError) {
				console.error("Error inserting profile:", insertError);
				throw insertError;
			}
		}

		Alert.alert("Sucesso!", "Registro realizado! Verifique seu email.", [
			{ text: "OK", onPress: () => router.replace("/tabs/welcome") },
		]);
	} catch (err: unknown) {
		let message = "Ocorreu um erro durante o registro.";
		if (err instanceof ZodError) {
			message = "Por favor, corrija os erros no formulário";
		} else if (err instanceof Error) {
			message = err.message;
		}
		Alert.alert("Erro", message);
	} finally {
		setLoading(false);
	}
};
