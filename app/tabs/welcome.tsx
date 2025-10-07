import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

const Page: React.FC = () => {
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
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Bem-vindo ao MuscleAI! 👋</Text>
            <Text style={styles.stepText}>
              Vamos te mostrar como usar nossa plataforma para maximizar seus treinos.
            </Text>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.fakeImage}>Imagem de Boas-vindas</Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>📊 Acompanhe Seu Progresso</Text>
            <Text style={styles.stepText}>
              Monitore suas estatísticas, evolução muscular e desempenho nos treinos.
            </Text>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.fakeImage}>Gráfico de Progresso</Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>🎯 Treinos Personalizados</Text>
            <Text style={styles.stepText}>
              Receba recomendações de exercícios baseadas no seu histórico e objetivos.
            </Text>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.fakeImage}>Exercícios Personalizados</Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>🚀 Comece Agora!</Text>
            <Text style={styles.stepText}>
              Explore todas as funcionalidades e transforme seus treinos!
            </Text>
            <Text style={styles.successIcon}>✅</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>{renderStep()}</View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, currentStep === 1 && styles.disabledButton]}
          onPress={prevStep}
          disabled={currentStep === 1}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, currentStep === 4 && styles.disabledButton]}
          onPress={nextStep}
          disabled={currentStep === 4}
        >
          <Text style={styles.buttonText}>
            {currentStep === 4 ? "Finalizar" : "Próximo"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progress}>
        {Array.from({ length: 4 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: currentStep === i + 1 ? "#0070f3" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stepContent: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  imagePlaceholder: {
    marginTop: 10,
    padding: 30,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  fakeImage: {
    color: "#555",
  },
  successIcon: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: "#0070f3",
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  progress: {
    flexDirection: "row",
    marginTop: 15,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Page;
