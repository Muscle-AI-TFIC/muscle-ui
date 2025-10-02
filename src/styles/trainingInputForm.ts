// TrainingInputFormStyles.ts
import { StyleSheet } from 'react-native';

export const trainingFormStyles = StyleSheet.create({
  container: {
    maxWidth: 500,
    marginHorizontal: 'auto', // No RN, usamos marginHorizontal para left/right
    padding: 20,
    // fontFamily é aplicado no componente Text, não aqui
  },

  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    fontSize: 24, // Adicionando tamanho de fonte
    fontWeight: 'bold',
  },

  form: {
    // No RN, flexDirection: 'column' é o padrão
    gap: 20, // gap não é suportado no RN, usaremos marginBottom nos filhos
  },

  formGroup: {
    // flexDirection: 'column' é o padrão no RN
  },

  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
  },

  input: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },

  pickerContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },

  picker: {
    height: 50,
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top', // Para multiline alinhar no topo
  },

  focusedInput: {
    borderColor: '#007bff',
  },

  submitButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  submitButtonHover: {
    backgroundColor: '#0056b3',
  },

  submitButtonDisabled: {
    backgroundColor: '#6c757d',
  },

  mensagem: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },

  mensagemSucesso: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },

  mensagemErro: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },

  mensagemText: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  mensagemTextSucesso: {
    color: '#155724',
  },

  mensagemTextErro: {
    color: '#721c24',
  },
});
