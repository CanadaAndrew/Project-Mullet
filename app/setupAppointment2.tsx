import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    FlatList,
    Image
} from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

export default function SetupAppointment2({route}) { // added route for page navigation
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]); //list of selected times to push to db upon confirmation
    const [selectedTime, setSelectedTime] = useState(null);       //updates the selected time state

    // for data transfer between appointment pages
    const {hairStyleData} = route.params;
    const {dateData} = route.params;

    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000',
    })

    const listOfTimes = [ //dummy data for testing purposes -> get data from db either from query in setupAppointment1 or this screen on initialization with date from setupAppointment1
        '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm'
    ];

    const month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const services = [];

    const dates = [''];
    const dummyDates = ['Monday, December 4th, 2023'];

    const legendWords = ['Available:', 'Selected:'];

    useEffect(() => {
        setAppointmentTimes(listOfTimes);
    }, []);

    const handleAppointmentPress = (time, date) => {
        setSelectedDate((prevDate) => {
            const newDate = prevDate === date && selectedTime === time? null : date;
            //alert('selected date: ' + newDate); //for testing purposes
            return newDate;
        });
        setSelectedTime((prevTime) => {
            const newTime = prevTime === time && selectedDate === date ? null : time;
            //alert('selected time: ' + newTime); //for testing purposes
            return newTime;
        });
    };

    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <View style={styles.container}>
                <View style={styles.header}>
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
                    <View style={styles.logoContainer}>
                        <Image source={require('./images/logo.png')} style={styles.logo} />
                    </View>
                </View>

                <LinearGradient locations={[0.8, 1]} colors={['#DDA0DD', 'white']} style={styles.linearGradientStyle}>
                    <View style={styles.body}>
                        <View style={styles.appointmentInfoContainer}>
                            <View style={styles.appointmentHeader}>
                                <Text style={styles.appointmentText}>Schedule an Appointment</Text>
                            </View>
                            <View style={styles.appointmentServicesSelected}>
                                <Text style={styles.appointmentText}>Services Selected:</Text>
                                <Text style={styles.appointmentText}>{hairStyleData}</Text> 
                                <FlatList
                                    data={services}
                                    renderItem={({ item }) => (
                                        <Text style={styles.appointmentText}>
                                            {item}{', '}
                                        </Text>
                                    )}
                                    horizontal={true}
                                />
                            </View>
                            <View style={styles.appointmentDateChosen}>
                                <Text style={styles.appointmentText}>Date Chosen:</Text>
                                <Text style={styles.appointmentText}>{dateData}</Text>
                                <FlatList
                                    data={dates}
                                    renderItem={({ item }) => (
                                        <Text style={styles.appointmentText}>
                                            {item}
                                        </Text>
                                    )}
                                    horizontal={true}
                                />
                            </View>
                        </View>
                        <View style={styles.availableContainer}>
                            <View style={styles.availableTimesHeader}>
                                <Text style={styles.appointmentText}>Available Times:</Text>
                            </View>
                            <View style={styles.availableIterable}>
                                <FlatList
                                    data={dummyDates}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.availableViewInFlatList}>
                                            <View style={styles.availableDateContainer}>
                                                <Text style={styles.availableDateText}>{item}</Text>
                                            </View>
                                            <View style={styles.availableTimeContainer}>
                                                <FlatList
                                                    data={listOfTimes}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item }) => (
                                                        <View style={styles.availableTimeCell}>
                                                            <TouchableOpacity
                                                                style={[styles.availableTimeCellButton, { backgroundColor: 'white' }]}
                                                                onPress={() => handleAppointmentPress(item, dummyDates[index])}
                                                            >
                                                                <Text style={[styles.availableTimeCellText, { color: selectedTime === item && selectedDate === dummyDates[index] ? 'green' : 'black' }]}>
                                                                    {item}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    numColumns={4}
                                                    contentContainerStyle={styles.availableTimeContainer}
                                                />
                                            </View>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.availableIterable}
                                />
                            </View>
                            <View style={styles.availableLegendContainer}>
                                <Text style={styles.availableLegendText}>{legendWords[0]}</Text>
                                <View style={styles.availableLegendDotCell}>
                                    <Image source={require('./images/black_dot.png')} style={styles.availableLegendDot} />
                                </View>
                                <Text style={styles.availableLegendText}>{legendWords[1]}</Text>
                                <View style={styles.availableLegendDotCell}>
                                    <Image source={require('./images/green_dot.png')} style={styles.availableLegendDot} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.confirmButtonContainer}>
                            <Pressable
                                style={({ pressed }) => [{
                                    backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                },
                                styles.confirmButton
                                ]}
                                onPress = {() => database.put('/confirmAppointment', null, {
                                    params:{
                                        date:selectedDate,
                                        time:selectedTime,
                                        userID: '321-422-4215',
                                        services: hairStyleData
                                    }
                                }).then((res)=>{alert(JSON.stringify(res.data))}).catch(() => alert('error'))}
                                >
                                {({ pressed }) => (
                                    <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
                                    
                                )}
                            </Pressable>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: 'white'
    },
    body: {
    },
    linearGradientStyle:{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderColor: 'black',
        borderWidth: 1
    },
    header: {
        //alignItems: 'center',
        //height: 220,
        backgroundColor: 'white',
        flexDirection: 'row'
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
    logoContainer: {
        //height: 60,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 10
        //resizeMode: 'contain'
    },
    // back button styling
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 25
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
    // Schedule an Appointment styling
    appointmentInfoContainer: {
        alignItems: 'center',
        minHeight: 170,
        justifyContent: 'space-evenly',
        rowGap: 5
    },
    appointmentHeader: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    appointmentText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    appointmentServicesSelected: {
        backgroundColor: '#880085',
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    appointmentDateChosen: {
        backgroundColor: '#880085',
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    // Available Times styling
    availableContainer: {
        paddingTop: 5,
        paddingBottom: 5
    },
    availableTimesHeader: {
    },
    availableIterable:{
        //paddingBottom: 5
    },
    availableViewInFlatList: {
    },
    availableDateContainer: {
        paddingLeft: 12,
    },
    availableDateText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    availableTimeContainer: {
        alignItems: 'center',
    },
    availableTimeCell: {
        width: '25%',             //Adjust width to 25% for four buttons per row
        justifyContent: 'center', //center content vertically
        alignItems: 'center',     //center content horizontally
        paddingTop: 5,
        paddingBottom: 5
    },
    availableTimeCellButton: {
        padding: 5,
        borderRadius: 15,
        alignItems: 'center',
    },
    availableTimeCellText: {
        fontSize: 14
    },
    // legend styling
    availableLegendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-evenly',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingBottom: 5
    },
    availableLegendText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    availableLegendDotCell: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 12
    },
    availableLegendDot: {
        width: 10,
        height: 10,
        //paddingTop: 20
    },
    // confirm button styling
    confirmButtonContainer: {
        alignItems: 'center',
        paddingBottom: 10
    },
    confirmButton: {
        //backgroundColor: '#C154C1',
        width: 250,
        justifyContent: 'center',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    confirmButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        //backgroundColor: '#C154C1',
        textAlign: 'center',
        justifyContent: 'center',
        //paddingTop: 5,
        //paddingBottom: 5
    }
});