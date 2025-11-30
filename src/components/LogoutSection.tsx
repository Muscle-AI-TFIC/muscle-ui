import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/styles/Profile"; // Assuming styles are shared or will be moved

interface LogoutSectionProps {
	handleLogout: () => void;
	loading: boolean;
}

export default function LogoutSection({
	handleLogout,
	loading,
}: LogoutSectionProps) {
	return (
		<View style={styles.logoutSection}>
			<TouchableOpacity
				style={styles.logoutButton}
				onPress={handleLogout}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.logoutText}>Sair da Conta</Text>
				)}
			</TouchableOpacity>
		</View>
	);
}
