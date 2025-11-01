import React, {useState} from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Exercise {
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
const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexões',
    completed: false,
    sets: 3,
    reps: 15,
    position: 1,
    description: 'Exercício para fortalecer peitoral, tríceps e ombros. Mantenha o corpo alinhado durante todo o movimento.',
    difficulty: 'Intermediário',
    duration_minutes: 10
  },
  {
    id: '2',
    name: 'Agachamentos',
    completed: true,
    sets: 4,
    reps: 12,
    position: 2,
    description: 'Exercício fundamental para membros inferiores. Foque em manter as costas retas e descer até formar 90 graus com os joelhos.',
    difficulty: 'Iniciante',
    duration_minutes: 15
  },
  {
    id: '3',
    name: 'Prancha Abdominal',
    completed: false,
    sets: 3,
    reps: 1,
    position: 4,
    description: 'Exercício isométrico para core e abdômen. Mantenha a posição por 30-60 segundos por série.',
    difficulty: 'Iniciante',
    duration_minutes: 5
  },
  {
    id: '4',
    name: 'Burpees',
    completed: false,
    sets: 4,
    reps: 10,
    position: 3,
    description: 'Exercício completo que combina agachamento, flexão e salto. Excelente para condicionamento cardiovascular.',
    difficulty: 'Avançado',
    duration_minutes: 12
  },
];

interface ExerciseDetailsProps {
  exercise: Exercise | null;
  visible: boolean;
  onClose: () => void;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise, visible, onClose }) => {
  if (!exercise) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Detalhes do Exercício</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseNameLarge}>{exercise.name}</Text>
            <View style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(exercise.difficulty || '') }
            ]}>
              <Text style={styles.difficultyText}>
                {exercise.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons name="list" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Séries</Text>
              <Text style={styles.detailValue}>{exercise.sets}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="repeat" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Repetições</Text>
              <Text style={styles.detailValue}>{exercise.reps}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="time" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Duração</Text>
              <Text style={styles.detailValue}>{exercise.duration_minutes} min</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="play" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Posição</Text>
              <Text style={styles.detailValue}>{exercise.position}°</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.descriptionText}>
              {exercise.description}
            </Text>
          </View>

          <View style={styles.instructionsSection}>
            <Text style={styles.sectionTitle}>Instruções</Text>
            <View style={styles.instructionItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>Execute o movimento de forma controlada</Text>
            </View>
            <View style={styles.instructionItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>Mantenha a respiração constante</Text>
            </View>
            <View style={styles.instructionItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.instructionText}>Descanse 60 segundos entre séries</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const sortedExercises = exercises.sort((a, b) => a.position - b.position);

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const totalExercises = exercises.length;
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

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
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
      )
    );
  };

  const renderItem = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
        <Ionicons
          name={item.completed ? 'checkbox-outline' : 'square-outline'}
          size={24}
          color={item.completed ? 'green' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => showExerciseDetails(item)}
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
        onPress={() => showExerciseDetails(item)}
        style={styles.detailsButton}
      >
        <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercícios do Dia</Text>
      <FlatList
        data={sortedExercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
        <View style={styles.progressContainer}>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              {completedExercises}/{totalExercises} completos
            </Text>
            <Text style={styles.percentageText}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercentage}%` }
              ]}
            />
          </View>
        </View>

      <ExerciseDetails
          exercise={selectedExercise}
          visible={detailsVisible}
          onClose={closeExerciseDetails}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkbox: {
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  completedExerciseName: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },


   progressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  detailsButton: {
    padding: 8,
  },
  exerciseDifficulty: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  difficultyText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  instructionsSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionItem: {
    flexDirection:

  'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
});

