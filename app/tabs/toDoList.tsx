import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);

  const sortedExercises = exercises.sort((a, b) => a.position - b.position);

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const totalExercises = exercises.length;
  const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

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

      <View style={styles.exerciseInfo}>
        <Text style={[styles.exerciseName, item.completed && styles.completedExerciseName]}>
          {item.position}° {item.name}
        </Text>
        <Text style={styles.exerciseDetails}>
          {item.sets} séries × {item.reps} {item.reps > 1 ? 'repetições' : 'repetição'}
        </Text>
      </View>
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

});