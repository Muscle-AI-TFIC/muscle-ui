import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Exercise } from '@/types/exercise';
import { mockExercises, calculateProgress } from '@/services/exerciseLogic';
import ExerciseDetails from './exerciseDetails';
import ExerciseItem from './exerciseItem';
import ProgressBar from './progressBar';
import CongratulationsModal from './congratulationsModal';
import { styles } from '@/styles/exerciseStyles/homeStyles';

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>(mockExercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const sortedExercises = exercises.sort((a, b) => a.position - b.position);
  const { completed, total, percentage } = calculateProgress(exercises);

  useEffect(() => {
    if (completed === total && total > 0) {
      setShowCongrats(true);
    }
  }, [completed, total]);

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
    <ExerciseItem
      item={item}
      onToggleComplete={toggleComplete}
      onShowDetails={showExerciseDetails}
    />
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

      <ProgressBar
        completed={completed}
        total={total}
        percentage={percentage}
      />

      <ExerciseDetails
        exercise={selectedExercise}
        visible={detailsVisible}
        onClose={closeExerciseDetails}
      />

      <CongratulationsModal
        visible={showCongrats}
        onAnimationFinish={() => setShowCongrats(false)}
      />
    </View>
  );
}