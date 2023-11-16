import { StyleSheet, Text, View, Pressable, Image, ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Calendar } from 'react-native-calendars';
export default function setUpAppoint1(){

    return(
        <>
          <View style = {styles.container}>

            {/*added logo image use imagebackground in order for back button to overlap image*/}
            <ImageBackground
              style = {styles.logo}
              source={require('./images/Hair_Done_Wright_LOGO.png')}
            >

                {/*back button takes you back to index.tsx*/}
                <View style = {styles.backButton}>
                    <Pressable
                        style = {({pressed}) => [{
                            backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                        },
                        styles.backButtonText
                    ]}>
                        {({pressed}) => (
                            <Link href = "/" asChild>
                                <Text style = {styles.backButtonText}>Back</Text>
                            </Link>
                        )}
                    </Pressable>


                </View>
            </ImageBackground>


            {/*linear gradient for background */}
            <LinearGradient
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
              >
            <View style = {styles.background}>

                <Text style = {styles.objectTitle}> Schedule an Appointment</Text>
                {/*dummy dropdown placeholder*/}
                <View style = {[styles.dummyDropDown, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <Text>drop down menu placeholder</Text>
                </View>

                <Text style = {styles.objectTitle}>Select Preferred Days:</Text>
                <View style = {[styles.dummyCalendar, styles.boxShadowIOS, styles.boxShadowAndroid]}>
               {/*Basic calendar implementation. No interactivity.*/}
                <Calendar
                        onDayPress={day => {
                           console.log('selected day', day);
                        }}
                />
                </View>

                {/*appointment button no functionality yet*/}
                <View style = {styles.appointmentButton}>
                  <Pressable
                    style = {({ pressed }) => [{ backgroundColor: pressed ? '#C154C1' : '#BE42B2'}, styles.appointButtonText ]}>
                        {({ pressed }) => (<Text style = {styles.appointButtonText}>Schedule Appointment</Text>)}
                  </Pressable>
                </View>

            </View>
            </LinearGradient>

          </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 90
    },
    // title styling for dropdown menu and calendar 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // temporary dummy drop down
    dummyDropDown: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 100,
        paddingLeft: 100
    },
    // temporary dummy calendar
    dummyCalendar: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 10,
        paddingBottom: 270,
        paddingLeft: 100,
        paddingRight: 100,
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
    // schedule appointment button style
    appointmentButton: {
        width: 350,
        height: 65,
        paddingTop: 20,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        //alignItems: 'center'
    },
    // schedule appointment button text style
    appointButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,

    }
})