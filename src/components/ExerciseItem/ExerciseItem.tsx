import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/styles/TrainingSheet';
import type { TrainingSheetExercise } from '@/types/interfaces/trainingSheet';

interface ExerciseWithCompletion extends TrainingSheetExercise {
  completed?: boolean;
}

interface ExerciseItemProps {
  item: ExerciseWithCompletion;
  index: number;
  day: string;
  toggleExerciseCompletion: (day: string, index: number) => void;
  removeExercise: (day: string, index: number) => void;
}

export function ExerciseItem({ item, index, day, toggleExerciseCompletion, removeExercise }: ExerciseItemProps) {
  return (
    <View style={styles.exerciseRow}>
      <TouchableOpacity
        onPress={() => toggleExerciseCompletion(day, index)}
        style={styles.checkboxContainer}
      >
        <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <Text style={[styles.exerciseText, item.completed && styles.exerciseTextCompleted]}>
        {item.name}
      </Text>
      
      <TouchableOpacity
        onPress={() => removeExercise(day, index)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}
