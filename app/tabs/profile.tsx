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
import { styles } from '@/styles/Profile';
import { router } from 'expo-router';

const STORAGE_KEYS = {
  PROFILE_IMAGE: '@profile_image',
  USER_INFO: '@user_info',
};

interface UserInfo {
  peso: string;
  altura: string;
  idade: string;
  objetivo: string;
  nivelAtividade: string;
  genero: string;
}

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    peso: '',
    altura: '',
    idade: '',
    objetivo: 'Perder Peso',
    nivelAtividade: 'Moderado',
    genero: 'Masculino'
  });

  useEffect(() => {
    loadUserData();
    loadProfileImage();
    loadUserInfo();
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

  const loadUserInfo = async () => {
    try {
      const savedInfo = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
      if (savedInfo) {
        setUserInfo(JSON.parse(savedInfo));
      }
    } catch (error) {
      console.error('Erro ao carregar informações:', error);
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
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
      setModalVisible(false);
      Alert.alert('Sucesso', 'Informações salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as informações');
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
    if (userInfo.peso && userInfo.altura) {
      const pesoNum = parseFloat(userInfo.peso);
      const alturaNum = parseFloat(userInfo.altura) / 100;
      return (pesoNum / (alturaNum * alturaNum)).toFixed(1);
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
          <Text style={styles.statValue}>{userInfo.peso || '--'}</Text>
          <Text style={styles.statLabel}>Peso (kg)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userInfo.altura || '--'}</Text>
          <Text style={styles.statLabel}>Altura (cm)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{calculateIMC()}</Text>
          <Text style={styles.statLabel}>IMC</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userInfo.idade || '--'}</Text>
          <Text style={styles.statLabel}>Idade</Text>
        </View>
      </View>

      {/* Informações Adicionais */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎯 Objetivo</Text>
            <Text style={styles.infoValue}>{userInfo.objetivo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💪 Nível de Atividade</Text>
            <Text style={styles.infoValue}>{userInfo.nivelAtividade}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Gênero</Text>
            <Text style={styles.infoValue}>{userInfo.genero}</Text>
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
                  value={userInfo.peso}
                  onChangeText={(text) => setUserInfo({...userInfo, peso: text})}
                  keyboardType="numeric"
                  placeholder="Ex: 70"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Altura (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={userInfo.altura}
                  onChangeText={(text) => setUserInfo({...userInfo, altura: text})}
                  keyboardType="numeric"
                  placeholder="Ex: 175"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Idade</Text>
                <TextInput
                  style={styles.input}
                  value={userInfo.idade}
                  onChangeText={(text) => setUserInfo({...userInfo, idade: text})}
                  keyboardType="numeric"
                  placeholder="Ex: 25"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gênero</Text>
                <View style={styles.optionsContainer}>
                  {['Masculino', 'Feminino', 'Outro'].map((gen) => (
                    <TouchableOpacity
                      key={gen}
                      style={[
                        styles.optionButton,
                        userInfo.genero === gen && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo({...userInfo, genero: gen})}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo.genero === gen && styles.optionTextActive
                      ]}>{gen}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Objetivo</Text>
                <View style={styles.optionsContainer}>
                  {['Perder Peso', 'Manter Peso', 'Ganhar Massa'].map((obj) => (
                    <TouchableOpacity
                      key={obj}
                      style={[
                        styles.optionButton,
                        userInfo.objetivo === obj && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo({...userInfo, objetivo: obj})}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo.objetivo === obj && styles.optionTextActive
                      ]}>{obj}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nível de Atividade</Text>
                <View style={styles.optionsContainer}>
                  {['Sedentário', 'Leve', 'Moderado', 'Intenso'].map((nivel) => (
                    <TouchableOpacity
                      key={nivel}
                      style={[
                        styles.optionButton,
                        userInfo.nivelAtividade === nivel && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo({...userInfo, nivelAtividade: nivel})}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo.nivelAtividade === nivel && styles.optionTextActive
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