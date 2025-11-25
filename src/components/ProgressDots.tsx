import type React from "react";
import { View } from "react-native";
import { welcomeStyles } from "@/styles/Welcome";

interface ProgressDotsProps {
	total: number;
	current: number;
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({
	total,
	current,
}) => {
	return (
		<View style={welcomeStyles.progress}>
			{Array.from({ length: total }, (_, i) => (
				<View
					// biome-ignore lint/suspicious/noArrayIndexKey: The list is static, so the index is a safe and stable key.
					key={i}
					style={[
						welcomeStyles.dot,
						{ backgroundColor: current === i + 1 ? "#FFA500" : "#ccc" },
					]}
				/>
			))}
		</View>
	);
};
