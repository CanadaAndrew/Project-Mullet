import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, {useState} from 'react';

//Declaring Window as a global variable to be accessed
declare global {
    interface Window { // ⚠️ notice that "Window" is capitalized here
      RecaptchaVerifier: any;
    }
  }
  
export default function ResetLogin(){

    // error msg if wrong login info is put in
    const [loginError, loginErrorMsg] = useState('');
    const onClickLogin = () => {
        loginErrorMsg('Your passwords \n do not match please try again.');
    }

    // to show and hide password
    const [showPassword, setShowPassword] = useState(true);
    const [textS, textH] = useState(true)
    const buttonClick = textS ? "show" : "hide";
    const onClickPW = () => {
        setShowPassword(previousState => !previousState)
        textH(!textS);
    }

    //user inputs for password and confirm password
    const [password, newPassword] = React.useState('');
    const [confirmPassword, newConfirmPassword] = React.useState('');

    //checks if passwords are valid
    const [passwordValid, setpasswordValid] =  React.useState(false);
    const [confirmPasswordValid, setconfirmPasswordValid] =  React.useState(false);

    //TODO: discuss password requirements in a sprint
    function checkpasswordValid() 
    {
        //temporary requirement: if the password contains numbers and letters and is 8 chars or more in length...
            setpasswordValid(password.length > 7 ? true : false);
    }
    function checkconfirmPasswordValid()
    {
        //if confirmpassword matches with password
        setconfirmPasswordValid(password == confirmPassword ? true : false)
    }

    //if the password requirement is met and confirm password matches password, unlock the reset pw button
    const formComplete =  !(passwordValid && confirmPasswordValid);

    return (
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

                <Text style = {styles.objectTitle}>Reset Account Password</Text>
                <Text style = {styles.errorTitle}>{loginError}</Text>
                <Text style = {styles.errorTitle}> 
                       Password must:{"\n"} 
                       *be at least # charaters long {"\n"}
                       *contain at least # uppercase letters {"\n"}
                       *contain at least # lowercase letters {"\n"}
                       *contain at least # numbers {"\n"}
                       *be at least # special charaters {"\n"}
                       *be sure password match {"\n"}
                       *press reset password bellow to confirm {"\n"}
                </Text>

                <View>
                 {/*user input for password partly functional*/}
                  <TextInput 
                      placeholder =' Enter New Password ' 
                      placeholderTextColor={'gray'} 
                      keyboardType = 'default'
                      secureTextEntry = {showPassword}
                      style = {styles.inputBox}
                      value={password} 
                      onChangeText={newPassword}
                      onTextInput={() => {checkpasswordValid(); checkconfirmPasswordValid()}} /*extra measure if user changes password*/
                  />
                 {/*user input for password match partly functional*/}
                  <TextInput 
                      placeholder =' Confirm New Password ' 
                      placeholderTextColor={'gray'} 
                      keyboardType = 'default'
                      secureTextEntry = {showPassword}
                      style = {styles.inputBox}
                      value={confirmPassword}
                      onChangeText={newConfirmPassword}
                      onTextInput={() => checkconfirmPasswordValid()}
                  />
                 
                 {/*button to show and hide password is functional*/}
                  <TouchableOpacity
                      style = {styles.showButton}
                      onPress = {onClickPW}
                  >
                    <Text style = {styles.showButtonText}>{buttonClick}</Text>
                  </TouchableOpacity>
                  
                </View>


                  {/*button to reset password limited functionality*/}
                  <View>
                    <TouchableOpacity
                      style = {styles.resetButton}
                      onPress = {onClickLogin}
                      disabled={formComplete}
                    >
                    <Text style = {styles.resetButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                  </View>


             </LinearGradient>
        </View>
        </ScrollView>

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
        color: 'white',
        marginTop: 25
    },
    // error text styling 
    errorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
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
    // reset button style
    resetButton: {
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
    // reset button text style
    resetButtonText: {
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
    }
})