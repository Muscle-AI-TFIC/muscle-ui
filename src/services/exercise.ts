import { Alert } from "react-native";
import type { Exercise, WorkoutData } from "@/types/interfaces/exercises";
import { supabase } from "./supabase";

interface DailyWorkoutExerciseItem {
	id: { toString: () => string };
	exercises: {
		name: string;
		description: string;
		difficulty: string;
		duration_minutes: number;
		gif_url: string;
	};
	finished: boolean;
	sets: number;
	reps: number;
	position: number;
}

export const getExercises = async (): Promise<WorkoutData | null> => {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			Alert.alert("Erro", "Usuário não autenticado");
			return null;
		}

		const response = await fetch(
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/workout/${user?.id}`,
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

		const data = await response.json();

		if (
			data?.message &&
			Array.isArray(data.message.data) &&
			data.message.data.length > 0 &&
			Array.isArray(data.message.data[0].daily_workout_exercises)
		) {
			const workoutId = data.message.data[0].id;
			const exercises = data.message.data[0].daily_workout_exercises.map(
				(item: DailyWorkoutExerciseItem) => ({
					id: item.id.toString(),
					name: item.exercises.name,
					finished: item.finished,
					sets: item.sets,
					reps: item.reps,
					position: item.position,
					description: item.exercises.description,
					difficulty: item.exercises.difficulty,
					duration_minutes: item.exercises.duration_minutes,
					url: item.exercises.gif_url,
				}),
			) as Exercise[];

			return { exercises, workoutId };
		}
		return null;
	} catch (error: unknown) {
		console.error("Erro ao buscar exercícios:", error);
		Alert.alert("Erro", "Não foi possível buscar os exercícios");
		return null;
	}
};

export const updateWorkoutStatus = async (
	workoutId: number,
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
			`${process.env.EXPO_PUBLIC_API_BASE_URL}/workoutUpdateStatus/${workoutId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session.access_token}`,
				},
				body: JSON.stringify({}), // Added an empty JSON body
			},
		);

		if (!response.ok) {
			const errorBody = await response.text();
			console.error(
				`HTTP error! status: ${response.status}, body: ${errorBody}`,
			);
			Alert.alert(
				"Erro",
				`Não foi possível atualizar o status do treino: ${errorBody}`,
			);
			throw new Error(
				`HTTP error! status: ${response.status}, body: ${errorBody}`,
			);
		}

		return true;
	} catch (error: unknown) {
		console.error("Erro ao atualizar status do treino:", error);
		Alert.alert("Erro", "Não foi possível atualizar o status do treino");
		return false;
	}
};
