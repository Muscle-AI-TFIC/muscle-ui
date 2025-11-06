import { supabase } from './supabase';
import { Alert } from 'react-native';
import type { Exercise } from '@/types/interfaces/exercises';

export const getExercises = async (): Promise<Exercise[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      Alert.alert("Erro", "Usuário não autenticado");
      return [];
    }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/workout/${user?.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('getExercises response:', JSON.stringify(data, null, 2));
    if (data && data.message && Array.isArray(data.message.data) && data.message.data.length > 0 && Array.isArray(data.message.data[0].daily_workout_exercises)) {
      const exercises = data.message.data[0].daily_workout_exercises.map((item: any) => ({
        id: item.id.toString(), 
        name: item.exercises.name,
        finished: false,
        sets: item.sets,
        reps: item.reps,
        position: item.position,
        description: item.exercises.description,
        difficulty: item.exercises.difficulty,
        duration_minutes: item.exercises.duration_minutes,
      })) as Exercise[];
      return exercises;
    }
    return [];
  } catch (error: any) {
    console.error('Erro ao buscar exercícios:', error);
    Alert.alert('Erro', 'Não foi possível buscar os exercícios');
    return [];
  }
};



export const updateWorkoutStatus = async (workoutId: number): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      Alert.alert("Erro", "Usuário não autenticado");
      return false;
    }

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/workoutUpdateStatus/${workoutId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      }
    );

    console.log(response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error: any) {
    console.error('Erro ao atualizar status do treino:', error);
    Alert.alert('Erro', 'Não foi possível atualizar o status do treino');
    return false;
  }
};