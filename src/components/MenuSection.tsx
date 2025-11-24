import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "@/styles/Profile"; // Assuming styles are shared or will be moved

interface MenuSectionProps {
	setModalVisible: (visible: boolean) => void;
}

export default function MenuSection({ setModalVisible }: MenuSectionProps) {
	return (
		<View style={styles.menuSection}>
			<TouchableOpacity
				style={styles.menuItem}
				onPress={() => setModalVisible(true)}
			>
				<View style={styles.menuIconContainer}>
					<Text style={styles.menuIcon}>✏️</Text>
				</View>
				<View style={styles.menuTextContainer}>
					<Text style={styles.menuTitle}>Editar Informações</Text>
					<Text style={styles.menuSubtitle}>Atualize seus dados pessoais</Text>
				</View>
				<Text style={styles.menuArrow}>›</Text>
			</TouchableOpacity>
		</View>
	);
}
