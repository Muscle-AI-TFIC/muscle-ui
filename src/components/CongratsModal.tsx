import { View, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from '@/styles/ToDo'; // Assuming styles are shared or will be moved

interface CongratsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CongratsModal({
  visible,
  onClose,
}: CongratsModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContentAnimation}>
          <LottieView
            source={{ uri: 'https://lottie.host/d7475065-8824-4b37-a57a-cd59c3d645cf/ZUrcBTai6f.lottie' }}
            autoPlay
            loop={false}
            style={{ width: 250, height: 250 }}
            onAnimationFinish={onClose}
          />
          <Text style={styles.congratsText}>Parabéns! 🎉</Text>
          <Text style={styles.subText}>Você concluiu todos os exercícios!</Text>
        </View>
      </View>
    </Modal>
  );
}