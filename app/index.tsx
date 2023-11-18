import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function index(){
  return (
    <View>
        <Text>Navigation to currently developed/developing screens, placeholder for homepage.</Text>
        <Link href = "/ModifyAv">Click/Tap here for ModifyAv</Link>
        <Link href = "/ClientAp">Click/Tap here for ClientAp</Link>
        <Link href = "/setupAppointment2">Click/Tap here for setupAppoiintment2</Link>
    </View>
    /*
        <StatusBar style = 'light'/>
        <ModifyAv/>
    */
    /*
    <View>
      <StatusBar style='light' />
      <ClientAp/>
    </View>
    */
  );
}
