import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import MyCalendar from './MyCalendar';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default function newClientInfo() {
    return (
<>



</>  
)}

const database = axios.create({
    //baseURL: 'http://10.0.0.192:3000',
    baseURL: 'http://192.168.1.150:3000', //Chris pc local
})

//need to add to submit button when HTML is added and test
//dummy data for testing purposes
const user_ID = 5; //will need to be replaced with actual userID once ok'd from admin (ApprovalStatus in NewClients)
const strt = "1234 Main St";
const cty = "Anytown";
const stat = "TX";
const zp = "12345";
//adds current client to database
const handleCurrentClientPost = async () => {
    try {
        const response = await database.post('/currentClientPost', { //userID, street, city, state, zip
            userID: user_ID,
            street: strt,
            city: cty,
            state: stat,
            zip: zp
        });
    //console.log(response); //for testing purposes
    } catch (error) {
        console.error('Error adding current client:', error.response.data);
    }
};  