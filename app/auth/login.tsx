import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Animated
} from "react-native";
import { supabase } from "@/services/supabase";
import { loginProps } from "@/styles/Login";
import { router } from "expo-router";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      setUserEmail(data.user?.email || email);
      setShowSuccessModal(true);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/tabs/home");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={loginProps.screen}>
          <Text style={loginProps.containerTop}>Login</Text>
          <Image style={loginProps.logo} source={require("assets/images/logo-final.png")} />
          <View style={loginProps.email}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={loginProps.password}>
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View>
            <TouchableOpacity
              style={loginProps.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={loginProps.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={loginProps.footer}>
            <Text style={loginProps.footerText}>Esqueceu a senha?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/register")}>
              <Text style={loginProps.footerText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal Customizado */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleModalClose}
        email={userEmail}
      />
    </KeyboardAvoidingView>
  );
}