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


export default function ServicesOffered() {

    //Creates a gateway to the server, make sure to replace with local IP of the computer hosting the backend,
    //in addition remember to turn on backend with node DatabaseConnection.tsx after going into the Database file section in a seperate terminal.
    const database = axios.create({
        //baseURL: 'http://10.0.0.192:3000',
        baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })
    
    // placeholder for service names and prices
    const services = [['Kid\'s Haircut', '1 Hour'],['Men\'s Haircut','1 Hour'], ['Women\'s Haircut', '1 Hour'], ['Partial Highlight', '3 Hours']
                    ,['Full Highlight', '3 Hours'], ['Root Touch-Up', '2 Hours'], ['Full Color', '2 Hours'], ['Extension Consultation', '1 Hour']
                    , ['Extension Installation', '3 Hours'], ['Extension Move-Up', '3 Hours'], ['Make-Up', '1 Hour'], ['Specialty Occasion Hairstyle', '1 Hour']
                    , ['Perm', '2 Hours'], ['Deep Conditioning Treatment', '1 Hour'], ['Blow Dry and Style', '1 Hour']]

    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <LinearGradient locations={[0.7, 1]} colors={['#DDA0DD', 'white']} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Services Offered</Text>
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
                        data={services}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.serviceContainer}>
                                <View style={styles.serviceColumn}>
                                    <Text style={[styles.serviceText]}>
                                        {item[0]}
                                    </Text>
                                </View>
                                <View style={styles.serviceColumn}>
                                    <Text style={[styles.priceText]}>
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
        fontSize: 25,
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
    serviceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    serviceColumn: {
        width: '50%',
        paddingLeft: 10,
        paddingRight: 10
    },
    serviceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left'
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right'
    }
});