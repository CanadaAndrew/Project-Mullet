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
import axios from 'axios';
import {initializeApp} from 'firebase/app';

//made this available for all pages in the app
export let hairStyleSelected: string[] = [];

export default function SignUp({ navigation, route }) { // added route for page navigation

    const firebaseConfig = {

    };

    const app = initializeApp(firebaseConfig);
    
    //useState for drop down menu
    const [selected, setSelected] = React.useState("");

    // hair selection
    function handleHairSelection(selected) {
        let temparr: string[] = [];

        var temp = selected.toString();
        temparr = temp.split(",");
        hairStyleSelected = temparr;
    }

    //using this dummy data because the dateData variable isn't working currently ^^^ keeps spitting out Monday, December 4th, 2023
    let dateChosen = 'Mon, 04 December 2023';

    // for text input fields
    const [firstName, newFirstName] = React.useState('');
    const [lastName, newLastName] = React.useState('');
    const [email, newEmail] = React.useState('');
    const [phoneNumber, newPhoneNumber] = React.useState('');
    const [password, newPassword] = React.useState('');
    const [confirmPassword, newConfirmPassword] = React.useState('');

    //set length and character checks for text input fields
    const [count, setCount] = useState(0);

    
    const [firstNameValid, setfirstNameValid] =  React.useState(false);
    const [lastNameValid, setlastNameValid] =  React.useState(false);
    const [emailValid, setemailValid] =  React.useState(false);
    const [phoneNumberValid, setphoneNumberValid] =  React.useState(false);
    const [passwordValid, setpasswordValid] =  React.useState(false);
    const [confirmPasswordValid, setconfirmPasswordValid] =  React.useState(false);

    //is everything filled out? if so, unlock the sign up button
    const formComplete =  !(firstNameValid && lastNameValid && emailValid && phoneNumberValid && passwordValid && confirmPasswordValid && selected.length != 0); 

    //check() functions set the letter/number/length requirement of each text field
    //TODO: determine each requirement for each field 
    function checkfirstNameValid()
    {
        setfirstNameValid(firstName.length>0 ? true : false);
    }

    function checklastNameValid()
    {
        setlastNameValid(lastName.length>0 ? true : false);
    }

    function checkemailValid()
    {
        //reg expression checks for ---@---.--- format
        setemailValid(/\S+@\S+\.\S+/.test(email)); 
    }

    function checkphoneNumberValid()
    {
        //add dashes to maintain ###-###-#### format
        if(phoneNumber.length == 3 || phoneNumber.length == 7) 
        {
            newPhoneNumber(phoneNumber + '-');
        }

        //13 to account for international phones
        setphoneNumberValid(phoneNumber.length == 12 || phoneNumber.length == 13 ? true : false);
       
    }
    function checkpasswordValid()
    {
        //if the password contains numbers and letters and is 8 chars or more in length...
        if(password.match(/^[A-Za-z0-9]*$/))
            setpasswordValid(password.length > 7 ? true : false);
    }
    function checkconfirmPasswordValid()
    {
        setconfirmPasswordValid(password == confirmPassword ? true : false)
    }
      
    
    //options for drop down menu
    const hairOptions = [
        { key: ' Mens Haircut', value: ' Mens Haircut' },
        { key: ' Women\'s Haircut', value: ' Women\'s Haircut' },
        { key: ' Kids Haircut', value: ' Kids Haircut' },
        { key: ' Partial Highlight', value: ' Partial Highlight' },
        { key: ' Full Highlight', value: ' Full Highlight' },
        { key: ' Root Touch Up', value: ' Root Touch Up' },
        { key: ' Full Color', value: ' Full Color' },
        { key: ' Extension Consultation', value: ' Extension Consultation' },
        { key: ' Extension Installation', value: ' Extension Installation' },
        { key: ' Extension Move-Up', value: ' Extension Move-Up' },
        { key: ' Make-Up', value: ' Make-Up' },
        { key: ' Special Occasion Hairstyle', value: ' Special Occasion Hairstyle' },
        { key: ' Perm', value: ' Perm' },
        { key: ' Deep Conditioning Treatment', value: ' Deep Conditioning Treatment' },
        { key: ' Blow Dry and Style', value: 'Blow Dry and Style' }
    ];

    const database = axios.create({
        //baseURL: 'http://10.0.0.192:3000'
        //baseURL: 'http://10.0.0.199:3000',
        //baseURL: 'http://10.0.0.14:3000' Cameron's IP address for testing,
        baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })

    //dummy data for postNewUser function until Firebase authentication is set up
    const verified = true; //demo data signifying the user is verified
    const e_mail = 'joeshmoe@anywhere.com';
    const phone_number = '5555555555';
    const pass_word = 'JoesPassword';
    const admin_priv = 0; //no admin privileges
    const first_name = 'Joe';
    const middle_name = 'Sh';
    const last_name = 'Moe';
    const preferred_way_of_contact = 'email';
    const approval_status = 1; //not sure what 1 represents - Chris

    //posts new user to the database --> will need to set up format validation later  email, phoneNumber, pass, adminPrive
    const postNewUser = async () => {
        try {
            if (verified) {
                
                //post data for new user
                const userResponse = await database.post('/newUserPost', {
                    email: e_mail,
                    phoneNumber: phone_number,
                    pass: pass_word,
                    adminPrive: admin_priv
                });
                
                //get the userID from response
                const userID = userResponse.data.userID;
                //console.log('userID', userID); //for testing

                //post to Clients -> must post to Clients before NewClients because of foreign key constraint
                await database.post('/newClientPost', {
                    userID: userID,
                    firstName: first_name,
                    middleName: middle_name,
                    lastName: last_name,
                    preferredWayOfContact: preferred_way_of_contact,
                });
                
                //post to NewClients
                await database.post('/new_newClientPost', {
                    userID: userID,
                    approvalStatus: approval_status
                });
                
                console.log('New user and related data posted successfully.');
                alert('new account created successfully');
            } else {
                console.log('Verification failed. Cannot post new user data.');
            }
        } catch (error) {
            console.error('Error posting new user data:', error);
            alert('problem with creating new account');
        }
    };

    function newUserSignUp()
    {
        interface clientInformation
        {
            firstName: string
            lastName: string
            email: string
            phoneNumber: string
            password: string
        }
        let client: clientInformation;
        //password conditionals if these are both false move onto setting the 
        if(password != confirmPassword)
        {
            alert("Passwords did not match. Please try again.")
        }
        else if(password == "" || confirmPassword == "")
        {
            alert("No password was entered. Please enter in a password.")
        }
        else
        {
            client.firstName = firstName;
            client.lastName = lastName;
            client.email = email;
            client.phoneNumber = phoneNumber;
            client.password = password;
            //check to see if user was successfully created in Entra ID if so send user back to the log in screen.
        }

    
        //on press send client sign up information to Entra ID
        //on press if the sign up was successful send the user back to the log in screen which we don't have in this branch.
        return 0;
    }

    function handleSignUpPress()
    {
        let verify = newUserSignUp();

        if(verify = 0)
        {
            postNewUser();
            //return user to log in page is not available right now. There is no log in screen in this branch. Will have to test later
            //navigation.navigate("Login")
        }
    }


    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('./images/logo.png')} style={styles.logo} />
                </View>
                <LinearGradient locations={[0.8, 1]} colors={['#DDA0DD', 'white']} style={styles.linearGradientStyle}>
                    <View style={styles.body}>
                        <View style={styles.createAccountContainer}>
                            <Text style={styles.createAccountText}>Create an Account</Text>
                        </View>
                        <View style={styles.textFieldContainer}>
                            <TextInput
                                style={styles.textField}
                                value={firstName}
                                onChangeText={newFirstName}
                                onTextInput={() => checkfirstNameValid()}
                                placeholder="First Name"
                            />
                            <TextInput
                                style={styles.textField}
                                value={lastName}
                                onChangeText={newLastName}
                                onTextInput={() => checklastNameValid()}
                                placeholder="Last Name"
                            />
                            <TextInput
                                style={styles.textField}
                                value={email}
                                onChangeText={newEmail}
                                onTextInput={() => checkemailValid()}
                                placeholder="Email"
                            />
                            <TextInput
                                style={styles.textField}
                                value={phoneNumber}
                                onChangeText={newPhoneNumber}
                                onTextInput={() => checkphoneNumberValid()}
                                placeholder="Phone Number"
                                keyboardType="numeric"
                                maxLength={14}  // putting 14 for now if international number + added dashes , originally 11
                            />
                            <TextInput
                                style={styles.textField}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={newPassword}
                                onTextInput={() => {checkpasswordValid(); checkconfirmPasswordValid()}} /*extra measure if user changes password*/
                                placeholder="Password"
                            />
                            <TextInput
                                style={styles.textField}
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={newConfirmPassword}
                                onTextInput={() => checkconfirmPasswordValid()}
                                placeholder="Confirm Password"
                            />
                        </View>
                        <View style={styles.serviceContainer}>
                            <MultipleSelectList
                                setSelected={(val) => setSelected(val)}
                                data={hairOptions}

                                // styles
                                boxStyles={styles.dropDown}
                                inputStyles={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
                                labelStyles={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
                                dropdownStyles={{
                                    backgroundColor: 'white',
                                    width: '85%'
                                }}
                                badgeStyles={styles.badgeStyle}

                                maxHeight={1500}
                                save='value'
                                search={false}
                                label="Preferred Services"
                                placeholder="Preferred Services"
                                onSelect={() => handleHairSelection(selected)}
                            />
                        </View>
                        
                        <View style={styles.signUpContainer}>
                            <TouchableOpacity 
                                //disabled={formComplete} //not sure why it was disabled -> enabled again to demo postNewUser function -Chris
                                style={styles.signUpButton}
                                onPress={handleSignUpPress}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    );
}

//a bunch of checks to see if the text fields are being filled correctly.

//{ firstNameValid && <Text> firstName is valid</Text> /*debugging*/ } 
//{ lastNameValid && <Text> lastName is valid</Text> /*debugging*/ } 
//{ emailValid && <Text> email is valid</Text> /*debugging*/ } 
//{ phoneNumberValid && <Text> phone is valid</Text> /*debugging*/ } 
//{ passwordValid && <Text> password is valid</Text> /*debugging*/ } 
//{confirmPasswordValid && <Text>confirm password is valid</Text> /*debugging*/ }
//{phoneNumber.length != 0 && <Text> phoneNumber length is: {phoneNumber.length} </Text>}
//{selected.length != 0 && <Text> service/services selected </Text>}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        justifyContent: 'center',
        padding: 10
    },
    linearGradientStyle: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderColor: 'black',
        borderWidth: 1
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // logo styling
    logo: {
        width: 170,
        height: 150
    },
    // create account
    createAccountContainer: {
        padding: 10
    },
    createAccountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    // text fields
    textFieldContainer: {
        alignItems: 'center',
        padding: 5,
        gap: 10
    },
    textField: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '75%',
        height: 40,
        borderRadius: 15,
        padding: 10
    },
    // preferred services
    serviceContainer: {
        alignItems: 'center',
        padding: 10
    },
    badgeStyle: {
        textAlign: 'center',
        backgroundColor: '#C154C1',
    },
    dropDown: {
        backgroundColor: '#880085',
        width: '85%',
        maxWidth: '85%',
        //margin: 15,
        paddingTop: 10,
        padding: 100,
    },

    // sign up button
    signUpContainer: {
        alignItems: 'center',
    },
    signUpButton: {
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