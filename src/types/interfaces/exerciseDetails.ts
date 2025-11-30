import type { Exercise } from "@/types/interfaces/exercises";

export interface ExerciseDetailsProps {
	exercise: Exercise | null;
	visible: boolean;
	onClose: () => void;
}
