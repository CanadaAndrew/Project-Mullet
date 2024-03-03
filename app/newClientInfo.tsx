import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Pressable,
    FlatList,
    Image,
    TextInput
} from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { Link } from 'expo-router';
//import axios from 'axios';
//import {initializeApp} from 'firebase/app';



//temp name, need to import the client's name from somewhere else
const [firstName, newFirstName] = React.useState('Sam'); 
const welcomeMessage = 'Congratulations ' + firstName + '! You’ve been approved as a new client. Fill in some additional info to complete your sign up process.';

const [StreetAddress, newStreetAddress] = React.useState(''); 
const [City, newCity] = React.useState('');
const [State, newState] = React.useState(''); 
const [ZipCode, newZipCode] = React.useState(''); 

const [StreetAddressValid, setStreetAddressValid] =  React.useState(false);
const [CityValid, setCityValid] = React.useState(false);
const [StateValid, setStateValid] = React.useState(false); 
const [ZipValid, setZipValid] = React.useState(false); 

const formComplete = StreetAddressValid && CityValid && StateValid && ZipValid;


function checkStreetAddressValid()
{
    //Street addresses have lots of variences that regex doesn't cover, so using a address verifier would be preferable.
    //but for now, we're using regex to check for special characters an address won't have
       
    //setStreetAddressValid(/A-Za-z0-9'\.\-\s\./.test(StreetAddress) && StreetAddress.length > 5 ? true : false);
}

function checkCityValid()
{
    //setCityValid(/A-Za-z0-9'\.\-\s\./.test(City) && City.length > 0 ? true : false);
}

function checkStateValid()
{
    //setStateValid(/A-Za-z0-9'\.\-\s\./.test(State) && State.length > 0 ? true : false);
}
function checkZipValid()
{
    //regex checks for numbers only
   //setZipValid(/^[0-9]+$/.test(ZipCode) && State.length == 5 ? true : false);
}



export default function newClientInfo() {
    return (
<>
<LinearGradient locations={[0.7, 1]} colors={['#DDA0DD', 'white']} style={styles.container}>
          
<Text >{'\n'}</Text>
<View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
    <Text style={styles.appointText}>{welcomeMessage}</Text>
</View> 

<View style={styles.textFieldContainer}>
    <Text style= {styles.textFieldHeader} >Street Address</Text>
   
<TextInput
    style={styles.textField}
    onChangeText={newStreetAddress}
    value={StreetAddress}
    //onTextInput={() => checkStreetAddressValid}
    placeholder="Street Address"
                            />
 <Text style= {styles.textFieldHeader} >City</Text>
<TextInput
    style={styles.textField}
    value={City}
    onChangeText={() => newCity}
    onTextInput={() => checkCityValid()}
    placeholder="City"
                            />

<Text style= {styles.textFieldHeader} >State & Zip Code</Text>

    <View style={[
        styles.container,
        {
          flexDirection: 'row',
        },
      ]}>

<TextInput
    style={styles.textFieldState}
    value={State}
    onChangeText={() =>newState}
    onTextInput={() => checkStateValid()}
    placeholder="State"
                            />

<Text> </Text>
<TextInput
    style={styles.textFieldZip}
    value={ZipCode}
    onChangeText={() => newZipCode}
    onTextInput={() => checkZipValid()}
    placeholder="Zip"
                            />

      </View>

      <Text >{'\n'}{'\n'}{'\n'}</Text>
      <TouchableOpacity 
                                disabled={formComplete} 
                                style={styles.signUpButton}
                                //onPress={}
                                >
                                <Text style={styles.signUpText}>Save Changes</Text>
                            </TouchableOpacity>

</View>
</LinearGradient>
</>  
)}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center'
    },
    // white appointment block
    appointBox: {
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 20,
        //alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 3

    },
    // appointment text information 
    appointText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10
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
        //paddingBottom: 10,
        //margin: 5,
        //marginBottom: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginRight: 10,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    sectionTitle: {
    },
    sectionTitleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
    },
    textFieldContainer: {
        alignItems: 'center',
        padding: 5,
        gap: 10
    },
    textField: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '85%',
        height: 50,
        borderRadius: 15,
        padding: 10
    },
    textFieldState: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '35%',
        height: 50,
        borderRadius: 15,
        padding: 10
    },
    textFieldZip: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '50%',
        height: 50,
        borderRadius: 15,
        padding: 10
    },
    textFieldHeader:{
        textAlign: 'center'
       
    },
    signUpButton: {
        alignItems: 'center',
        width: 200,
        height: 50,
        paddingTop: 13,
        margin: 5,
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
    signUpText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20
    }
});
