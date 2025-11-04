import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../types/Exercise';
import { styles } from '@/components/ExerciseItem/exerciseItemStyles';

interface ExerciseItemProps {
  item: Exercise;
  onToggleComplete: (id: string) => void;
  onShowDetails: (exercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  item,
  onToggleComplete,
  onShowDetails
}) => {
  return (
    <View style={styles.exerciseItem}>
      <TouchableOpacity onPress={() => onToggleComplete(item.id)} style={styles.checkbox}>
        <Ionicons
          name={item.completed ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={item.completed ? 'green' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onShowDetails(item)}
        style={styles.exerciseInfo}
      >
        <Text style={[styles.exerciseName, item.completed && styles.completedExerciseName]}>
          {item.position}° {item.name}
        </Text>
        <Text style={styles.exerciseDetails}>
          {item.sets} séries × {item.reps} {item.reps > 1 ? 'repetições' : 'repetição'}
        </Text>
        {item.difficulty && (
          <Text style={styles.exerciseDifficulty}>
            Dificuldade: {item.difficulty}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onShowDetails(item)}
        style={styles.detailsButton}
      >
        <Ionicons name="information-circle-outline" size={24} color="#FFA500" />
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseItem;