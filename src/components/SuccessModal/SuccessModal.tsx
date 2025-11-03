import React, { useState } from "react";
import { View, Text, Modal, Animated, TouchableOpacity } from "react-native";
import { styles } from "./SuccessModal.styles";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
}

const SuccessModal = ({ visible, onClose, email }: SuccessModalProps) => {
  const [scaleValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.animatedView, { transform: [{ scale: scaleValue }] }]}>
          {/* Ícone de Sucesso */}
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>✓</Text>
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Login Realizado!
          </Text>

          {/* Mensagem */}
          <Text style={styles.message}>
            Bem-vindo de volta,{"\n"}
            <Text style={styles.emailText}>{email}</Text>
          </Text>

          {/* Botão */}
          <TouchableOpacity
            onPress={onClose}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SuccessModal;