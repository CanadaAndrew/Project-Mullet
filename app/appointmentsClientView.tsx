import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

export default function appointmentsClientView(){
    return(
        <ScrollView>
            <View style = {styles.container}>
                <LinearGradient
                  locations = {[0.7, 1]}
                  colors = {['#EB73C9', 'white']}
                  
                >
                    <View style = {styles.background}>
                        {/*Upcoming Appointments List*/}
                        <Text style = {styles.objectTitle}>Upcoming Appointments:</Text>

                        {/*temporary data*/}
                        <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Customer:</Text>
                            <Text style = {styles.appointText}>Bob</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Service:</Text>
                            <Text style = {styles.appointText}>Men's Haircut</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Date:</Text>
                            <Text style = {styles.appointText}>1/27/24, Sat, 2:00pm</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Stylist:</Text>
                            <Text style = {styles.appointText}>Melissa Wright</Text>
                        </View>
                        </View>

                        {/*Past Appointments List*/}
                        <Text style = {styles.objectTitle}>Past Appointments:</Text>
                        {/*temporary data*/}
                        <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Customer:</Text>
                            <Text style = {styles.appointText}>Bob</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Service:</Text>
                            <Text style = {styles.appointText}>Men's Haircut</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Date:</Text>
                            <Text style = {styles.appointText}>10/23/23, Mon, 1:00pm</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Stylist:</Text>
                            <Text style = {styles.appointText}>Melissa Wright</Text>
                        </View>
                        </View>

                        <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Customer:</Text>
                            <Text style = {styles.appointText}>Bob</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Service:</Text>
                            <Text style = {styles.appointText}>Hair Extensions</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Date:</Text>
                            <Text style = {styles.appointText}>8/10/23, Thur, 4:00pm</Text>
                        </View>
                        <View style = {styles.textAlignment}>
                            <Text style = {styles.appointText}>Stylist:</Text>
                            <Text style = {styles.appointText}>Melissa Wright</Text>
                        </View>
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
        color: 'white',
        paddingTop: 30,
        paddingBottom: 30
    },
    // background
    background: {
        //paddingTop: 20,
        paddingBottom: 775,
        alignItems: 'center',
        borderRadius: 30
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
    // white appointment block
    appointBox: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        //alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 3,

    },
    // text alignment
    textAlignment: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // appointment text information 
    appointText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10
       ///textAlign: 'center'
    },

})

