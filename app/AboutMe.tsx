import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import MyCalendar from './MyCalendar';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AboutMe() {
    return (

        <View style={styles.backButton}>
                        <Pressable
                            style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText]}
                        >
                            {({ pressed }) => (
                                <Link href="/">
                                    <Text style={styles.backButtonText}>    Back</Text>
                                </Link>
                            )}
                        </Pressable>
                    </View>
   
   







    
)}

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
    dropDown: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 10,
        //paddingBottom: 10,
        //paddingRight: 150,
        //paddingLeft: 100,
        padding: 100
    },
    // temporary dummy calendar
    dummyCalendar: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
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
        width: 350, //
        height: 50, //
        paddingTop: 15,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        //alignItems: 'center',
        //backgroundColor: '#C154C1',
        backgroundColor: '#BE42B2',
        borderRadius: 20,
    },
    // schedule appointment button text style
    appointButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        //paddingTop: 5,
        //paddingBottom: 5,
        //alignItems: 'center'
        

    },
    badgeStyle: {
        textAlign: 'center',
        backgroundColor: '#C154C1',
    }
})