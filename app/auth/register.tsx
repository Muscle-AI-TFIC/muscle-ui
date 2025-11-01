import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { supabase } from "@/services/supabase";
import { registerprops } from "@/styles/Register";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { router } from "expo-router";
import { z } from "zod";

const parseNumber = (v: any) => {
  if (!v) return 0;
  const num = Number(String(v).replace(',', '.'));
  return isNaN(num) ? 0 : num;
};

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
  altura: z.preprocess(parseNumber, z.number().positive("Altura deve ser positiva")),
  peso: z.preprocess(parseNumber, z.number().positive("Peso deve ser positivo")),
  idade: z.preprocess(parseNumber, z.number().int("Idade deve ser inteira").positive("Idade deve ser positiva")),
  goal: z.string().min(1, "Objetivo é obrigatório").max(100, "Objetivo muito longo"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"],
});

const FIELDS = [
  { key: "name", placeholder: "Nome completo", autoCapitalize: "words" as const },
  { key: "email", placeholder: "Email", keyboardType: "email-address" as const },
  { key: "password", placeholder: "Senha (mínimo 6 caracteres)", secureTextEntry: true },
  { key: "confirmPassword", placeholder: "Confirmar senha", secureTextEntry: true },
  { key: "altura", placeholder: "Altura em metros (Ex: 1.75)", keyboardType: "decimal-pad" as const },
  { key: "peso", placeholder: "Peso em kg (Ex: 70.5)", keyboardType: "decimal-pad" as const },
  { key: "idade", placeholder: "Idade em anos", keyboardType: "numeric" as const },
  { key: "goal", placeholder: "Objetivo (Ex: Ganhar massa muscular)" },
];

export default function RegisterScreen() {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(FIELDS.map(f => [f.key, ""]))
  );
  const [loading, setLoading] = useState(false);

  const updateField = (key: string, value: string) => 
    setFormData(prev => ({ ...prev, [key]: value }));

  const submitRegistration = async () => {
    try {
      const validated = registerSchema.parse(formData);
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: insertError } = await supabase.from('person_info').insert({
          user_id: data.user.id,
          name: formData.name.trim(),
          height: validated.altura,
          weight: validated.peso,
          age: validated.idade,
          goal: formData.goal.trim(),
        });

        if (insertError) throw insertError;
      }

      Alert.alert("Sucesso!", "Registro realizado! Verifique seu email.", [
        { text: "OK", onPress: () => router.replace("/auth/login") }
      ]);
    } catch (err: any) {
      const message = err.errors 
        ? "Por favor, corrija os erros no formulário" 
        : err.message || "Ocorreu um erro durante o registro.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
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
          <Image style={registerprops.logo} source={require("../../assets/images/logo.png")} />
          <Text style={registerprops.subtitle}>Preencha os dados abaixo para criar sua conta</Text>
        </View>

        <View style={registerprops.form }>
          {FIELDS.map(({ key, placeholder, ...props }) => (
            <View key={key} style={{ width: "100%", alignItems: "center" }}>
              <TextInput
                style={registerprops.input}
                placeholder={placeholder}
                value={formData[key]}
                onChangeText={(v) => updateField(key, v)}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                {...props}

              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[registerprops.registerButton, loading && registerprops.registerButtonDisabled]}
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