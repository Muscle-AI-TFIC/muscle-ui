import { loadProfileImage, saveProfileImage, removeProfileImage, pickImageFromGallery } from "@/services/image";
import { loadUserProfile, updateUserProfile, logoutUser } from "@/services/profile";
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import LogoutSection from '@/components/LogoutSection';
import EditUserModal from '@/components/EditUserModal';
import StatsSection from '@/components/StatsSection';
import InfoSection from '@/components/InfoSection';
import MenuSection from '@/components/MenuSection';
import { calculateIMC } from '@/utils/calcImc';
import { calculateAge } from '@/utils/calcAge';
import { supabase } from "@/services/supabase";
import { useState, useEffect } from 'react';
import { UserInfo } from '@/types/UserInfo';
import { styles } from '@/styles/Profile';
import { router } from 'expo-router';

export default function ProfileScreen() {
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
        
        // Carregar dados do perfil usando o service
        await loadUserProfile({
          userId: user.id,
          setUserInfo: (info) => {
            setUserInfo(info);
            // Se o name vier da API, usar ele como userName
            if (info?.name) {
              setUserName(info.name);
            }
          },
          setUserEmail,
          setUserName,
        });

        // Carregar imagem
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

    // Usar o service de update
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
            // Usar o service de logout
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

  if (loadingProfile || !userInfo) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#bb6c12ff" />
        <Text style={{ marginTop: 16 }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        image={image}
        userName={userName}
        userEmail={userEmail}
        handlePickImage={handlePickImage}
        handleRemoveImage={handleRemoveImage}
      />

      {/* Cards de Informações Físicas */}
      <StatsSection
        userInfo={userInfo}
        calculateIMC={calculateIMC}
        calculateAge={calculateAge}
      />

      {/* Informações Adicionais */}
      <InfoSection userInfo={userInfo} />

      {/* Menu de Opções */}
      <MenuSection setModalVisible={setModalVisible} />

      {/* Botão de Logout */}
      <LogoutSection handleLogout={handleLogout} loading={loading} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
      </View>

      {/* Modal de Edição */}
      <EditUserModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        handleSaveUserInfo={handleSaveUserInfo}
        loading={loading}
      />
    </ScrollView>
  );
}