import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                <Text style = {styles.objectTitle}> Home</Text>

                  {/*button to navigate to scheduling appointments*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("setUpAppoint1")}
                    >
                    <Text style = {styles.homeButtonText}>Schedule Appointments</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to viewing existing appointments*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("ClientAp")}
                    >  
                    <Text style = {styles.homeButtonText}>Existing Appointments</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to services offered wont work until services offered page is done*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("Services Offered")}
                    >
                    <Text style = {styles.homeButtonText}>Services Offered</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to about me wont work until about me page is done*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.homeButton}
                      onPress = {() => navigation.navigate("About Me")}
                    >
                    <Text style = {styles.homeButtonText}>About Me</Text>
                    </TouchableOpacity>
                  </View>

                  {/*button to navigate to FAQ wont work until FAQ page is done*/}
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
    // backButton style
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 10,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    // backButton text style
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5
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