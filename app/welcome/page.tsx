"use client";

import React, { useState } from "react";

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
          <div style={styles.stepContent}>
            <h3>Bem-vindo ao MuscleAI! 👋</h3>
            <p>
              Vamos te mostrar como usar nossa plataforma para maximizar seus
              treinos.
            </p>
            <div style={styles.imagePlaceholder}>
              <div style={styles.fakeImage}>Imagem de Boas-vindas</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={styles.stepContent}>
            <h3>📊 Acompanhe Seu Progresso</h3>
            <p>
              Monitore suas estatísticas, evolução muscular e desempenho nos
              treinos.
            </p>
            <div style={styles.imagePlaceholder}>
              <div style={styles.fakeChart}>Gráfico de Progresso</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={styles.stepContent}>
            <h3>🎯 Treinos Personalizados</h3>
            <p>
              Receba recomendações de exercícios baseadas no seu histórico e
              objetivos.
            </p>
            <div style={styles.imagePlaceholder}>
              <div style={styles.fakeWorkout}>Exercícios Personalizados</div>
            </div>
          </div>
        );
      case 4:
        return (
          <div style={styles.stepContent}>
            <h3>🚀 Comece Agora!</h3>
            <p>Explore todas as funcionalidades e transforme seus treinos!</p>
            <div style={styles.successIcon}>✅</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>{renderStep()}</div>

      <div style={styles.buttons}>
        <button onClick={prevStep} disabled={currentStep === 1}>
          Voltar
        </button>
        <button onClick={nextStep} disabled={currentStep === 4}>
          {currentStep === 4 ? "Finalizar" : "Próximo"}
        </button>
      </div>

      <div style={styles.progress}>
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: currentStep === i + 1 ? "#0070f3" : "#ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "sans-serif",
    padding: "20px",
  },
  card: {
    maxWidth: "500px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  stepContent: {
    marginBottom: "20px",
  },
  imagePlaceholder: {
    marginTop: "10px",
    padding: "30px",
    border: "2px dashed #ccc",
    borderRadius: "8px",
  },
  fakeImage: { color: "#555" },
  fakeChart: { color: "#555" },
  fakeWorkout: { color: "#555" },
  successIcon: { fontSize: "32px", marginTop: "10px" },
  buttons: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },
  progress: {
    marginTop: "15px",
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
};

export default Page;
