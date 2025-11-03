import { useState, useEffect } from 'react';
import { 
  Text, 
  Image, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "@/services/supabase";
import { styles } from '@/styles/Profile';

const STORAGE_KEYS = {
  PROFILE_IMAGE: '@profile_image',
};

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    loadUserData();
    loadProfileImage(); // Carrega a imagem salva
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.user_metadata?.name || user.email?.split('@')[0] || "Usuário");
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  // Função para carregar a imagem salva
  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_IMAGE);
      if (savedImage) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error('Erro ao carregar imagem:', error);
    }
  };

  // Função para salvar a imagem
  const saveProfileImage = async (imageUri: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, imageUri);
      console.log('Imagem salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      Alert.alert('Erro', 'Não foi possível salvar a imagem');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      await saveProfileImage(imageUri); // Salva localmente
    }
  };

  // Função para remover a foto
  const removeProfileImage = async () => {
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
              await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
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

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await supabase.auth.signOut();
              // Opcionalmente, limpe a imagem ao fazer logout
              // await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
              // router.push('/auth/login');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao sair');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
      </View>

      {/* Foto de Perfil */}
      <View style={styles.profileSection}>
        <TouchableOpacity 
          onPress={pickImage} 
          onLongPress={image ? removeProfileImage : undefined}
          style={styles.avatarContainer}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.editBadge}>
            <Text style={styles.editBadgeText}>✎</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
        
        {image && (
          <Text style={styles.hintText}>
            Pressione e segure para remover a foto
          </Text>
        )}
      </View>

      {/* Menu de Opções */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>👤</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Editar Perfil</Text>
            <Text style={styles.menuSubtitle}>Altere suas informações</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🔔</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Notificações</Text>
            <Text style={styles.menuSubtitle}>Gerencie suas notificações</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>🔒</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Privacidade</Text>
            <Text style={styles.menuSubtitle}>Configurações de privacidade</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>❓</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Ajuda e Suporte</Text>
            <Text style={styles.menuSubtitle}>Tire suas dúvidas</Text>
          </View>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Logout */}
      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>Sair da Conta</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

