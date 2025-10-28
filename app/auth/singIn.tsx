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
  Platform
} from "react-native";
import { loginProps } from "@/styles/Login";
import { router } from "expo-router";
import { signIn } from "@/services/signIn";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);

      if (error) throw error;

      Alert.alert("Sucesso", `Bem-vindo, ${data.user?.email}`,[
        { text: "OK", onPress: () => router.push("/tabs/home")}
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "android" ? "padding" : "height"}
    >
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
        <TouchableOpacity onPress={() => router.push("/auth/singUp")}>
          <Text style={loginProps.footerText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
  );
}