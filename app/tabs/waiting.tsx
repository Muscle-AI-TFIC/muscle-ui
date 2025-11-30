import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WaitingScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<ActivityIndicator size="large" color="#FFA500" />
				<Text style={styles.title}>Aguarde, seu treino está sendo gerado!</Text>
				<Text style={styles.subtitle}>
					Dentro de algumas horas, você poderá consultá-lo.
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#121212",
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginTop: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		color: "#8E8E93",
		marginTop: 10,
		textAlign: "center",
	},
});
