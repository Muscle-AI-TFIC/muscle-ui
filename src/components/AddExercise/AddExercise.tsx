import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '@/styles/TrainingSheet';

interface AddExerciseProps {
  day: string;
  newExercise: { [key: string]: string };
  setNewExercise: (newExercise: { [key: string]: string }) => void;
  addExercise: (day: string) => void;
}

export function AddExercise({ day, newExercise, setNewExercise, addExercise }: AddExerciseProps) {
  return (
    <View style={styles.addExerciseContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome do exercício"
        placeholderTextColor="#999"
        value={newExercise[day] || ''}
        onChangeText={(text) => setNewExercise(prev => ({ ...prev, [day]: text }))}
        onSubmitEditing={() => addExercise(day)}
        returnKeyType="done"
      />
      <TouchableOpacity
        onPress={() => addExercise(day)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
