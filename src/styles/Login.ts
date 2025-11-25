import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const loginProps = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#FFA500",
		borderRadius: 100,
		borderWidth: 5,
	},

	containerTop: {
		color: "#FFA500",
		fontSize: 50,
		fontStyle: "italic",
	},

	containerBottom: {},

	screen: {
		backgroundColor: "#121212",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},

	email: {
		backgroundColor: "#fff",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		padding: 5,
		width: "65%",
		textAlign: "center",
		borderRadius: 10,
		marginTop: -24,
		borderWidth: 0,
		color: "#FFF",
	},

	password: {
		backgroundColor: "#ffffff",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		padding: 5,
		borderRadius: 10,
		marginTop: 16,
		width: "65%",
		textAlign: "center",
		color: "#FFF",
	},

	loginButton: {
		marginTop: 20,
		padding: 16,
		paddingHorizontal: screenWidth * 0.1,
		backgroundColor: "#FFA500",
		borderRadius: 30,
		alignItems: "center",
	},

	loginButtonText: {
		color: "#000",
		fontWeight: "600",
	},

	logo: {
		margin: screenWidth * 0.1,
		width: screenWidth * 0.5,
		height: screenWidth * 0.5,
	},

	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 40,
		paddingHorizontal: 20,
	},

	footerText: {
		fontSize: 12,
		color: "#FFA500",
	},
});
