import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./SuccessModal.styles";

interface SuccessModalProps {
	visible: boolean;
	onClose: () => void;
	email: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
	visible,
	onClose,
	email,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.animatedView}>
					<View style={styles.iconContainer}>
						<Text style={styles.iconText}>✓</Text>
					</View>
					<Text style={styles.title}>Login bem-sucedido!</Text>
					<Text style={styles.message}>
						Você entrou como <Text style={styles.emailText}>{email}</Text>
					</Text>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>Continuar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default SuccessModal;
