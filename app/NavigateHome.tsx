import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function NavigateHome(){
    const navigation = useNavigation<any>()
    
    return(
        <View>
            <Text>Temporary home page using react naviagate to travel between pages</Text>
            <Button  
                title = "setUpAppointment1 page"
                onPress={() => navigation.navigate("setUpAppoint1")} 
            />
            <Button  
                title = "Modify availability page"
                onPress={() => navigation.navigate("ModifyAv")} 
            />
            <Button  
                title = "Client Appointment page admin View"
                onPress={() => navigation.navigate("ClientAp")} 
            />
            <Button
                title = "Home Screen page"
                onPress={() => navigation.navigate("HomeScreen")}
            />
            <Button
                title = "Client Appointment page Client View"
                onPress={() => navigation.navigate("appointmentsClientView")}
            />
            <Button  
                title = "setupAppointment2 page"
                onPress={() => navigation.navigate("setupAppointment2", {
                    hairStyleData: "",
                    dataDate: ""
                })}  
            />
            
        </View>
    )
}