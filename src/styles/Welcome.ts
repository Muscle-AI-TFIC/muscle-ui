import { StyleSheet } from "react-native";

export const welcomeStyles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#121212",
	},
	card: {
		width: "100%",
		maxWidth: 500,
		backgroundColor: "#1E1E1E",
		padding: 20,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 3,
	},
	stepContent: {
		marginBottom: 20,
	},
	stepTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
		color: "#FFA500",
	},
	stepText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 10,
		color: "#DDD",
	},
	imagePlaceholder: {
		marginTop: 10,
		padding: 30,
		borderWidth: 2,
		borderStyle: "dashed",
		borderColor: "#555",
		borderRadius: 8,
		alignItems: "center",
	},
	fakeImage: {
		color: "#AAA",
	},
	successIcon: {
		fontSize: 32,
		textAlign: "center",
		marginTop: 10,
		color: "#FFA500",
	},
	buttons: {
		flexDirection: "row",
		gap: 10,
		marginTop: 20,
	},
	button: {
		flex: 1,
		padding: 15,
		backgroundColor: "#FFA500",
		borderRadius: 8,
		alignItems: "center",
	},
	disabledButton: {
		backgroundColor: "#444",
	},
	buttonText: {
		color: "#000",
		fontWeight: "bold",
		fontSize: 16,
	},
	progress: {
		flexDirection: "row",
		marginTop: 15,
		gap: 8,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	progressBarContainer: {
		height: 8,
		width: "80%",
		backgroundColor: "#333",
		borderRadius: 4,
		marginVertical: 20,
		alignSelf: "center",
	},
	progressBarFill: {
		height: "100%",
		backgroundColor: "#FFA500",
		borderRadius: 4,
	},
});
