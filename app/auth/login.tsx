import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button } from "react-native";
import { auth } from "@/services/firebase"; // seu serviço Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Sucesso", `Bem-vindo, ${user.email}`);
    } catch (error: any) {
      Alert.alert("Erro", error.code || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <Button title={loading ? "Entrando..." : "Login"} onPress={handleLogin} disabled={loading} />
    </View>
  );
};
