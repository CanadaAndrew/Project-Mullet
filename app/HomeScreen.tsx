import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

// button viewablility based on workflow in google drive green = new clients, blue = existing clients, and red = Admin with some 
// overlap. comments have been added above each button for clarification.

export default function HomeScreen({navigation}){
    return(
        <ScrollView>
            <View style = {styles.container}>

            {/*added logo image*/}
             <ImageBackground
              style = {styles.logo}
              source={require('./images/Hair_Done_Wright_LOGO.png')}
             >
             </ImageBackground>

             <LinearGradient
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
             >
                <View style = {styles.background}>

                {/*add title for homepage*/}
                <Text style = {styles.objectTitle}> Home </Text>

                {/*button to modify calendar availability*/}
                {/*Viewable by Admin only*/}
                <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("ModifyAv")}
                    >  
                    <Text style = {styles.homeButtonText}>Modify Calendar</Text>
                    </TouchableOpacity>
                  </View>

                {/*button to navigate to viewing existing client appointments*/}
                {/*Viewable by Admin only*/}
                <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("ClientAp")}
                    >  
                    <Text style = {styles.homeButtonText}>Existing Appointments</Text>
                    </TouchableOpacity>
                  </View>

                {/*button to edit client info page is WIP so no button functionality yet*/}
                {/*Viewable by Admin only*/}
                <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("Client info")}
                    >  
                    <Text style = {styles.homeButtonText}>modify Client Info</Text>
                    </TouchableOpacity>
                  </View>

                {/*button to view client history page is WIP so no button functionality yet*/}
                {/*Viewable by Admin only*/}
                <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("Client history")}
                    >  
                    <Text style = {styles.homeButtonText}>Client History</Text>
                    </TouchableOpacity>
                  </View>

                {/*button to view approval/denial of new clients page is WIP so no button functionality yet*/}
                {/*Viewable by Admin only*/}
                <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("New Client approval")}
                    >  
                    <Text style = {styles.homeButtonText}>New Client approval</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to scheduling appointments*/}
                  {/*Viewable by Old Clients and Admin*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("setUpAppoint1")}
                    >
                    <Text style = {styles.homeButtonText}>Schedule Appointments</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to view all personal appointments as a Client*/}
                  {/*Viewable by Old Clients only*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("appointmentsClientView")}
                    >
                    <Text style = {styles.homeButtonText}>Your Appointments</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to services offered page is WIP so no button functionality yet*/}
                  {/*Viewable by New Clients, Old Clients, and Admin*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("Services Offered")}
                    >
                    <Text style = {styles.homeButtonText}>Services Offered</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to about me page is WIP so no button functionality yet*/}
                  {/*Viewable by New Clients, Old Clients, and Admin*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("About Me")}
                    >
                    <Text style = {styles.homeButtonText}>About Me</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to FAQ page is WIP so no button functionality yet*/}
                  {/*Viewable by New Clients, Old Clients, and Admin*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("FAQ")}
                    >
                    <Text style = {styles.homeButtonText}>FAQ</Text>
                    </TouchableOpacity>
                  </View>


                </View>
             </LinearGradient>

            </View>
        </ScrollView>



    );
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 90
    },
    // title styling 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // background under logo image
    background: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        borderRadius: 30
    },
    // logo image
    logo: {
        width: 435,
        height: 250,
    },
    // shadow for objects IOS
    boxShadowIOS: {
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    // shadow for objects Android
    boxShadowAndroid: {
        elevation: 10
    },
    // home button style
    homeButton: {
        width: 350, //
        height: 50, //
        paddingTop: 15,
        margin: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: '#BE42B2',
        borderRadius: 20,
    },
    // home button text style
    homeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
    },
    badgeStyle: {
        textAlign: 'center',
        backgroundColor: '#C154C1',
    }
})