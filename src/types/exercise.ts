export interface Exercise {
  id: string;
  name: string;
  completed: boolean;
  sets: number;
  reps: number;
  position: number;
  description?: string;
  difficulty?: string;
  duration_minutes?: number;
}

export interface ExerciseDetailsProps {
  exercise: Exercise | null;
  visible: boolean;
  onClose: () => void;
}