import { StyleSheet, Text, View, Pressable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';


export default function ClientAp(){

    const cutName = ['Sam Smith', 'Bob Smith','Jane Doe', 'Grant Jackson' ]
    const service = ["Woman's Haircut", "Men's Haircut", "Hair Extensions"]
    const date = ['10/27/23, Fri, 1:00pm', '9/10/23, Mon, 2:00pm', '11/14/23, Fri, 3:00pm', '11/15/23, Sat, 2:00pm']
    const stylist = ['Melissa Wright']


    return(
      <>
        <LinearGradient 
        locations = {[0.7, 1]}
        colors = {['#EB73C9','white']}
        style = {styles.container}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                     <Text style = {styles.headerTitle}>Client Appointments</Text>
                </View>
                <View style = {styles.backButton}>
                    <Pressable 
                       style = {({ pressed }) => [{ backgroundColor: pressed ? '#C154C1' : '#BE42B2'},
                       styles.backButtonText
                       ]}>
                        {({ pressed }) => (<Text style = {styles.backButtonText}>Back</Text>)}
                    </Pressable>
                </View>
            </View>

            <View>
                <SafeAreaView style={styles.container}>
                    <Calendar />
                </SafeAreaView>
            </View>

            <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Customer:</Text>
                    <Text style = {styles.appointText}> {cutName[0]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Service:</Text>
                    <Text style = {styles.appointText}>{service[0]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Date:</Text>
                    <Text style = {styles.appointText}>{date[0]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Stylist:</Text>
                    <Text style = {styles.appointText}>{stylist[0]}</Text>
                </View>
            </View>
            <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Customer:</Text>
                    <Text style = {styles.appointText}> {cutName[1]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Service:</Text>
                    <Text style = {styles.appointText}>{service[1]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Date:</Text>
                    <Text style = {styles.appointText}>{date[1]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Stylist:</Text>
                    <Text style = {styles.appointText}>{stylist[0]}</Text>
                </View>
            </View>
            <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Customer:</Text>
                    <Text style = {styles.appointText}> {cutName[2]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Service:</Text>
                    <Text style = {styles.appointText}>{service[2]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Date:</Text>
                    <Text style = {styles.appointText}>{date[2]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Stylist:</Text>
                    <Text style = {styles.appointText}>{stylist[0]}</Text>
                </View>
            </View>
            <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Customer:</Text>
                    <Text style = {styles.appointText}> {cutName[3]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Service:</Text>
                    <Text style = {styles.appointText}>{service[1]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Date:</Text>
                    <Text style = {styles.appointText}>{date[3]}</Text>
                </View>
                <View style = {styles.textAlignment}>
                    <Text style = {styles.appointText}>Stylist:</Text>
                    <Text style = {styles.appointText}>{stylist[0]}</Text>
                </View>
            </View>
        </LinearGradient>
      </> 
    );
}

const styles = StyleSheet.create({
    container: {
    },
    // title of page
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // header color
    header: {
        backgroundColor: '#942989',
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center'
    },
    // white appointment block
    appointBox: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        //alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20

    },
    // appointment text information 
    appointText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
       ///textAlign: 'center'
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
    // text alignment
    textAlignment: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 10,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5
    }
})

