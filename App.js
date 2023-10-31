import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import ModifyAv from './ModifyAv';

export default function App() {
  return (
    <View>
        <StatusBar style = 'light'/>
        <ModifyAv/>
    </View>
  )
}
