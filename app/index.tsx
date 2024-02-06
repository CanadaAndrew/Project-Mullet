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
import HomeScreen from './HomeScreen';
import setupAppointment2 from './setupAppointment2';

const Stack = createNativeStackNavigator()

export default function index() {
  return (
   <NavigationContainer independent={true}>
    {/*streamline custom header*/}
     <Stack.Navigator
       screenOptions={{
        headerTintColor:'white',
        headerBackTitle: 'Back',
        headerStyle: {
          backgroundColor: '#942989'
        }
       }}
     >
         <Stack.Screen name = "NaviagateHome" component={NavigateHome}/>
         <Stack.Screen name = "setUpAppoint1" component={setUpAppoint1}
           options = {{
            title: "Set Appointment"
           }}
         />
         <Stack.Screen name = "setupAppointment2" component={SetupAppointment2}
           options = {{
            title: "Set Appointment"
           }}
         />
         <Stack.Screen name = "ClientAp" component={ClientAp}
           options = {{
            title: "Client Appointments"
           }}
         />
         <Stack.Screen name = "ModifyAv" component={ModifyAv}
           options = {{
            title: "Modify Availability"

           }}
         />
         <Stack.Screen name = "HomeScreen" component={HomeScreen}
           options = {{
            title: "Home"
           }}
         />
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
