import { Button } from '@/src/components/Button/Button';
import { styleLogin } from '@/src/styles/Login';
import { Text, View } from 'react-native';

import React from "react";

export default function Login() {
  return (
    <View style={styleLogin.container}>
      <View style={styleLogin.boxTop}>
        <Button/>
      </View>

      <View style={styleLogin.boxBot}>

      </View>
    </View>
  )
}