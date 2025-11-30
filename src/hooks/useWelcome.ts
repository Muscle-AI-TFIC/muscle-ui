import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
	nextStepLogic,
	prevStepLogic,
	progressLogic,
} from "@/services/welcomeLogic";
import { WELCOME_STEPS } from "@/utils/welcomeSteps";

const TOTAL_STEPS = WELCOME_STEPS.length;

export const useWelcome = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const progress = useMemo(
		() => progressLogic(currentStep, TOTAL_STEPS),
		[currentStep],
	);

	const isFirstStep = currentStep === 1;
	const isLastStep = currentStep === TOTAL_STEPS;

	const nextStep = () => setCurrentStep((prev) => nextStepLogic(prev));
	const prevStep = () => setCurrentStep((prev) => prevStepLogic(prev));

	const handleNext = () => {
		if (isLastStep) {
			router.push("/tabs/home");
		} else {
			nextStep();
		}
	};

	return {
		currentStep,
		totalSteps: TOTAL_STEPS,
		progress,
		isFirstStep,
		isLastStep,
		nextStep: handleNext,
		prevStep,
	};
};
