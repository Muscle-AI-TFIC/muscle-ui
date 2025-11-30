import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const registerprops = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#121212",
		alignItems: "center",
		justifyContent: "center",
	},

	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	header: {
		marginBottom: 32,
		alignItems: "center",
	},

	logo: {
		width: screenWidth * 0.5,
		height: screenWidth * 0.5,
		resizeMode: "contain",
		marginBottom: 16,
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#FFA500",
		textAlign: "center",
		marginBottom: 10,
	},

	subtitle: {
		fontSize: 16,
		color: "#d1d1d1",
		textAlign: "center",
		marginBottom: 20,
	},

	form: {
		width: "100%",
		alignItems: "center",
		marginBottom: 24,
	},

	inputContainer: {
		width: "100%",
		alignItems: "center",
		marginBottom: 10,
	},

	input: {
		width: "65%",
		maxWidth: 350,
		height: 50,
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingHorizontal: 15,
		fontSize: 16,
		color: "#000",
		textAlign: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		marginBottom: 16,
	},

	inputError: {
		borderColor: "#ff4444",
		borderWidth: 1,
	},

	registerButton: {
		backgroundColor: "#FFA500",
		borderRadius: 30,
		padding: 16,
		paddingHorizontal: screenWidth * 0.1,
		alignItems: "center",
		marginTop: 10,
	},

	registerButtonText: {
		color: "#000",
		fontWeight: "600",
		fontSize: 16,
	},

	registerButtonDisabled: {
		opacity: 0.7,
	},

	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},

	errorText: {
		color: "#ff4444",
		fontSize: 12,
		marginBottom: 8,
	},

	footer: {
		marginTop: 24,
		alignItems: "center",
	},

	footerText: {
		fontSize: 12,
		color: "#FFA500",
		textAlign: "center",
		lineHeight: 16,
	},

	linkText: {
		color: "#FFA500",
		fontWeight: "600",
	},
});
