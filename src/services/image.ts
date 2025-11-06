import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const PROFILE_IMAGE_KEY = '@profile_image';

// Carregar imagem salva
export const loadProfileImage = async (): Promise<string | null> => {
  try {
    const savedImage = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
    return savedImage;
  } catch (error) {
    console.error('Erro ao carregar imagem:', error);
    return null;
  }
};

// Salvar imagem
export const saveProfileImage = async (imageUri: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROFILE_IMAGE_KEY, imageUri);
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    throw error;
  }
};

// Remover imagem
export const removeProfileImage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
  } catch (error) {
    console.error('Erro ao remover imagem:', error);
    throw error;
  }
};

// Selecionar imagem da galeria
export const pickImageFromGallery = async (): Promise<string | null> => {
  // Solicitar permissão
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== 'granted') {
    Alert.alert(
      'Permissão necessária',
      'Precisamos de permissão para acessar suas fotos!'
    );
    return null;
  }

  // Abrir galeria
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }

  return null;
};