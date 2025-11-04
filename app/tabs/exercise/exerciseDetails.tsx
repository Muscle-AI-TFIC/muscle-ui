import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExerciseDetailsProps } from '@/types/exercise';
import { getDifficultyColor } from '@/services/exerciseLogic';
import { styles } from '@/styles/exerciseStyles/exerciseDetailsStyles';

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

export default ExerciseDetails;