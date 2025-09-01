import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Button } from "@/src/components/Button/Button";
import * as styles from "@/src/styles/Login";
import * as buttonProps from "@/src/components/Button/Button.styles";

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    Alert.alert("Sucesso", `Bem-vindo, ${email}`);
  };

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className={styles.input}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className={styles.input}
      />

      <View className={styles.buttonContainer}>
        <Button className="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white" title="Entrar" onPress={handleLogin} />
      </View>

      <TouchableOpacity onPress={() => Alert.alert("Recuperar senha")}>
        <Text className={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};
