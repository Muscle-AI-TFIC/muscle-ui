import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Exercise } from '@/types/interfaces/exercises';
import { styles } from '@/styles/ToDo';

interface ExerciseItemProps {
  exercise: Exercise;
  onToggleComplete: (id: string) => void;
  onShowDetails: (exercise: Exercise) => void;
}

export default function ExerciseItem({
  exercise,
  onToggleComplete,
  onShowDetails,
}: ExerciseItemProps) {
  return (
    <View style={styles.exerciseItem}>
      <TouchableOpacity onPress={() => onToggleComplete(exercise.id)} style={styles.checkbox}>
        <Ionicons
          name={exercise.finished ? 'checkmark-circle-outline' : 'square-outline'}
          size={24}
          color={exercise.finished ? 'orange' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onShowDetails(exercise)}
        style={styles.exerciseInfo}
      >
        <Text style={[styles.exerciseName, exercise.finished && styles.completedExerciseName]}>
          {exercise.position}° {exercise.name}
        </Text>
        <Text style={styles.exerciseDetails}>
          {exercise.sets} séries × {exercise.reps} {exercise.reps > 1 ? 'repetições' : 'repetição'}
        </Text>
        {exercise.difficulty && (
          <Text style={styles.exerciseDifficulty}>
            Dificuldade: {exercise.difficulty}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onShowDetails(exercise)}
        style={styles.detailsButton}
      >
        <Ionicons name="information-circle-outline" size={24} color="#FFA500" />
      </TouchableOpacity>
    </View>
  );
}
