import type { Exercise } from '@/types/interfaces/exercises';

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

export const exerciseService = {
  getExercises: (): Exercise[] => {
    return mockExercises;
  },

  sortExercisesByPosition: (exercises: Exercise[]): Exercise[] => {
    return [...exercises].sort((a, b) => a.position - b.position);
  },

  calculateProgress: (exercises: Exercise[]) => {
    const completed = exercises.filter(ex => ex.completed).length;
    const total = exercises.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return {
      completed,
      total,
      percentage: Math.round(percentage)
    };
  },

  updateExerciseCompletion: (exercises: Exercise[], id: string): Exercise[] => {
    return exercises.map(exercise =>
      exercise.id === id 
        ? { ...exercise, completed: !exercise.completed } 
        : exercise
    );
  }
};