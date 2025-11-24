import { View, Text } from "react-native";
import { styles } from "@/styles/ToDo"; // Assuming styles are shared or will be moved
import { getProgressPercentage } from "../utils/progressPercentage";

interface ProgressBarProps {
	completed: number;
	total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
	const progressPercentage = getProgressPercentage(completed, total);

	return (
		<View style={styles.progressContainer}>
			<View style={styles.progressTextContainer}>
				<Text style={styles.progressText}>
					{completed}/{total} completos
				</Text>
				<Text style={styles.percentageText}>
					{Math.round(progressPercentage)}%
				</Text>
			</View>
			<View style={styles.progressBar}>
				<View
					style={[styles.progressFill, { width: `${progressPercentage}%` }]}
				/>
			</View>
		</View>
	);
}
