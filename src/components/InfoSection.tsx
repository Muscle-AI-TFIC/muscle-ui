import { Text, View } from "react-native";
import { styles } from "@/styles/Profile"; // Assuming styles are shared or will be moved
import { UserInfo } from "@/types/UserInfo";

interface InfoSectionProps {
	userInfo: UserInfo;
}

export default function InfoSection({ userInfo }: InfoSectionProps) {
	return (
		<View style={styles.infoSection}>
			<View style={styles.infoCard}>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>🎯 Objetivo</Text>
					<Text style={styles.infoValue}>
						{userInfo.goal
							? userInfo.goal
									.split(" ")
									.map(
										(word) =>
											word.charAt(0).toUpperCase() +
											word.slice(1).toLowerCase(),
									)
									.join(" ")
							: "--"}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>💪 Nível de Atividade</Text>
					<Text style={styles.infoValue}>
						{userInfo.fitness_level
							? userInfo.fitness_level.charAt(0).toUpperCase() +
								userInfo.fitness_level.slice(1).toLowerCase()
							: "--"}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>👤 Gênero</Text>
					<Text style={styles.infoValue}>
						{userInfo.gender
							? userInfo.gender.charAt(0).toUpperCase() +
								userInfo.gender.slice(1).toLowerCase()
							: "--"}
					</Text>
				</View>
			</View>
		</View>
	);
}
