import React, { useState} from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthError, UserCredential } from "firebase/auth";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginProps } from "@/styles/Login";

export default function LoginScreen(){
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
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      Alert.alert("Sucesso", `Bem-vindo, ${user.email}`);
    } catch (error) {
      const err = error as AuthError;
      Alert.alert("Erro", err.code || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <View style={loginProps.footer}>
        <Text style={loginProps.footerText}>Esqueceu a senha?</Text>
        <Text style={loginProps.footerText}>Criar conta</Text>
      </View>
    </View>
  );
}
