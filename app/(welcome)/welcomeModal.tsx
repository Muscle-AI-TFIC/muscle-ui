// app/(welcomeModal)//WelcomeModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AppColors } from './colors';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  userName = "Visitante"
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Total de etapas do tutorial

  // Fechar modal quando pressionar ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Previne scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <h3>Bem-vindo ao MuscleAI, {userName}! 👋</h3>
            <p>Vamos te mostrar como usar nossa plataforma para maximizar seus treinos.</p>
            <img src="/colocar imagem aqui" alt="Boas-vindas" style={styles.imagePlaceholder}/></div>
        );
      case 2:
        return (
          <div style={styles.stepContent}>
            <h3>📊 Acompanhe Seu Progresso</h3>
            <p>Monitore suas estatísticas, evolução muscular e desempenho nos treinos.</p>
            <div style={styles.imagePlaceholder}>
              <div style={styles.fakeChart}>Macarrão</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div style={styles.stepContent}>
            <h3>🎯 Treinos Personalizados</h3>
            <p>Receba recomendações de exercícios baseadas no seu histórico e objetivos.</p>
            <div style={styles.imagePlaceholder}>
              <div style={styles.fakeWorkout}></div>
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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose} aria-label="Fechar">
          ×
        </button>

        {renderStep()}

        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(currentStep / totalSteps) * 100}%`
              }}
            ></div>
          </div>
          <span style={styles.progressText}>
            Passo {currentStep} de {totalSteps}
          </span>
        </div>

        <div style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <button style={styles.secondaryButton} onClick={prevStep}>
              Anterior
            </button>
          )}

          <button style={styles.primaryButton} onClick={nextStep}>
            {currentStep === totalSteps ? 'Começar!' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.blurbackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: AppColors.background,
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    position: 'relative' as 'relative',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    position: 'absolute' as 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: AppColors.closeButton,
  },
  stepContent: {
    textAlign: 'center' as 'center',
    margin: '2rem 0',
  },
  imagePlaceholder: {
    width: '100%',
    height: '150px',
    backgroundColor: AppColors.secondary,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.5rem 0',
  },
  fakeChart: {
    width: '80%',
    height: '80%',
    backgroundColor: AppColors.background,
    borderRadius: '4px',
  },
  fakeWorkout: {
    width: '60%',
    height: '60%',
    backgroundColor: AppColors.background,
    borderRadius: '8px',
  },
  successIcon: {
    fontSize: '3rem',
    margin: '1rem 0',
  },
  progressContainer: {
    margin: '1.5rem 0',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: AppColors.background,
    borderRadius: '3px',
    overflow: 'hidden' as 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: AppColors.accent,
    transition: 'width 0.3s ease',
  },
  progressText: {
    display: 'block',
    textAlign: 'center' as 'center',
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  primaryButton: {
    padding: '0.8rem 2rem',
    backgroundColor: AppColors.secondary,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold' as 'bold',
  },
  secondaryButton: {
    padding: '0.8rem 2rem',
    backgroundColor: 'transparent',
    color: AppColors.secondary,
    border: '1px solid #3498db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default WelcomeModal;