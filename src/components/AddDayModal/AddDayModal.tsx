import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { styles } from "./AddDayModal.styles";
import { Button } from "../Button/Button";

interface AddDayModalProps {
	visible: boolean;
	onClose: () => void;
	onAdd: (dayName: string) => void;
}

export function AddDayModal({ visible, onClose, onAdd }: AddDayModalProps) {
	const [dayName, setDayName] = useState("");

	const handleAdd = () => {
		if (dayName.trim()) {
			onAdd(dayName.trim());
			setDayName("");
			onClose();
		}
	};

	return (
		<Modal
			transparent
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Adicionar Novo Dia</Text>
					<TextInput
						style={styles.input}
						placeholder="Nome do dia (ex: Segunda-feira)"
						value={dayName}
						onChangeText={setDayName}
						autoFocus
					/>
					<View style={styles.buttonContainer}>
						<Button title="Cancelar" onPress={onClose} variant="secondary" />
						<Button title="Adicionar" onPress={handleAdd} />
					</View>
				</View>
			</View>
		</Modal>
	);
}
