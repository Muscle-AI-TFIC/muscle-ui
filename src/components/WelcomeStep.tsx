import { WelcomeStepProps } from '@/types/interfaces/welcome';
import { welcomeStyles } from '@/styles/Welcome';
import { View, Text } from 'react-native';

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  title,
  text,
  imageText,
  icon,
  isLast
}) => {
  return (
    <View style={welcomeStyles.stepContent}>
      <Text style={welcomeStyles.stepTitle}>{title}</Text>
      <Text style={welcomeStyles.stepText}>{text}</Text>
      {isLast ? (
        <Text style={welcomeStyles.successIcon}>{icon}</Text>
      ) : (
        <View style={welcomeStyles.imagePlaceholder}>
          <Text style={welcomeStyles.fakeImage}>{imageText}</Text>
        </View>
      )}
    </View>
  );
};