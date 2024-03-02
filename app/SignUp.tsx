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

//made this available for all pages in the app
export let hairStyleSelected: string[] = [];

export default function SignUp({ route }) { // added route for page navigation

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
        //baseURL: 'http://10.0.0.14:3000', // Cameron's IP address for testing
        baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })

    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('./images/logo.png')} style={styles.logo} />
                </View>
                <LinearGradient locations={[0.8, 1]} colors={['#DDA0DD', 'white']} style={styles.linearGradientStyle}>
                    <View style={styles.body}>
                        <View style = {styles.createAccountContainer}>
                            <Text style={styles.createAccountText}>Create an Account</Text>
                        </View>
                        <View style = {styles.textFieldContainer}>
                            <TextInput
                                style={styles.textField}
                                value={firstName}
                                onChangeText={newFirstName}
                                placeholder = "First Name"
                            />
                            <TextInput
                                style={styles.textField}
                                value={lastName}
                                onChangeText={newLastName}
                                placeholder = "Last Name"
                            />
                            <TextInput
                                style={styles.textField}
                                value={email}
                                onChangeText={newEmail}
                                placeholder = "Email"
                            />
                            <TextInput
                                style={styles.textField}
                                value={phoneNumber}
                                onChangeText = {newPhoneNumber}
                                placeholder = "Phone Number"
                                keyboardType = "numeric"
                                maxLength={11}  // putting 11 for now if international number
                            />
                            <TextInput
                                style={styles.textField}
                                value={password}
                                onChangeText = {newPassword}
                                placeholder = "Password"
                            />
                            <TextInput
                                style={styles.textField}
                                value={confirmPassword}
                                onChangeText = {newConfirmPassword}
                                placeholder = "Confirm Password"
                            />
                        </View>
                        <View style = {styles.serviceContainer}>
                            <MultipleSelectList
                                setSelected={(val) => setSelected(val)}
                                data={hairOptions}

                                // styles
                                boxStyles={styles.dropDown}
                                inputStyles={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}
                                labelStyles={{color: 'white', fontWeight: 'bold', textAlign: 'center' }}
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
                        <View style = {styles.signUpContainer}>
                            <TouchableOpacity style={styles.signUpButton}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    );
}

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