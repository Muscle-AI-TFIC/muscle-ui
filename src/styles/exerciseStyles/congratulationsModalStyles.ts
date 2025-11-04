import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContentAnimation: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
  },
});