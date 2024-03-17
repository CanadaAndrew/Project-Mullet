import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, {useState} from 'react';
import axios from 'axios';
import firebase from './Firebase';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

//Declaring Window as a global variable to be accessed
declare global {
    interface Window { // ⚠️ notice that "Window" is capitalized here
      RecaptchaVerifier: any;
    }
  }
  
export default function newClientInfo_ClientView({ navigation }){

    const auth = getAuth(firebase);
    auth.languageCode = 'en';

    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000', //Andrew pc local
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
        //baseURL: 'http://10.0.0.133:3000',
    })

    return (
        <View >
          <ScrollView>
            
            <LinearGradient
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
             >

                <View>
                    <Text >{'\n'}</Text>
                </View>
                <View style = {styles.titleBox}>
                    <Text style = {styles.clientNameTitle}>Sam Smith</Text>
                </View>
                <View>
                    <Text >{'\n'}</Text>
                </View>

                {/*Edit button and title*/}
                <View style = {styles.inlineLayout}>
                    <Text style = {styles.objectTitle}>Contact Info</Text>
                    <View>
                        <TouchableOpacity
                          style = {styles.editButton}
                        >
                            <Text style = {styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*Client Info Box*/}
                <View style = {[styles.clientBox, styles.container]}>
                    <Text style = {styles.clientTilteText}>Email</Text>
                    <Text style = {styles.clientText}>s******h@gmail.com</Text>
                    <Text>{'\n'}</Text>
                    <Text style = {styles.clientTilteText}>Phone Number</Text>
                    <Text style = {styles.clientText}>(xxx) xxx-5555</Text>
                    <Text>{'\n'}</Text>
                    <Text style = {styles.clientTilteText}>Address</Text>
                    <Text style = {styles.clientText}>N/A</Text>
                </View>
                <View>
                    <Text >{'\n'}</Text>
                </View>

                {/*Edit button and title*/}
                <View style = {styles.inlineLayout}>
                    <Text style = {styles.objectTitle}>Preferences</Text>
                    <View>
                        <TouchableOpacity
                          style = {styles.editButton}
                        >
                            <Text style = {styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*Client Info Box*/}
                <View style = {[styles.clientBox, styles.container]}>
                    <Text style = {styles.clientTilteText}>Preferred Services</Text>
                    <Text style = {styles.clientText}>Woman’s Haircuts</Text>
                    <Text style = {styles.clientText}>Hair Coloring</Text>
                    <Text>{'\n'}</Text>
                    <Text style = {styles.clientTilteText}>Phone Number</Text>
                    <Text style = {styles.clientText}>Allergic to hair dyes with paraphenylenediamine (PPD) in them.</Text>
                    <Text>{'\n'}</Text>
                </View>

             </LinearGradient>
             
           </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //borderRadius: 90,
        //justifyContent: 'flex-start'
    },
    // title styling 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        paddingBottom: 10
    },
    // background under logo image
    background: {
        paddingBottom: 200,
        alignItems: 'center',
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
    // client text info
    clientText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },
    // titles for client text info
    clientTilteText: {
        color: '#942989',
        fontWeight: 'bold',
        fontSize: 18
    },
    // white appointment block
    clientBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        flexDirection: 'column',
        alignItems: 'flex-start',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
    },
    // Submit button style
    titleBox: {
        width: 350, //
        height: 100, //
        paddingTop: 30,
        backgroundColor: '#942989',
        borderRadius: 20,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
    },
    // Client Name 
    clientNameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
        //marginTop: 25
    },
    // Edit Button text
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    // Edit Button
    editButton: {
        width: 65, 
        height: 40, 
        paddingTop: 12,
        marginBottom: 20,
        marginLeft: 'auto',//25,
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
    // to split title and edit button on one line
    inlineLayout: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
    }
})