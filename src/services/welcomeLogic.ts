export const nextStepLogic = (
	currentStep: number,
	maxStep: number = 4,
): number => {
	return currentStep < maxStep ? currentStep + 1 : currentStep;
};

export const prevStepLogic = (currentStep: number): number => {
	return currentStep > 1 ? currentStep - 1 : currentStep;
};

export const progressLogic = (current: number, totalSteps = 4): number =>
	Math.min(100, Math.max(0, Math.round((current / totalSteps) * 100)));
