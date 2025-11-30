import {
	type GestureResponderEvent,
	Text,
	TouchableOpacity,
} from "react-native";
import { styles } from "./Button.styles";

interface ButtonProps {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
	variant?: "primary" | "secondary";
}

export function Button({ title, onPress, variant = "primary" }: ButtonProps) {
	return (
		<TouchableOpacity
			style={[styles.button, styles[variant]]}
			onPress={onPress}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}
