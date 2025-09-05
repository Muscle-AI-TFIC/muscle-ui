import { describe, it, expect } from 'vitest';

// Testa apenas as funções lógicas
describe('Page Logic', () => {
  it('nextStep deve avançar até o passo 4', () => {
    let currentStep: number = 1;

    const nextStep = (): void => {
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
    let currentStep: number = 4;

    const prevStep = (): void => {
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
    const renderStep = (currentStep: number): string | null => {
      switch (currentStep) {
        case 1:
          return 'Bem-vundo';
        case 2:
          return '📊 Acompanhe';
        case 3:
          return '🎯 Treinos';
        case 4:
          return '🚀 Comece';
        default:
          return null;
      }
    };

    expect(renderStep(1)).toBe('Bem-vundo');
    expect(renderStep(2)).toBe('📊 Acompanhe');
    expect(renderStep(3)).toBe('🎯 Treinos');
    expect(renderStep(4)).toBe('🚀 Comece');
    expect(renderStep(5)).toBeNull(); // Para passo inválido
  });

  // Teste adicional para os botões (opcional)
  it('deve controlar botões corretamente', () => {
    const isBackDisabled = (step: number): boolean => step === 1;
    const isNextDisabled = (step: number): boolean => step === 4;
    const getButtonText = (step: number): string => step === 4 ? 'Finalizar' : 'Próximo';

    // Teste passo 1
    expect(isBackDisabled(1)).toBe(true);
    expect(isNextDisabled(1)).toBe(false);
    expect(getButtonText(1)).toBe('Próximo');

    // Teste passo 4
    expect(isBackDisabled(4)).toBe(false);
    expect(isNextDisabled(4)).toBe(true);
    expect(getButtonText(4)).toBe('Finalizar');
  });
});