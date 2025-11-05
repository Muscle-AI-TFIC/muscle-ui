import type { LoadProfileParams } from '@/types/interfaces/load';
import type { LogoutParams } from '@/types/interfaces/logout';
import type { UpdateProfileParams } from '@/types/interfaces/update';
import { supabase } from '@/services/supabase';
import { UserInfo } from '@/types/UserInfo'
import { Alert } from 'react-native';

export const loadUserProfile = async ({
  userId,
  setUserInfo,
  setUserEmail,
  setUserName,
}: LoadProfileParams) => {
  try {
    // Buscar dados do auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUserEmail(user.email || "");
      setUserName(user.user_metadata?.name || user.email?.split('@')[0] || "Usuário");

      // Buscar dados do perfil
      const { data: profileData, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (profileData) {
        setUserInfo(profileData as UserInfo);
      }
    }
  } catch (error: any) {
    console.error('Erro ao carregar perfil:', error);
    Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
  }
};

// Atualizar perfil
export const updateUserProfile = async ({
  userId,
  userInfo,
  onSuccess,
  setLoading,
}: UpdateProfileParams) => {
  // Validações
  if (!userInfo.weight_kg || userInfo.weight_kg <= 0) {
    Alert.alert('Erro', 'Peso inválido');
    return;
  }

  if (!userInfo.height_cm || userInfo.height_cm <= 0) {
    Alert.alert('Erro', 'Altura inválida');
    return;
  }

  if (setLoading) setLoading(true);

  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        weight_kg: userInfo.weight_kg,
        height_cm: userInfo.height_cm,
        birth_date: userInfo.birth_date,
        gender: userInfo.gender,
        goal: userInfo.goal,
        fitness_level: userInfo.fitness_level,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    onSuccess();
  } catch (error: any) {
    console.error('Erro ao atualizar perfil:', error);
    Alert.alert('Erro', 'Não foi possível atualizar o perfil');
  } finally {
    if (setLoading) setLoading(false);
  }
};

// Fazer logout
export const logoutUser = async ({
  setLoading,
  onSuccess,
}: LogoutParams) => {
  setLoading(true);

  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    onSuccess();
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error);
    Alert.alert('Erro', 'Não foi possível sair da conta');
  } finally {
    setLoading(false);
  }
};