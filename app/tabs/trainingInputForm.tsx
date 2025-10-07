// TrainingInputForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TrainingInput, enviarInput } from '@/services/trainingInput';
import { trainingFormStyles} from '../../src/styles/trainingInputForm';

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

  const handleInputChange = (name: keyof TrainingInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
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
      const mensagemErro = error instanceof Error ? error.message : 'Erro inesperado ao enviar dados.';
      setMensagem(mensagemErro);
      Alert.alert('Erro', mensagemErro);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView style={trainingFormStyles.container}>
      <View>
        <Text style={trainingFormStyles.title}>Registro de Treino</Text>

        <View style={{ gap: 20 }}>
          {/* Picker para Tipo de Treino */}
          <View style={trainingFormStyles.formGroup}>
            <Text style={trainingFormStyles.label}>Tipo de Treino *</Text>
            <View style={trainingFormStyles.pickerContainer}>
              <Picker
                selectedValue={formData.tipoTreino}
                onValueChange={(value) => handleInputChange('tipoTreino', value)}
                style={trainingFormStyles.picker}
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

          {/* Input para Peso */}
          <View style={trainingFormStyles.formGroup}>
            <Text style={trainingFormStyles.label}>Peso (kg) *</Text>
            <TextInput
              style={trainingFormStyles.input}
              value={formData.peso > 0 ? formData.peso.toString() : ''}
              onChangeText={(text) => handleInputChange('peso', parseFloat(text) || 0)}
              keyboardType="numeric"
              placeholder="Ex: 75.5"
              placeholderTextColor="#999"
            />
          </View>

          {/* Input para Altura */}
          <View style={trainingFormStyles.formGroup}>
            <Text style={trainingFormStyles.label}>Altura (m) *</Text>
            <TextInput
              style={trainingFormStyles.input}
              value={formData.altura > 0 ? formData.altura.toString() : ''}
              onChangeText={(text) => handleInputChange('altura', parseFloat(text) || 0)}
              keyboardType="numeric"
              placeholder="Ex: 1.75"
              placeholderTextColor="#999"
            />
          </View>

          {/* Input para Idade */}
          <View style={trainingFormStyles.formGroup}>
            <Text style={trainingFormStyles.label}>Idade *</Text>
            <TextInput
              style={trainingFormStyles.input}
              value={formData.idade > 0 ? formData.idade.toString() : ''}
              onChangeText={(text) => handleInputChange('idade', parseInt(text) || 0)}
              keyboardType="numeric"
              placeholder="Ex: 30"
              placeholderTextColor="#999"
            />
          </View>

          {/* Input para Objetivo */}
          <View style={trainingFormStyles.formGroup}>
            <Text style={trainingFormStyles.label}>Objetivo</Text>
            <TextInput
              style={[
                trainingFormStyles.input,
                trainingFormStyles.textArea
              ]}
              value={formData.objetivo}
              onChangeText={(text) => handleInputChange('objetivo', text)}
              multiline
              numberOfLines={4}
              placeholder="Ex: Ganhar massa muscular, perder peso..."
              placeholderTextColor="#999"
              textAlignVertical="top"
            />
          </View>

          {/* Botão de Submit */}
          <TouchableOpacity
            style={[
              trainingFormStyles.submitButton,
              enviando && trainingFormStyles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={enviando}
          >
            <Text style={trainingFormStyles.submitButtonText}>
              {enviando ? 'Enviando...' : 'Registrar Treino'}
            </Text>
          </TouchableOpacity>

          {/* Mensagem de feedback */}
          {mensagem && (
            <View style={[
              trainingFormStyles.mensagem,
              mensagem.includes('Erro')
                ? trainingFormStyles.mensagemErro
                : trainingFormStyles.mensagemSucesso
            ]}>
              <Text style={[
                trainingFormStyles.mensagemText,
                mensagem.includes('Erro')
                  ? trainingFormStyles.mensagemTextErro
                  : trainingFormStyles.mensagemTextSucesso
              ]}>
                {mensagem}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}