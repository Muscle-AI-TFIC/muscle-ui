import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
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
    color: '#FFF',
  },
  completedExerciseName: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#BBB',
    marginBottom: 2,
  },
  exerciseDifficulty: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  detailsButton: {
    padding: 8,
  },
});