import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { styleButton } from './Button.styles';

export const Button = () => {
  return (
    <button style={styleButton.button} type="submit">
      <span>Enviar</span>
    </button>
  );
};
