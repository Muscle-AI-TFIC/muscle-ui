import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	nextStepLogic,
	prevStepLogic,
	progressLogic,
} from "@/services/welcomeLogic";
import { supabase } from "@/services/supabase";
import { getTrainingSheet } from "@/services/trainingSheet";
import {
	updateWaitingStatus,
	updateFirstAccessStatus,
} from "@/services/user_profile";

const TOTAL_STEPS = 5;

export const useWelcome = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [userId, setUserId] = useState<string | null>(null);
	const [hasTrainingSheet, setHasTrainingSheet] = useState<boolean>(false);
	const [loadingTrainingSheet, setLoadingTrainingSheet] =
		useState<boolean>(true);

	const progress = useMemo(
		() => progressLogic(currentStep, TOTAL_STEPS),
		[currentStep],
	);

	const isFirstStep = currentStep === 1;
	const isLastStep = currentStep === TOTAL_STEPS;

	const fetchTrainingSheetStatus = useCallback(async () => {
		setLoadingTrainingSheet(true);
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			setUserId(user.id);
			const trainingSheet = await getTrainingSheet();
			setHasTrainingSheet(!!trainingSheet);
		}
		setLoadingTrainingSheet(false);
	}, []);

	useEffect(() => {
		if (isLastStep) {
			fetchTrainingSheetStatus();
		}
	}, [isLastStep, fetchTrainingSheetStatus]);

	const nextStep = () => setCurrentStep((prev) => nextStepLogic(prev));
	const prevStep = () => setCurrentStep((prev) => prevStepLogic(prev));

	const handleNext = async () => {
		if (isLastStep) {
			if (userId) {
				await updateFirstAccessStatus(userId, false); // Update first-access status
			}

			if (hasTrainingSheet) {
				router.push("/tabs/home");
			} else if (userId) {
				const success = await updateWaitingStatus(userId, true);
				if (success) {
					router.push("/tabs/home");
				}
			}
		} else {
			nextStep();
		}
	};

	const handleGenerateTraining = async () => {
		if (userId) {
			await updateFirstAccessStatus(userId, false); // Update first-access status
			const success = await updateWaitingStatus(userId, true);
			if (success) {
				router.push("/tabs/home");
			}
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
		hasTrainingSheet,
		loadingTrainingSheet,
		handleGenerateTraining,
	};
};
