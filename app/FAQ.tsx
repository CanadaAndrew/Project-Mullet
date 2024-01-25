import React, { useEffect, useState, } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    FlatList,
} from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';  //Used to get data from the backend nodejs


export default function FAQ() {

    //Creates a gateway to the server, make sure to replace with local IP of the computer hosting the backend,
    //in addition remember to turn on backend with node DatabaseConnection.tsx after going into the Database file section in a seperate terminal.
    const database = axios.create({
        //baseURL: 'http://10.0.0.192:3000',
        baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })

    // placeholder for questions/answers
    const questionList = [['Question 1', 'Answer 1'], ['Question 2', 'Answer 2'], ['Question 3', 'Answer 3'], ['Question 4', 'Answer 4'], ['Question 5', 'Answer 5'], ['Question 6', 'Answer 6']]

    // can remove/alter the flat list for the dropdown implementation
    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <LinearGradient locations={[0.7, 1]} colors={['#DDA0DD', 'white']} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Frequently Asked Questions</Text>
                    </View>
                    <View style={styles.backButton}>
                        <Pressable
                            style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText]}
                        >
                            {({ pressed }) => (
                                <Link href="/">
                                    <Text style={styles.backButtonText}>Back</Text>
                                </Link>
                            )}
                        </Pressable>
                    </View>
                    <FlatList
                        data={questionList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.questionContainer}>
                                <View style={styles.questionCell}>
                                    <Text style={[styles.questionText]}>
                                        {item[0]}
                                    </Text>
                                </View>
                                <View style = {styles.answerCell}>
                                    <Text style={[styles.answerText]}>
                                        {item[1]}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </LinearGradient>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#DDA0DD'
    },
    // header
    header: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: '#880085'
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white'
    },
    // back button
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 10
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        //backgroundColor: '#C154C1',
        borderRadius: 20,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        //elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        alignItems: 'center'
    },
    // questions
    questionContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
    },
    questionCell: {
        width: '90%',
        backgroundColor: '#880085',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    answerCell: {
        width: '90%',
        backgroundColor: '#C154C1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        padding: 5,
        paddingLeft: 15
    },
    answerText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'left',
        padding: 5,
        paddingLeft: 15
    }
});