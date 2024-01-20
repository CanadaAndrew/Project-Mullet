import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ClientAp from './ClientAp';
import setUpAppoint1 from './setUpAppoint1';
import ModifyAv from './ModifyAv';
import NavigateHome from './NavigateHome';
import SetupAppointment2 from './setupAppointment2';
import ServicesOffered from './ServicesOffered';

const Stack = createNativeStackNavigator()

export default function index() {
  return (
   <NavigationContainer independent={true}>
     <Stack.Navigator>
         <Stack.Screen name = "NaviagateHome" component={NavigateHome}/>
         <Stack.Screen name = "setUpAppoint1" component={setUpAppoint1}/>
         <Stack.Screen name = "setupAppointment2" component={SetupAppointment2}/>
         <Stack.Screen name = "ClientAp" component={ClientAp}/>
         <Stack.Screen name = "ModifyAv" component={ModifyAv}/>
         <Stack.Screen name = "ServicesOffered" component={ServicesOffered} />
      </Stack.Navigator>
   </NavigationContainer>
  

/*export default function index(){
  return (

    <View> 
      <Stack.Navigator>
        <Stack.Screen name = "ClientAp" component={ClientAp}/>
        <Stack.Screen name = "setUpAppoint1" component={setUpAppoint1}/>
      </Stack.Navigator>
        <Text>Navigation to currently developed/developing screens, placeholder for homepage.</Text>
        <View><Text></Text></View>
        <Link href = "/ModifyAv">Click/Tap here for ModifyAv</Link>
        <View><Text></Text></View>
        <Link href = "/ClientAp">Click/Tap here for ClientAp</Link>
        <View><Text></Text></View>
        <Link href = "/setUpAppoint1">Click/Tap here for setUpAppoint1</Link>
        <View><Text></Text></View>
        <Link href = "/setupAppointment2">Click/Tap here for setupAppointment2</Link>
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
