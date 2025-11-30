import { Text, View, Image } from "react-native";
import { welcomeStyles } from "@/styles/Welcome";
import type { WelcomeStepProps } from "@/types/interfaces/welcome";

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
	title,
	text,
	imageText,
	imageUrl,
	icon,
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
					<Image
						source={{ uri: imageUrl }}
						style={welcomeStyles.image}
						resizeMode="cover"
					/>
				</View>
			) : (
				// Fallback para placeholder
				<View style={welcomeStyles.imagePlaceholder}>
					<Text style={welcomeStyles.fakeImage}>{imageText}</Text>
				</View>
			)}
		</View>
	);
};