import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ClientAp from './ClientAp';


export default function App() {
  return (
    <View>
      <StatusBar style='light' />
      <ClientAp/>
    </View>
  );
}
