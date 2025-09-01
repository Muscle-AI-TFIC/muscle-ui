import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/services/firebase";
import { registerprops } from "@/styles/Register";
import { db, auth } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { router } from "expo-router";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const submitRegistration = async () => {
    try {
      registerSchema.parse(formData);
      setErrors({});
    } catch (err: any) {
      if (err.errors) {
        const fieldErrors: Partial<RegisterFormData> = {};
        err.errors.forEach((e: any) => {
          const path = e.path[0] as keyof RegisterFormData;
          fieldErrors[path] = e.message;
        });
        setErrors(fieldErrors);
        Alert.alert("Erro", "Por favor, corrija os erros no formulário");
      }
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name.trim(),
      });

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

      await setDoc(doc(db, "usuarios", user.uid), userData, { merge: false });

      Alert.alert("Sucesso!", "Registro realizado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/main/home") },
      ]);
    } catch (error: any) {
      const message = error?.code ? getFirebaseErrorMessage(error.code) : error?.message || "Erro inesperado";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field: keyof RegisterFormData) => {
    const placeholders: Record<keyof RegisterFormData, string> = {
      name: "Nome completo",
      email: "Email",
      password: "Senha (mínimo 6 caracteres)",
      confirmPassword: "Confirmar senha",
    };

    return (
      <View key={field} style={registerprops.inputContainer}>
        <TextInput
          style={[registerprops.input, errors[field] ? registerprops.inputError : null]}
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
        {errors[field] && <Text style={registerprops.errorText}>{errors[field]}</Text>}
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
          <Image style={registerprops.logo} source={require("@/assets/images/logo.png")} />
          <Text style={registerprops.subtitle}>Preencha os dados abaixo para criar sua conta</Text>
        </View>

        <View style={registerprops.form}>
          {(["name", "email", "password", "confirmPassword"] as const).map(renderInputField)}
        </View>

        <TouchableOpacity
          style={[registerprops.registerButton, loading ? registerprops.registerButtonDisabled : null]}
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
