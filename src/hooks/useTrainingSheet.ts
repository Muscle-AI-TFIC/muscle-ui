import { useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
	TrainingSheet,
	TrainingSheetExercise,
} from "@/types/interfaces/trainingSheet";

interface ExerciseWithCompletion extends TrainingSheetExercise {
	completed?: boolean;
}

interface TrainingSheetWithCompletion
	extends Omit<TrainingSheet, "training_sheet_exercises"> {
	training_sheet_exercises: ExerciseWithCompletion[];
}

const TRAINING_SHEET_STORAGE_KEY = "@MuscleUI:trainingSheets";

export function useTrainingSheet() {
	const [expandedDay, setExpandedDay] = useState<string | null>(null);
	const [trainingSheets, setTrainingSheets] = useState<
		TrainingSheetWithCompletion[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [newExercise, setNewExercise] = useState<{ [key: string]: string }>({});
	const [isAddDayModalVisible, setIsAddDayModalVisible] = useState(false);

	useEffect(() => {
		fetchTrainingSheet();
	}, []);

	const fetchTrainingSheet = async () => {
		setLoading(true);
		try {
			const storedSheets = await AsyncStorage.getItem(
				TRAINING_SHEET_STORAGE_KEY,
			);
			if (storedSheets) {
				setTrainingSheets(JSON.parse(storedSheets));
			}
		} catch (error) {
			console.error("Error fetching training sheet from storage:", error);
			Alert.alert(
				"Erro",
				"Não foi possível carregar a ficha de treino do dispositivo",
			);
		}
		setLoading(false);
	};

	const handleSave = async () => {
		if (trainingSheets.length === 0) {
			Alert.alert(
				"Atenção",
				"Adicione pelo menos um dia de treino antes de salvar",
			);
			return;
		}

		try {
			await AsyncStorage.setItem(
				TRAINING_SHEET_STORAGE_KEY,
				JSON.stringify(trainingSheets),
			);
			Alert.alert("Sucesso", "Ficha de treino salva com sucesso!");
		} catch (error) {
			console.error("Error saving training sheet to storage:", error);
			Alert.alert(
				"Erro",
				"Não foi possível salvar a ficha de treino no dispositivo",
			);
		}
	};

	const toggleDay = (day: string) => {
		setExpandedDay(expandedDay === day ? null : day);
	};

	const toggleExerciseCompletion = (day: string, index: number) => {
		setTrainingSheets((prev) =>
			prev.map((sheet) => {
				if (sheet.title === day) {
					const updatedExercises = [...sheet.training_sheet_exercises];
					updatedExercises[index] = {
						...updatedExercises[index],
						completed: !updatedExercises[index].completed,
					};
					return { ...sheet, training_sheet_exercises: updatedExercises };
				}
				return sheet;
			}),
		);
	};

	const addExercise = (day: string) => {
		const exerciseName = newExercise[day]?.trim();
		if (!exerciseName) {
			Alert.alert("Atenção", "Digite o nome do exercício");
			return;
		}

		const exercise: ExerciseWithCompletion = {
			name: exerciseName,
			sets: 3,
			reps: 12,
			weight: 10,
			completed: false,
		};

		setTrainingSheets((prev) =>
			prev.map((sheet) => {
				if (sheet.title === day) {
					return {
						...sheet,
						training_sheet_exercises: [
							...sheet.training_sheet_exercises,
							exercise,
						],
					};
				}
				return sheet;
			}),
		);

		setNewExercise((prev) => ({ ...prev, [day]: "" }));
	};

	const removeExercise = (day: string, index: number) => {
		Alert.alert("Confirmar", "Deseja remover este exercício?", [
			{ text: "Cancelar", style: "cancel" },
			{
				text: "Remover",
				style: "destructive",
				onPress: () => {
					setTrainingSheets((prev) =>
						prev.map((sheet) => {
							if (sheet.title === day) {
								const newExercises = sheet.training_sheet_exercises.filter(
									(_, i) => i !== index,
								);
								return { ...sheet, training_sheet_exercises: newExercises };
							}
							return sheet;
						}),
					);
				},
			},
		]);
	};

	const handleAddDay = (dayName: string) => {
		if (trainingSheets.some((sheet) => sheet.title === dayName)) {
			Alert.alert("Atenção", "Esse dia já existe");
			return;
		}

		const newSheet: TrainingSheetWithCompletion = {
			title: dayName,
			training_sheet_exercises: [],
		};

		setTrainingSheets((prev) => [...prev, newSheet]);
		setExpandedDay(dayName);
	};

	const removeDay = (day: string) => {
		Alert.alert(
			"Confirmar",
			`Deseja remover o dia "${day}" e todos os seus exercícios?`,
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Remover",
					style: "destructive",
					onPress: () => {
						setTrainingSheets((prev) =>
							prev.filter((sheet) => sheet.title !== day),
						);
						if (expandedDay === day) {
							setExpandedDay(null);
						}
					},
				},
			],
		);
	};

	return {
		expandedDay,
		trainingSheets,
		loading,
		newExercise,
		isAddDayModalVisible,
		setNewExercise,
		setIsAddDayModalVisible,
		toggleDay,
		toggleExerciseCompletion,
		addExercise,
		removeExercise,
		handleAddDay,
		removeDay,
		handleSave,
	};
}
