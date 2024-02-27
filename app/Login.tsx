import { StyleSheet, Text, View, TextInput, Pressable, Image, ImageBackground, ScrollView, Button, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import React, {useState} from 'react';
import firebase from './Firebase.js'  // import firebase

//Declaring Window as a global variable to be accessed
declare global {
    interface Window { // ⚠️ notice that "Window" is capitalized here
      RecaptchaVerifier: any;
    }
  }

/*To use an invisible reCAPTCHA, create a RecaptchaVerifier object with the size parameter set to invisible,
specifying the ID of the button that submits your sign-in form.*/
window.RecaptchaVerifier = new firebase.RecaptchaVerifier(firebase.auth, 'loginButton', {
    'size': 'invisible',
    'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
});
  
export default function Login(){

    // error msg if wrong login info is put in
    const [loginError, loginErrorMsg] = useState('');
    const onClickLogin = () => {
        loginErrorMsg('Your email and password \n do not match please try again.');
    }

    // to show and hide password
    const [showPassword, setShowPassword] = useState(true);
    const [textS, textH] = useState(true)
    const buttonClick = textS ? "show" : "hide";
    const onClickPW = () => {
        setShowPassword(previousState => !previousState)
        textH(!textS);
    }

    // put user input into phone number format
    const [rawNum, setNum] = useState('');
    const formattingPhoneNumber = (input) => {
        if (/^\d*$/.test(input)){
            if (input.length <=10){
                return input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            }
        }
        //return input.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    const setPhoneNumFormat = (input) => { 
        const formatPhoNum = formattingPhoneNumber(input); 
        setNum(formatPhoNum); 
    } 

    return (
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

                <Text style = {styles.errorTitle}>{loginError}</Text>
                <Text style = {styles.objectTitle}>Login</Text>

                {/*user input for email or phone# partly functional*/}
                <TextInput 
                  placeholder = ' Email or Phone ' 
                  placeholderTextColor = {'gray'} 
                  keyboardType = 'default'
                  style = {styles.inputBox}
                  value = {rawNum}
                  onChangeText={setPhoneNumFormat}
                />

                <View>
                 {/*user input for password partly functional*/}
                  <TextInput 
                      placeholder =' Password ' 
                      placeholderTextColor={'gray'} 
                      keyboardType = 'default'
                      secureTextEntry = {showPassword}
                      style = {styles.inputBox}
                  />
                 
                 {/*button to show password is functional*/}
                  <TouchableOpacity
                      style = {styles.showButton}
                      onPress = {onClickPW}
                  >
                    <Text style = {styles.showButtonText}>{buttonClick}</Text>
                  </TouchableOpacity>

                  {/*button for forgot password no functionality yet WIP*/}
                  <TouchableOpacity>
                    <Text style = {styles.showButtonText}>forgot password?</Text>
                  </TouchableOpacity>
                  
                </View>


                  {/*button to login limited functionality*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.loginButton}
                      onPress = {onClickLogin}
                    >
                    <Text style = {styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                  </View>


             </LinearGradient>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 90
    },
    // title styling 
    objectTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    // error text styling 
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    // background under logo image
    background: {
        paddingBottom: 100,
        alignItems: 'center',
    },
    // logo image
    logo: {
        width: 440,
        height: 275,
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
    // login button style
    loginButton: {
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
    // Login button text style
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
    },
    // input box styling
    inputBox: {
        fontSize: 18,
        padding: 8,
        margin: 25,
        width: 350,
        height: 50,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        flexDirection: "row"
    },
    // show button style
    showButton: {
        width: 90, 
        height: 40, 
        paddingTop: 12,
        marginLeft: 25,
        marginBottom: 50,
        //margin: 25,
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
    // show button text style
    showButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        //borderRadius: 20,
    },
    // show button style
    forgotPWButton: {
        width: 90, 
        height: 40, 
        paddingTop: 12,
        marginLeft: 25,
        marginBottom: 50,
        //margin: 25,
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
    // show button text style
    fotgotPWButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
})