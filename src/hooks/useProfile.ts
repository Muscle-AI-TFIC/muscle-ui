import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { loadProfileImage, saveProfileImage, removeProfileImage, pickImageFromGallery } from "@/services/image";
import { loadUserProfile, updateUserProfile, logoutUser } from "@/services/profile";
import { supabase } from "@/services/supabase";
import { UserInfo } from '@/types/UserInfo';

export function useProfile() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    initializeProfile();
  }, []);

  const initializeProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        
        await loadUserProfile({
          userId: user.id,
          setUserInfo: (info) => {
            setUserInfo(info);
            if (info?.name) {
              setUserName(info.name);
            }
          },
          setUserEmail,
          setUserName,
        });

        const savedImage = await loadProfileImage();
        if (savedImage) {
          setImage(savedImage);
        }
      }
    } catch (error) {
      console.error('Erro ao inicializar perfil:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePickImage = async () => {
    const imageUri = await pickImageFromGallery();
    
    if (imageUri) {
      setImage(imageUri);
      await saveProfileImage(imageUri);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Remover Foto',
      'Deseja remover sua foto de perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeProfileImage();
              setImage(null);
              Alert.alert('Sucesso', 'Foto removida com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover a foto');
            }
          }
        }
      ]
    );
  };

  const handleSaveUserInfo = async () => {
    if (!userInfo) return;

    await updateUserProfile({
      userId,
      userInfo,
      onSuccess: () => {
        setModalVisible(false);
      },
      setLoading,
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logoutUser({
              setLoading,
              onSuccess: async () => {
                await removeProfileImage();
                router.replace('/auth/login');
              },
            });
          }
        }
      ]
    );
  };

  return {
    image,
    loading,
    loadingProfile,
    userEmail,
    userName,
    modalVisible,
    userInfo,
    setImage,
    setLoading,
    setLoadingProfile,
    setUserEmail,
    setUserName,
    setModalVisible,
    setUserInfo,
    handlePickImage,
    handleRemoveImage,
    handleSaveUserInfo,
    handleLogout,
    calculateIMC,
    calculateAge,
  };
}

function calculateIMC(userInfo: UserInfo | null): string {
  if (!userInfo || !userInfo.weight_kg || !userInfo.height_cm) return "N/A";
  const imc = userInfo.weight_kg / ((userInfo.height_cm / 100) * (userInfo.height_cm / 100));
  return imc.toFixed(2);
}

function calculateAge(userInfo: UserInfo | null): string {
  if (!userInfo || !userInfo.birth_date) return "N/A";
  const birthDate = new Date(userInfo.birth_date);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age.toString();
}
