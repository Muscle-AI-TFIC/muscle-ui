import { Text, Image, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import { loadProfileImage, saveProfileImage, removeProfileImage, pickImageFromGallery } from "@/services/image";
import { loadUserProfile, updateUserProfile, logoutUser } from "@/services/profile";
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
      {/* Foto de Perfil */}
      <View style={styles.profileSection}>
        <TouchableOpacity
          onPress={handlePickImage}
          onLongPress={image ? handleRemoveImage : undefined}
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

      {/* Cards de Informações Físicas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userInfo.weight_kg || '--'}</Text>
          <Text style={styles.statLabel}>Peso (kg)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {userInfo.height_cm 
              ? (userInfo.height_cm > 10 ? userInfo.height_cm : userInfo.height_cm * 100).toFixed(0)
              : '--'}
          </Text>
          <Text style={styles.statLabel}>Altura (cm)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{calculateIMC(userInfo)}</Text>
          <Text style={styles.statLabel}>IMC</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{calculateAge(userInfo)}</Text>
          <Text style={styles.statLabel}>Idade</Text>
        </View>
      </View>

      {/* Informações Adicionais */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🎯 Objetivo</Text>
            <Text style={styles.infoValue}>
              {userInfo.goal 
                ? userInfo.goal.split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ).join(' ')
                : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>💪 Nível de Atividade</Text>
            <Text style={styles.infoValue}>
              {userInfo.fitness_level 
                ? userInfo.fitness_level.charAt(0).toUpperCase() + userInfo.fitness_level.slice(1).toLowerCase()
                : '--'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>👤 Gênero</Text>
            <Text style={styles.infoValue}>
              {userInfo.gender 
                ? userInfo.gender.charAt(0).toUpperCase() + userInfo.gender.slice(1).toLowerCase()
                : '--'}
            </Text>
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
            <Text style={styles.logoutText}>Sair da Conta</Text>
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
                  value={userInfo?.height_cm 
                    ? (userInfo.height_cm > 10 ? userInfo.height_cm : userInfo.height_cm * 100).toString()
                    : ''}
                  onChangeText={(text) => {
                    const value = parseFloat(text) || 0;
                    // Converter de volta para o formato da API (metros se > 10)
                    const heightValue = value > 10 ? value : value / 100;
                    setUserInfo(prev => prev ? { ...prev, height_cm: heightValue } : null);
                  }}
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
                  {[
                    { label: 'Masculino', value: 'masculino' },
                    { label: 'Feminino', value: 'feminino' },
                    { label: 'Outro', value: 'outro' }
                  ].map((gen) => (
                    <TouchableOpacity
                      key={gen.value}
                      style={[
                        styles.optionButton,
                        userInfo?.gender?.toLowerCase() === gen.value && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, gender: gen.value } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.gender?.toLowerCase() === gen.value && styles.optionTextActive
                      ]}>{gen.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Objetivo</Text>
                <View style={styles.optionsContainer}>
                  {[
                    { label: 'Perder Peso', value: 'perder peso' },
                    { label: 'Manter Peso', value: 'manter peso' },
                    { label: 'Ganhar Massa', value: 'ganhar massa' }
                  ].map((obj) => (
                    <TouchableOpacity
                      key={obj.value}
                      style={[
                        styles.optionButton,
                        userInfo?.goal?.toLowerCase() === obj.value && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, goal: obj.value } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.goal?.toLowerCase() === obj.value && styles.optionTextActive
                      ]}>{obj.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nível de Atividade</Text>
                <View style={styles.optionsContainer}>
                  {[
                    { label: 'Sedentário', value: 'sedentário' },
                    { label: 'Iniciante', value: 'iniciante' },
                    { label: 'Intermediário', value: 'intermediário' },
                    { label: 'Avançado', value: 'avançado' }
                  ].map((nivel) => (
                    <TouchableOpacity
                      key={nivel.value}
                      style={[
                        styles.optionButton,
                        userInfo?.fitness_level?.toLowerCase() === nivel.value && styles.optionButtonActive
                      ]}
                      onPress={() => setUserInfo(prev => prev ? { ...prev, fitness_level: nivel.value } : null)}
                    >
                      <Text style={[
                        styles.optionText,
                        userInfo?.fitness_level?.toLowerCase() === nivel.value && styles.optionTextActive
                      ]}>{nivel.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveUserInfo}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}