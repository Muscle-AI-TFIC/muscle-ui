import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { getTrainingSheet, createTrainingSheet, deleteTrainingSheet } from '@/services/trainingSheet';
import type { TrainingSheet, TrainingSheetExercise } from '@/types/interfaces/trainingSheet';
import { useEffect, useState } from 'react';
import { styles } from '@/styles/TrainingSheet';

export default function TrainingSheetComponent() {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [trainingSheets, setTrainingSheets] = useState<TrainingSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newExercise, setNewExercise] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchTrainingSheet();
  }, []);

const fetchTrainingSheet = async () => {
  setLoading(true);
  try {
    const response = await getTrainingSheet();

    if (response) {
      const apiData = response.message.data;
      console.log('API data:', apiData);

      if (Array.isArray(apiData)) {
        const formattedSheets: TrainingSheet[] = apiData.map(sheet => ({
          id: sheet.id,
          title: sheet.title,
          training_sheet_exercises: sheet.training_sheet_exercises?.map(ex => ({
            id: ex.id,
            name: ex.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
          })) || []
        }));

        setTrainingSheets(formattedSheets);
      } else {
        setTrainingSheets([]);
      }
    } else {
      setTrainingSheets([]);
    }
  } catch (error) {
    console.error('Error fetching training sheet:', error);
    Alert.alert('Erro', 'Não foi possível carregar a ficha de treino');
    setTrainingSheets([]);
  }
  setLoading(false);
};


  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const addExercise = (day: string) => {
    const exerciseName = newExercise[day]?.trim();
    if (!exerciseName) {
      Alert.alert('Atenção', 'Digite o nome do exercício');
      return;
    }

    const exercise: TrainingSheetExercise = {
      name: exerciseName,
      sets: 3, // Default value
      reps: 12, // Default value
      weight: 10, // Default value
    };

    setTrainingSheets(prev => prev.map(sheet => {
      if (sheet.title === day) {
        return { ...sheet, training_sheet_exercises: [...sheet.training_sheet_exercises, exercise] };
      }
      return sheet;
    }));

    setNewExercise(prev => ({ ...prev, [day]: '' }));
  };

  const removeExercise = (day: string, index: number) => {
    Alert.alert(
      'Confirmar',
      'Deseja remover este exercício?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setTrainingSheets(prev => prev.map(sheet => {
              if (sheet.title === day) {
                const newExercises = sheet.training_sheet_exercises.filter((_, i) => i !== index);
                return { ...sheet, training_sheet_exercises: newExercises };
              }
              return sheet;
            }));
          }
        }
      ]
    );
  };

  const addNewDay = () => {
    Alert.prompt(
      'Adicionar Dia',
      'Digite o nome do dia (ex: Sexta-feira):',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Adicionar',
          onPress: (dayName?: string) => {
            const trimmedName = dayName?.trim();
            if (!trimmedName) return;

            if (trainingSheets.some(sheet => sheet.title === trimmedName)) {
              Alert.alert('Atenção', 'Esse dia já existe');
              return;
            }

            const newSheet: TrainingSheet = {
              title: trimmedName,
              training_sheet_exercises: [],
            };

            setTrainingSheets(prev => [...prev, newSheet]);
            setExpandedDay(trimmedName);
          }
        }
      ],
      'plain-text'
    );
  };

  const removeDay = (day: string) => {
    Alert.alert(
      'Confirmar',
      `Deseja remover o dia "${day}" e todos os seus exercícios?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            const sheetToRemove = trainingSheets.find(sheet => sheet.title === day);
            if (sheetToRemove && sheetToRemove.id) {
              await deleteTrainingSheet(sheetToRemove.id);
            }
            setTrainingSheets(prev => prev.filter(sheet => sheet.title !== day));
            if (expandedDay === day) {
              setExpandedDay(null);
            }
          }
        }
      ]
    );
  };

  const handleSave = async () => {
    if (trainingSheets.length === 0) {
      Alert.alert('Atenção', 'Adicione pelo menos um dia de treino antes de salvar');
      return;
    }

    setSaving(true);

    try {
      for (const sheet of trainingSheets) {
        if (!sheet.id) {
          await createTrainingSheet(sheet.title, sheet.training_sheet_exercises);
        }
      }
      Alert.alert('Sucesso', 'Ficha de treino salva com sucesso!');
      await fetchTrainingSheet();
    } catch (error) {
      console.error('Error saving:', error);
      Alert.alert('Erro', 'Não foi possível salvar a ficha de treino');
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#bb6c12ff" />
        <Text style={{ marginTop: 16 }}>Carregando ficha de treino...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Ficha de Treino</Text>

      {trainingSheets.length === 0 && (
        <Text style={styles.emptyText}>
          Nenhum treino cadastrado. Clique em &quot;Adicionar Dia de Treino&quot; para começar.
        </Text>
      )}

      {trainingSheets.map((sheet) => (
        <View key={sheet.title} style={styles.dayContainer}>
          <TouchableOpacity onPress={() => toggleDay(sheet.title)} style={styles.dayButton}>
            <Text style={styles.dayText}>{sheet.title}</Text>
            <View style={styles.dayButtonActions}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  removeDay(sheet.title);
                }}
                style={styles.removeDayButton}
              >
                <Text style={styles.removeDayButtonText}>🗑️</Text>
              </TouchableOpacity>
              <Text style={styles.expandIcon}>{expandedDay === sheet.title ? '−' : '+'}</Text>
            </View>
          </TouchableOpacity>

          {expandedDay === sheet.title && (
            <View style={styles.exerciseList}>
              {sheet.training_sheet_exercises.length === 0 && (
                <Text style={styles.noExercisesText}>Nenhum exercício adicionado</Text>
              )}

              {sheet.training_sheet_exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseRow}>
                  <Text style={styles.exerciseText}>• {exercise.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeExercise(sheet.title, index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.addExerciseContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do exercício"
                  placeholderTextColor="#999"
                  value={newExercise[sheet.title] || ''}
                  onChangeText={(text) => setNewExercise(prev => ({ ...prev, [sheet.title]: text }))}
                  onSubmitEditing={() => addExercise(sheet.title)}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => addExercise(sheet.title)}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity onPress={addNewDay} style={styles.addDayButton}>
        <Text style={styles.addDayButtonText}>+ Adicionar Dia de Treino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}