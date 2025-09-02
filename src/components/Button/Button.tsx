import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { styleButton } from './Button.styles';

export const button_test = () => {
  return "It works"
}

export const Button = () => {
  return (
    <button style={styleButton.button} type="submit" onClick={button_test}>
      <span>Enviar</span>
    </button>
  );
};
