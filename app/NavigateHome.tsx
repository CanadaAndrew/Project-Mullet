import React from 'react';
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function NavigateHome(){
    const navigation = useNavigation<any>()
    const userData = {

        UserId: '1',
        AdminPriv: true,
        NewClient: false
    
      };
    return(
        <View>
            <Text>Temporary home page using react naviagate to travel between pages</Text>
            <Button  
                title = "setUpAppointment1 page"
                onPress={() => navigation.navigate("setUpAppoint1", {userData})} 
            />
            <Button  
                title = "Modify availability page"
                onPress={() => navigation.navigate("ModifyAv", {userData})} 
            />
            <Button  
                title = "Client Appointment page admin View"
                onPress={() => navigation.navigate("ClientAp", {userData})} 
            />
            <Button
                title = "Home Screen page"
                onPress={() => navigation.navigate("HomeScreen")}
            />
            <Button
                title = "Reset Login page"
                onPress={() => navigation.navigate("ResetLogin")}
            />
            <Button
                title = "Client Appointment page Client View"
                onPress={() => navigation.navigate("appointmentsClientView", {userData})}
            />
            <Button  
                title = "setupAppointment2 page"
                onPress={() => navigation.navigate("setupAppointment2", {
                    userData,
                    hairStyleData: "",
                    dataDate: ""
                })}  
            />
            <Button
                title="Services Offered page"
                onPress={() => navigation.navigate("ServicesOffered", {userData
                })}
              />
             <Button
                title="Client History page"
                onPress={() => navigation.navigate("ClientHistory", {userData})}
            />
            <Button  
                title = "AboutMe page"
                onPress={() => navigation.navigate("AboutMe", {
                    userData,
                    hairStyleData: "",
                    dataDate: ""
                })}  
            />
            
        </View>
    )
}