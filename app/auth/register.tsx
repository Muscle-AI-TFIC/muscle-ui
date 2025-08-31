import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { registerprops } from "@/src/styles/Register";
import { db, auth } from "@/src/services/firebase"; // Added auth import
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getFirebaseErrorMessage = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use": 
        return "Este email já está em uso";
      case "auth/invalid-email": 
        return "Email inválido";
      case "auth/operation-not-allowed": 
        return "Operação não permitida";
      case "auth/weak-password": 
        return "Senha muito fraca";
      case "auth/network-request-failed": 
        return "Erro de conexão. Verifique sua internet";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde";
      case "firestore/permission-denied":
        return "Erro de permissão. Verifique as regras do Firestore";
      case "firestore/unavailable":
        return "Serviço temporariamente indisponível";
      case "firestore/deadline-exceeded":
        return "Tempo limite excedido. Tente novamente";
      default: 
        return "Erro ao criar conta. Tente novamente";
    }
  };

  const submitRegistration = async () => {
    if (!validateForm()) {
      Alert.alert("Erro", "Por favor, corrija os erros no formulário");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Iniciando registro...");
      
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email.trim(), 
        formData.password
      );
      const user = userCredential.user;
      console.log("Usuário criado no Auth:", user.uid);

      // Update user profile with display name in Firebase Auth
      await updateProfile(user, {
        displayName: formData.name.trim()
      });
      console.log("Perfil atualizado no Auth");

      // Prepare user data for Firestore
      const userData = {
        uid: user.uid,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        displayName: formData.name.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        profileComplete: true,
      };

      console.log("Salvando no Firestore...", userData);

      // Save complete user data to Firestore using UID as document ID
      await setDoc(doc(db, "usuarios", user.uid), userData, { merge: false });
      
      console.log("Dados salvos no Firestore com sucesso");

      Alert.alert(
        "Sucesso!", 
        "Registro realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/home")
          }
        ]
      );

    } catch (error: any) {
      console.error("Registration error full:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      
      let errorMessage = "Não foi possível registrar. Tente novamente";
      
      if (error?.code) {
        errorMessage = getFirebaseErrorMessage(error.code);
      } else if (error?.message) {
        errorMessage = `Erro: ${error.message}`;
      }
      
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field: keyof RegisterFormData) => {
    const placeholders = {
      name: "Nome completo",
      email: "Email",
      password: "Senha (mínimo 6 caracteres)",
      confirmPassword: "Confirmar senha"
    };

    return (
      <View key={field} style={registerprops.inputContainer}>
        <TextInput
          style={[
            registerprops.input, 
            errors[field] ? registerprops.inputError : null
          ]}
          placeholder={placeholders[field]}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          secureTextEntry={field === "password" || field === "confirmPassword"}
          autoCapitalize={field === "name" ? "words" : "none"}
          keyboardType={field === "email" ? "email-address" : "default"}
          returnKeyType={field === "confirmPassword" ? "done" : "next"}
          autoComplete={field.includes("password") ? "new-password" : undefined}
          editable={!loading}
        />
        {errors[field] && (
          <Text style={registerprops.errorText}>
            {errors[field]}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={registerprops.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={registerprops.scrollContent} 
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false}
      >
        <View style={registerprops.header}>
          <Text style={registerprops.title}>Criar Conta</Text>
          <Image 
            style={registerprops.logo} 
            source={require("@/assets/images/logo.png")}
          />
          <Text style={registerprops.subtitle}>
            Preencha os dados abaixo para criar sua conta
          </Text>
        </View>

        <View style={registerprops.form}>
          {(["name", "email", "password", "confirmPassword"] as const).map(renderInputField)}
        </View>

        <TouchableOpacity 
          style={[
            registerprops.registerButton, 
            loading ? registerprops.registerButtonDisabled : null
          ]} 
          onPress={submitRegistration} 
          disabled={loading} 
          activeOpacity={0.8}
        >
          {loading ? (
            <View style={registerprops.loadingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={registerprops.registerButtonText}>Registrando...</Text>
            </View>
          ) : (
            <Text style={registerprops.registerButtonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>

        <View style={registerprops.footer}>
          <Text style={registerprops.footerText}>
            Ao criar uma conta, você concorda com nossos{" "}
            <Text style={registerprops.linkText}>Termos de Uso</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}