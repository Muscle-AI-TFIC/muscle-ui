import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ProgressDots } from '@/components/ProgressDots';
import { WelcomeStep } from '@/components/WelcomeStep';
import { WELCOME_STEPS } from '@/utils/welcomeSteps';
import { welcomeStyles } from '@/styles/Welcome';
import { useWelcome } from '@/hooks/useWelcome';
import React from 'react';

export default function WelcomePage() {
  const {
    currentStep,
    totalSteps,
    progress,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep
  } = useWelcome();

  const currentStepData = WELCOME_STEPS[currentStep - 1];

  return (
    <ScrollView contentContainerStyle={welcomeStyles.container}>
      <View style={welcomeStyles.card}>
        <WelcomeStep
          title={currentStepData.title}
          text={currentStepData.text}
          imageText={currentStepData.imageText}
          icon={currentStepData.icon}
          isLast={currentStepData.isLast}
        />
      </View>

      <View style={welcomeStyles.progressBarContainer}>
        <View
          style={[welcomeStyles.progressBarFill, { width: `${progress}%` }]}
        />
      </View>

      <View style={welcomeStyles.buttons}>
        <TouchableOpacity
          style={[
            welcomeStyles.button,
            isFirstStep && welcomeStyles.disabledButton
          ]}
          onPress={prevStep}
          disabled={isFirstStep}
        >
          <Text style={welcomeStyles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={welcomeStyles.button} onPress={nextStep}>
          <Text style={welcomeStyles.buttonText}>
            {isLastStep ? 'Finalizar' : 'Próximo'}
          </Text>
        </TouchableOpacity>
      </View>

      <ProgressDots total={totalSteps} current={currentStep} />
    </ScrollView>
  );
}