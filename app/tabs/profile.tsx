import { useState, useEffect } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "@/services/supabase";
import { getData } from "@/services/user_profile";
import { styles } from '@/styles/Profile';
import { router } from 'expo-router';
import { UserInfo } from '@/types/UserInfo';

const STORAGE_KEYS = {
  PROFILE_IMAGE: '@profile_image',
};

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    loadUserData();
    loadProfileImage();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.user_metadata?.name || user.email?.split('@')[0] || "Usuário");

        const apiData = await getData(user.id);

        if (apiData && apiData.message && apiData.message.data) {
          const userData = apiData.message.data;
          setUserInfo(userData);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

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

  const saveProfileImage = async (imageUri: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_IMAGE, imageUri);
      console.log('Imagem salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      Alert.alert('Erro', 'Não foi possível salvar a imagem');
    }
  };

  const saveUserInfo = async () => {
    setModalVisible(false);
    Alert.alert('Sucesso', 'Informações salvas com sucesso!');
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
      await saveProfileImage(imageUri);
    }
  };

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

  const calculateIMC = () => {
    if (userInfo?.weight_kg && userInfo?.height_cm) {
      const pesoNum = userInfo.weight_kg;
      const alturaNum = userInfo.height_cm / 100;
      return (pesoNum / (alturaNum * alturaNum)).toFixed(1);
    }
    return '--';
  };

  const calculateAge = () => {
    if (userInfo?.birth_date) {
      const birthDate = new Date(userInfo.birth_date);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age.toString();
    }
    return '--';
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
              await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_IMAGE);
              router.push('/auth/login');
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

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#bb6c12ff" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

        {image && (
          <Text style={styles.hintText}>
            Pressione e segure para remover a foto
          </Text>
        )}
      </View>

      {/* Cards de Informações Físicas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userInfo.weight_kg || '--'}</Text>
          <Text style={styles.statLabel}>Peso (kg)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userInfo.height_cm || '--'}</Text>
          <Text style={styles.statLabel}>Altura (cm)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{calculateIMC()}</Text>
          <Text style={styles.statLabel}>IMC</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{calculateAge()}</Text>
          <Text style={styles.statLabel}>Idade</Text>
        </View>
      </View>

      {/* Informações Adicionais */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎯 Objetivo</Text>
            <Text style={styles.infoValue}>{userInfo.goal}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💪 Nível de Atividade</Text>
            <Text style={styles.infoValue}>{userInfo.fitness_level}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Gênero</Text>
            <Text style={styles.infoValue}>{userInfo.gender}</Text>
          </View>
        </View>
      </View>

      {/* Menu de Opções */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.menuIconContainer}>
            <Text style={styles.menuIcon}>✏️</Text>
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Editar Informações</Text>
            <Text style={styles.menuSubtitle}>Atualize seus dados pessoais</Text>
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
              <Text style={styles.logoutText}>Sair da Conta</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
      </View>

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Informações</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={userInfo?.weight_kg?.toString() || ''}
                  onChangeText={(text) => setUserInfo(prev => prev ? { ...prev, weight_kg: parseFloat(text) || 0 } : null)}
                  keyboardType="numeric"
                  placeholder="Ex: 70"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Altura (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={userInfo?.height_cm?.toString() || ''}
                  onChangeText={(text) => setUserInfo(prev => prev ? { ...prev, height_cm: parseFloat(text) || 0 } : null)}
                  keyboardType="numeric"
                  placeholder="Ex: 175"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data de Nascimento</Text>
                <TextInput
                  style={styles.input}
                  value={userInfo?.birth_date || ''}
                  onChangeText={(text) => setUserInfo(prev => prev ? { ...prev, birth_date: text } : null)}
                  placeholder="AAAA-MM-DD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gênero</Text>
                <View style={styles.optionsContainer}>
                  {['M', 'F', 'Outro'].map((gen) => (
                    <TouchableOpacity
                      key={gen}
                      style={[
                        styles.optionButton,
                        userInfo?.gender === gen && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, gender: gen } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.gender === gen && styles.optionTextActive
                      ]}>{gen}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Objetivo</Text>
                <View style={styles.optionsContainer}>
                  {['Perder Peso', 'Manter Peso', 'Ganhar massa'].map((obj) => (
                    <TouchableOpacity
                      key={obj}
                      style={[
                        styles.optionButton,
                        userInfo?.goal === obj && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, goal: obj } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.goal === obj && styles.optionTextActive
                      ]}>{obj}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nível de Atividade</Text>
                <View style={styles.optionsContainer}>
                  {['Sedentário', 'Leve', 'Moderado', 'Intenso', 'Intermediário'].map((nivel) => (
                    <TouchableOpacity
                      key={nivel}
                      style={[
                        styles.optionButton,
                        userInfo?.fitness_level === nivel && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, fitness_level: nivel } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.fitness_level === nivel && styles.optionTextActive
                      ]}>{nivel}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveUserInfo}
            >
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}