import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	primary: {
		backgroundColor: "#007AFF",
	},
	secondary: {
		backgroundColor: "#8E8E93",
	},
	disabled: {
		opacity: 0.5,
	},
});
