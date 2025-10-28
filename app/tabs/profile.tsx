import { supabase } from '@/utils/supabase';
import { uploadProfileImage } from '@/services/profileImage';
import { useEffect, useState } from 'react';
import { Alert, View, Button, Image, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    async function getInitialProfileImage() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        const { data, error } = await supabase
          .from('user_profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching avatar_url:', error);
        } else if (data?.avatar_url) {
          setImage(data.avatar_url);
        }
      }
    }
    getInitialProfileImage();
  }, []);

  const pickImage = async () => {
    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: false,
      },
      async (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }

        if (response.errorCode) {
          Alert.alert('Erro', response.errorMessage || 'Erro ao selecionar imagem');
          console.error('ImagePicker Error:', response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          const selectedImageUri = Platform.OS === 'android' 
            ? selectedImage.uri 
            : selectedImage.uri?.replace('file://', '');

          if (!selectedImageUri) {
            Alert.alert('Erro', 'Não foi possível obter a URI da imagem');
            return;
          }

          setImage(selectedImageUri); // Exibir localmente imediatamente
          setUploading(true);

          const { publicUrl, error } = await uploadProfileImage(userId, selectedImageUri);

          if (error) {
            Alert.alert('Erro', 'Falha ao fazer upload da imagem de perfil: ' + error.message);
            console.error('Upload error:', error);
            // Reverter para a imagem anterior em caso de erro
            const { data } = await supabase
              .from('user_profiles')
              .select('avatar_url')
              .eq('id', userId)
              .single();
            setImage(data?.avatar_url || null);
          } else if (publicUrl) {
            console.log('Profile image uploaded:', publicUrl);
            // Atualizar com a URL pública do Supabase
            setImage(publicUrl);
            
            // Atualizar o avatar_url no banco de dados
            const { error: updateError } = await supabase
              .from('user_profiles')
              .update({ avatar_url: publicUrl })
              .eq('id', userId);

            if (updateError) {
              console.error('Error updating avatar_url:', updateError);
              Alert.alert('Aviso', 'Imagem enviada, mas houve erro ao atualizar o perfil.');
            } else {
              Alert.alert('Sucesso', 'Foto de perfil atualizada!');
            }
          }
          setUploading(false);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Escolher imagem de perfil" onPress={pickImage} disabled={uploading} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      {image && !uploading && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
});