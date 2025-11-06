import { View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser, navigateToHome, navigateToRegister } from "@/services/login";
import SuccessModal from "@/components/SuccessModal/SuccessModal";
import { loginProps } from "@/styles/Login";
import React, { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    await loginUser({
      email,
      password,
      setLoading,
      onSuccess: (userEmail) => {
        setUserEmail(userEmail);
        setShowSuccessModal(true);
      },
    });
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigateToHome();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginProps.screen}>
          <Text style={loginProps.containerTop}>Login</Text>
          <Image 
            style={loginProps.logo} 
            source={require("assets/images/logo-final.png")} 
          />

          <View style={loginProps.email}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <View style={loginProps.password}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={loginProps.loginButton}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={loginProps.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={loginProps.footer}>
            <Text style={loginProps.footerText}>Esqueceu a senha?</Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={loginProps.footerText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SuccessModal
        visible={showSuccessModal}
        onClose={handleModalClose}
        email={userEmail}
      />
    </KeyboardAvoidingView>
  );
}