import { View, Text, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import type { ExerciseDetailsProps } from '@/types/interfaces/exerciseDetails'
import { getDifficultyColor } from '@/utils/difficultyColor';
import type { Exercise } from '@/types/interfaces/exercises'
import React, {useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { styles } from '@/styles/ToDo';

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

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise, visible, onClose }) => {
  if (!exercise) return null;

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
            <Ionicons name="close" size={24} color="#FFA500" />
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
              <Ionicons name="list" size={20} color="#FFA500" />
              <Text style={styles.detailLabel}>Séries</Text>
              <Text style={styles.detailValue}>{exercise.sets}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="repeat" size={20} color="#FFA500" />
              <Text style={styles.detailLabel}>Repetições</Text>
              <Text style={styles.detailValue}>{exercise.reps}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="time" size={20} color="#FFA500" />
              <Text style={styles.detailLabel}>Duração</Text>
              <Text style={styles.detailValue}>{exercise.duration_minutes} min</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="play" size={20} color="#FFA500" />
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

  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (completedExercises === totalExercises && totalExercises > 0) {
      setShowCongrats(true);
    }
  }, [completedExercises, totalExercises]);

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
        <Ionicons name="information-circle-outline" size={24} color="#FFA500" />
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

      <Modal visible={showCongrats} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContentAnimation}>
            <LottieView
              source={{ uri: 'https://lottie.host/d7475065-8824-4b37-a57a-cd59c3d645cf/ZUrcBTai6f.lottie' }}
              autoPlay
              loop={false}
              style={{ width: 250, height: 250 }}
              onAnimationFinish={() => setShowCongrats(false)}
            />
            <Text style={styles.congratsText}>Parabéns! 🎉</Text>
            <Text style={styles.subText}>Você concluiu todos os exercícios!</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
}