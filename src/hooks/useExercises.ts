import { useEffect, useMemo, useState } from "react";
import { exerciseService } from "@/services/exercise";
import type { Exercise } from "@/types/interfaces/exercises";

export const useExercises = () => {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [showCongrats, setShowCongrats] = useState(false);

	useEffect(() => {
		const initialExercises = exerciseService.getExercises();
		setExercises(initialExercises);
	}, []);

	const sortedExercises = useMemo(() => {
		return exerciseService.sortExercisesByPosition(exercises);
	}, [exercises]);

	const stats = useMemo(() => {
		return exerciseService.calculateProgress(exercises);
	}, [exercises]);

	useEffect(() => {
		if (stats.completed === stats.total && stats.total > 0) {
			setShowCongrats(true);
		}
	}, [stats.completed, stats.total]);

	const toggleComplete = (id: string) => {
		setExercises((prevExercises) =>
			exerciseService.updateExerciseCompletion(prevExercises, id),
		);
	};

	const closeCongrats = () => {
		setShowCongrats(false);
	};

	return {
		exercises: sortedExercises,
		stats,
		showCongrats,
		toggleComplete,
		closeCongrats,
	};
};
