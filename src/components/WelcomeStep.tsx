import { Image, Text, View } from "react-native";
import { welcomeStyles } from "@/styles/Welcome";
import type { WelcomeStepProps } from "@/types/interfaces/welcome";

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
	title,
	text,
	imageText,
	icon,
	imageUrl,
	isLast,
}) => {
	return (
		<View style={welcomeStyles.stepContent}>
			<Text style={welcomeStyles.stepTitle}>{title}</Text>
			<Text style={welcomeStyles.stepText}>{text}</Text>
			{isLast ? (
				<Text style={welcomeStyles.successIcon}>{icon}</Text>
			) : imageUrl ? (
				<View style={welcomeStyles.imageContainer}>
					<Image source={{ uri: imageUrl }} style={welcomeStyles.image} />
					{imageText && <Text style={welcomeStyles.imageText}>{imageText}</Text>}
				</View>
			) : null}
		</View>
	);
};
