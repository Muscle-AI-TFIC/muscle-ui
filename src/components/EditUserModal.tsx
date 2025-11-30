import {
	ActivityIndicator,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "@/styles/Profile"; // Assuming styles are shared or will be moved
import type { UserInfo } from "@/types/UserInfo";

interface EditUserModalProps {
	modalVisible: boolean;
	setModalVisible: (visible: boolean) => void;
	userInfo: UserInfo | null;
	setUserInfo: (userInfo: UserInfo | null) => void;
	handleSaveUserInfo: () => Promise<void>;
	loading: boolean;
}

export default function EditUserModal({
	modalVisible,
	setModalVisible,
	userInfo,
	setUserInfo,
	handleSaveUserInfo,
	loading,
}: EditUserModalProps) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Editar Informações</Text>
						<TouchableOpacity onPress={() => setModalVisible(false)}>
							<Text style={styles.modalClose}>✕</Text>
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.modalBody}>
						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Peso (kg)</Text>
							<TextInput
								style={styles.input}
								value={userInfo?.weight_kg?.toString() || ""}
								onChangeText={(text) =>
									setUserInfo(
										userInfo
											? { ...userInfo, weight_kg: parseFloat(text) || 0 }
											: null,
									)
								}
								keyboardType="numeric"
								placeholder="Ex: 70"
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Altura (cm)</Text>
							<TextInput
								style={styles.input}
								value={
									userInfo?.height_cm
										? (userInfo.height_cm > 10
												? userInfo.height_cm
												: userInfo.height_cm * 100
											).toString()
										: ""
								}
								onChangeText={(text) => {
									const value = parseFloat(text) || 0;
									// Converter de volta para o formato da API (metros se > 10)
									const heightValue = value > 10 ? value : value / 100;
									setUserInfo(
										userInfo ? { ...userInfo, height_cm: heightValue } : null,
									);
								}}
								keyboardType="numeric"
								placeholder="Ex: 175"
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Data de Nascimento</Text>
							<TextInput
								style={styles.input}
								value={userInfo?.birth_date || ""}
								onChangeText={(text) =>
									setUserInfo(
										userInfo ? { ...userInfo, birth_date: text } : null,
									)
								}
								placeholder="AAAA-MM-DD"
							/>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Gênero</Text>
							<View style={styles.optionsContainer}>
								{[
									{ label: "Masculino", value: "masculino" },
									{ label: "Feminino", value: "feminino" },
									{ label: "Outro", value: "outro" },
								].map((gen) => (
									<TouchableOpacity
										key={gen.value}
										style={[
											styles.optionButton,
											userInfo?.gender?.toLowerCase() === gen.value &&
												styles.optionButtonActive,
										]}
										onPress={() =>
											setUserInfo(
												userInfo ? { ...userInfo, gender: gen.value } : null,
											)
										}
									>
										<Text
											style={[
												styles.optionText,
												userInfo?.gender?.toLowerCase() === gen.value &&
													styles.optionTextActive,
											]}
										>
											{gen.label}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Objetivo</Text>
							<View style={styles.optionsContainer}>
								{[
									{ label: "Perder Peso", value: "perder peso" },
									{ label: "Manter Peso", value: "manter peso" },
									{ label: "Ganhar Massa", value: "ganhar massa" },
								].map((obj) => (
									<TouchableOpacity
										key={obj.value}
										style={[
											styles.optionButton,
											userInfo?.goal?.toLowerCase() === obj.value &&
												styles.optionButtonActive,
										]}
										onPress={() =>
											setUserInfo(
												userInfo ? { ...userInfo, goal: obj.value } : null,
											)
										}
									>
										<Text
											style={[
												styles.optionText,
												userInfo?.goal?.toLowerCase() === obj.value &&
													styles.optionTextActive,
											]}
										>
											{obj.label}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						<View style={styles.inputGroup}>
							<Text style={styles.inputLabel}>Nível de Atividade</Text>
							<View style={styles.optionsContainer}>
								{[
									{ label: "Sedentário", value: "sedentário" },
									{ label: "Iniciante", value: "iniciante" },
									{ label: "Intermediário", value: "intermediário" },
									{ label: "Avançado", value: "avançado" },
								].map((nivel) => (
									<TouchableOpacity
										key={nivel.value}
										style={[
											styles.optionButton,
											userInfo?.fitness_level?.toLowerCase() === nivel.value &&
												styles.optionButtonActive,
										]}
										onPress={() =>
											setUserInfo(
												userInfo
													? { ...userInfo, fitness_level: nivel.value }
													: null,
											)
										}
									>
										<Text
											style={[
												styles.optionText,
												userInfo?.fitness_level?.toLowerCase() ===
													nivel.value && styles.optionTextActive,
											]}
										>
											{nivel.label}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					</ScrollView>

					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSaveUserInfo}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.saveButtonText}>Salvar Alterações</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
