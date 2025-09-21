// TrainingInputForm.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TrainingInput, enviarInput } from './trainingInput';

export default function TrainingInputForm() {
  const [formData, setFormData] = useState<TrainingInput>({
    tipoTreino: '',
    peso: 0,
    altura: 0,
    idade: 0,
    objetivo: ''
  });

  const [mensagem, setMensagem] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!formData.tipoTreino || formData.peso <= 0 || formData.altura <= 0 || formData.idade <= 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setEnviando(true);
    setMensagem('');

    try {
      const resultado = await enviarInput(formData);
      setMensagem(resultado);
      
      Alert.alert('Sucesso', resultado);

      // Limpar formulário se sucesso
      if (resultado.includes('sucesso')) {
        setFormData({
          tipoTreino: '',
          peso: 0,
          altura: 0,
          idade: 0,
          objetivo: ''
        });
      }
    } catch (error) {
      const mensagemErro = 'Erro inesperado ao enviar dados.';
      setMensagem(mensagemErro);
      Alert.alert('Erro', mensagemErro);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Treino</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Treino *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.tipoTreino}
              onValueChange={(value) => handleInputChange('tipoTreino', value)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o tipo de treino" value="" />
              <Picker.Item label="Musculação" value="Musculação" />
              <Picker.Item label="Cardio" value="Cardio" />
              <Picker.Item label="Crossfit" value="Crossfit" />
              <Picker.Item label="Yoga" value="Yoga" />
              <Picker.Item label="Pilates" value="Pilates" />
              <Picker.Item label="Outro" value="Outro" />
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Peso (kg) *</Text>
          <TextInput
            style={styles.input}
            value={formData.peso > 0 ? formData.peso.toString() : ''}
            onChangeText={(text) => handleInputChange('peso', parseFloat(text) || 0)}
            keyboardType="numeric"
            placeholder="Ex: 75.5"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Altura (m) *</Text>
          <TextInput
            style={styles.input}
            value={formData.altura > 0 ? formData.altura.toString() : ''}
            onChangeText={(text) => handleInputChange('altura', parseFloat(text) || 0)}
            keyboardType="numeric"
            placeholder="Ex: 1.75"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Idade *</Text>
          <TextInput
            style={styles.input}
            value={formData.idade > 0 ? formData.idade.toString() : ''}
            onChangeText={(text) => handleInputChange('idade', parseInt(text) || 0)}
            keyboardType="numeric"
            placeholder="Ex: 30"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Objetivo</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.objetivo}
            onChangeText={(text) => handleInputChange('objetivo', text)}
            multiline
            numberOfLines={4}
            placeholder="Ex: Ganhar massa muscular, perder peso, melhorar condicionamento..."
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, enviando && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={enviando}
        >
          <Text style={styles.submitButtonText}>
            {enviando ? 'Enviando...' : 'Registrar Treino'}
          </Text>
        </TouchableOpacity>

        {mensagem ? (
          <View style={[
            styles.mensagem, 
            mensagem.includes('Erro') ? styles.mensagemErro : styles.mensagemSucesso
          ]}>
            <Text style={styles.mensagemText}>{mensagem}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}