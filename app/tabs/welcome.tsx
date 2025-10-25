import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { welcomeStyles } from "@/styles/Welcome";
import { router } from 'expo-router';

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={welcomeStyles.stepContent}>
            <Text style={welcomeStyles.stepTitle}>Bem-vindo ao MuscleAI! 👋</Text>
            <Text style={welcomeStyles.stepText}>
              Vamos te mostrar como usar nossa plataforma para maximizar seus treinos.
            </Text>
            <View style={welcomeStyles.imagePlaceholder}>
              <Text style={welcomeStyles.fakeImage}>Imagem de Boas-vindas</Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={welcomeStyles.stepContent}>
            <Text style={welcomeStyles.stepTitle}>📊 Acompanhe Seu Progresso</Text>
            <Text style={welcomeStyles.stepText}>
              Monitore suas estatísticas, evolução muscular e desempenho nos treinos.
            </Text>
            <View style={welcomeStyles.imagePlaceholder}>
              <Text style={welcomeStyles.fakeImage}>Gráfico de Progresso</Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={welcomeStyles.stepContent}>
            <Text style={welcomeStyles.stepTitle}>🎯 Treinos Personalizados</Text>
            <Text style={welcomeStyles.stepText}>
              Receba recomendações de exercícios baseadas no seu histórico e objetivos.
            </Text>
            <View style={welcomeStyles.imagePlaceholder}>
              <Text style={welcomeStyles.fakeImage}>Exercícios Personalizados</Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={welcomeStyles.stepContent}>
            <Text style={welcomeStyles.stepTitle}>🚀 Comece Agora!</Text>
            <Text style={welcomeStyles.stepText}>
              Explore todas as funcionalidades e transforme seus treinos!
            </Text>
            <Text style={welcomeStyles.successIcon}>✅</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={welcomeStyles.container}>
      <View style={welcomeStyles.card}>{renderStep()}</View>

      <View style={welcomeStyles.buttons}>
        <TouchableOpacity
          style={[welcomeStyles.button, currentStep === 1 && welcomeStyles.disabledButton]}
          onPress={prevStep}
          disabled={currentStep === 1}
        >
          <Text style={welcomeStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={welcomeStyles.button}
          onPress={() => {
            if (currentStep === 4) {
              router.push('/tabs/home');
            } else {
              nextStep();
            }
          }}
        >
          <Text style={welcomeStyles.buttonText}>
            {currentStep === 4 ? "Finalizar" : "Próximo"}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={welcomeStyles.progress}>
        {Array.from({ length: 4 }, (_, i) => (
          <View
            key={i}
            style={[
              welcomeStyles.dot,
              { backgroundColor: currentStep === i + 1 ? "#0070f3" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
};