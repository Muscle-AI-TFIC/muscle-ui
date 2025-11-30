import { useState } from "react";
import type { Exercise } from "@/types/interfaces/exercises";

export const useExerciseDetails = () => {
	const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
		null,
	);
	const [detailsVisible, setDetailsVisible] = useState(false);

	const showExerciseDetails = (exercise: Exercise) => {
		setSelectedExercise(exercise);
		setDetailsVisible(true);
	};

	const closeExerciseDetails = () => {
		setDetailsVisible(false);
		setSelectedExercise(null);
	};

	return {
		selectedExercise,
		detailsVisible,
		showExerciseDetails,
		closeExerciseDetails,
	};
};
