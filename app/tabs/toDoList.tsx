import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import CongratsModal from "@/components/CongratsModal";
import ExerciseDetails from "@/components/ExerciseDetails";
import ExerciseItem from "@/components/ExerciseItem";
import ProgressBar from "@/components/ProgressBar";
import { getExercises, updateWorkoutStatus } from "@/services/exercise";
import { styles } from "@/styles/ToDo";
import type { Exercise } from "@/types/interfaces/exercises";

export default function ToDoList() {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [workoutId, setWorkoutId] = useState<number | null>(null);
	const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
		null,
	);
	const [detailsVisible, setDetailsVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			const fetchExercises = async () => {
				setLoading(true);
				const data = await getExercises();
				if (data) {
					setExercises(data.exercises);
					setWorkoutId(data.workoutId);
				}
				setLoading(false);
			};

			fetchExercises();
		}, []),
	);

	const sortedExercises = [...exercises].sort(
		(a, b) => a.position - b.position,
	);

	const completedExercises = exercises.filter((ex) => ex.finished).length;
	const totalExercises = exercises.length;
	const allExercisesCompleted =
		completedExercises === totalExercises && totalExercises > 0;
	const [showCongrats, setShowCongrats] = useState(false);

	const handleFinishWorkout = async () => {
		console.log("Finalizando treino com ID:", workoutId);
		if (workoutId) {
			await updateWorkoutStatus(workoutId);
			setShowCongrats(true);
		}
	};

	const showExerciseDetails = (exercise: Exercise) => {
		setSelectedExercise(exercise);
		setDetailsVisible(true);
	};

	const closeExerciseDetails = () => {
		setDetailsVisible(false);
		setSelectedExercise(null);
	};

	const toggleComplete = (id: string) => {
		setExercises((prevExercises) =>
			prevExercises.map((ex) =>
				ex.id === id ? { ...ex, finished: !ex.finished } : ex,
			),
		);
	};

	const renderItem = ({ item }: { item: Exercise }) => (
		<ExerciseItem
			exercise={item}
			onToggleComplete={toggleComplete}
			onShowDetails={showExerciseDetails}
		/>
	);

	if (loading) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator size="large" color="#bb6c12ff" />
				<Text style={{ marginTop: 16, color: "#fff" }}>
					Carregando exercícios...
				</Text>
			</View>
		);
	}

	if (exercises.length === 0) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator size="large" color="#FFA500" />
				<Text
					style={{
						fontSize: 24,
						fontWeight: "bold",
						color: "#fff",
						marginTop: 20,
						textAlign: "center",
					}}
				>
					Seu treino está sendo preparado!
				</Text>
				<Text
					style={{
						fontSize: 16,
						color: "#8E8E93",
						marginTop: 10,
						textAlign: "center",
					}}
				>
					Volte mais tarde para conferir.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exercícios do Dia</Text>
			<FlatList
				data={sortedExercises}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				style={styles.list}
			/>
			<ProgressBar completed={completedExercises} total={totalExercises} />

			{allExercisesCompleted && (
				<TouchableOpacity
					style={styles.finishButton}
					onPress={handleFinishWorkout}
				>
					<Text style={styles.finishButtonText}>Finalizar Treino</Text>
				</TouchableOpacity>
			)}

			<ExerciseDetails
				exercise={selectedExercise}
				visible={detailsVisible}
				onClose={closeExerciseDetails}
			/>

			<CongratsModal
				visible={showCongrats}
				onClose={() => {
					setShowCongrats(false);
					router.push("/tabs/home");
				}}
			/>
		</View>
	);
}
