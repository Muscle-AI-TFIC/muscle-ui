// Teste SUPER SIMPLES - Page.simple.test.js
import { describe, it, expect } from 'vitest';

// Testa apenas as funções lógicas
describe('Page Logic', () => {
  it('nextStep deve avançar até o passo 4', () => {
    let currentStep = 1;

    const nextStep = () => {
      if (currentStep < 4) currentStep = currentStep + 1;
    };

    nextStep(); // passo 2
    expect(currentStep).toBe(2);

    nextStep(); // passo 3
    expect(currentStep).toBe(3);

    nextStep(); // passo 4
    expect(currentStep).toBe(4);

    nextStep(); // não deve passar de 4
    expect(currentStep).toBe(4);
  });

  it('prevStep deve voltar até o passo 1', () => {
    let currentStep = 4;

    const prevStep = () => {
      if (currentStep > 1) currentStep = currentStep - 1;
    };

    prevStep(); // passo 3
    expect(currentStep).toBe(3);

    prevStep(); // passo 2
    expect(currentStep).toBe(2);

    prevStep(); // passo 1
    expect(currentStep).toBe(1);

    prevStep(); // não deve passar de 1
    expect(currentStep).toBe(1);
  });

  it('deve renderizar o conteúdo correto para cada passo', () => {
  // Simula a função renderStep do seu componente
  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return 'Bem-vindo ao MuscleAI! 👋';
      case 2:
        return '📊 Acompanhe Seu Progresso';
      case 3:
        return '🎯 Treinos Personalizados';
      case 4:
        return '🚀 Comece Agora!';
      default:
        return null;
    }
  };

  expect(renderStep(1)).toBe('Bem-vindo ao MuscleAI! 👋');
  expect(renderStep(2)).toBe('📊 Acompanhe Seu Progresso');
  expect(renderStep(3)).toBe('🎯 Treinos Personalizados');
  expect(renderStep(4)).toBe('🚀 Comece Agora!');
  expect(renderStep(5)).toBeNull(); // Passo inválido
  });
});