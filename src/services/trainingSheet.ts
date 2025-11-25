import { Alert } from "react-native";
import type {
	TrainingSheetExercise,
	TrainingSheetResponse,
} from "@/types/interfaces/trainingSheet";
import { supabase } from "./supabase";

export const getTrainingSheet =
	async (): Promise<TrainingSheetResponse | null> => {
		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session || !user) {
				Alert.alert("Erro", "Usuário não autenticado");
				return null;
			}

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_API_BASE_URL}/trainingSheet/${user.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${session.access_token}`,
					},
				},
			);

			const data = await response.json();
			return data;
		} catch (error: unknown) {
			console.error("Erro ao buscar a ficha de treino:", error);
			Alert.alert("Erro", "Não foi possível buscar a ficha de treino");
			return null;
		}
	};

export const createTrainingSheet = async (
	title: string,
	exercises: TrainingSheetExercise[],
): Promise<boolean> => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session || !user) {
			Alert.alert("Erro", "Usuário não autenticado");
			return false;
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/trainingSheet`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
				},
				body: JSON.stringify({
					user_id: user.id,
					title,
					exercises,
				}),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `HTTP error! status: ${response.status}`,
			);
		}

		return true;
	} catch (error: unknown) {
		let message = "Não foi possível criar a ficha de treino";
		if (error instanceof Error) {
			message = error.message;
		}
		console.error("Erro ao criar a ficha de treino:", error);
		Alert.alert("Erro", message);
		return false;
	}
};

export const deleteTrainingSheet = async (id: number): Promise<boolean> => {
	try {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return false;
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/trainingSheet/${id}`,
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

		return true;
	} catch (error: unknown) {
		console.error("Erro ao deletar a ficha de treino:", error);
		Alert.alert("Erro", "Não foi possível deletar a ficha de treino");
		return false;
	}
};
