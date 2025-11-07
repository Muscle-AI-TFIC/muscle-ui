import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFA500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 16,
    marginVertical: 20,
    fontStyle: 'italic',
  },
  dayContainer: {
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  dayButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    flex: 1,
  },
  dayButtonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  removeDayButton: {
    padding: 4,
  },
  removeDayButtonText: {
    fontSize: 18,
    color: '#FF3B30',
  },
  expandIcon: {
    fontSize: 24,
    color: '#FFA500',
    fontWeight: 'bold',
  },
  exerciseList: {
    padding: 16,
  },
  noExercisesText: {
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  exerciseText: {
    fontSize: 16,
    color: '#DDD',
    flex: 1,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addExerciseContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#1E1E1E',
    color: '#DDD',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#121212',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addDayButton: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFA500',
    borderStyle: 'dashed',
  },
  addDayButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Adicione estes estilos ao seu arquivo existente:

list: {
  flex: 1,
},

checkboxContainer: {
  marginRight: 12,
},

checkbox: {
  width: 24,
  height: 24,
  borderRadius: 6,
  borderWidth: 2,
  borderColor: '#bb6c12ff',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
},

checkboxChecked: {
  backgroundColor: '#bb6c12ff',
},

checkmark: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

exerciseTextCompleted: {
  textDecorationLine: 'line-through',
  opacity: 0.6,
},
});
