import React, { useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';
import MyCalendar from './MyCalendar';

export default function ModifyAv() { 
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
     {/*demo data from queried db, used leading space to keep auto button width uniform*/}
     const listOfTimes = [ 
        ' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm'
    ]

    /*I have genuinely no idea why this function is needed*/
    const handleDatesSelected = (selectedDates: string[]) => {};

    useEffect(() => { //initialize appointmentTimes with demo data
        setAppointmentTimes(listOfTimes);
    }, []);

    const handleAppointmentPress = (time) => {
        const updatedAppointments = [...appointmentTimes];  
        if (updatedAppointments.includes(time)) {
            const index = updatedAppointments.indexOf(time);
            updatedAppointments.splice(index, 1);
        } else {
            updatedAppointments.push(time);
        }
        setAppointmentTimes(updatedAppointments);
    };

    const handleSetSchedule = () => {
        // Push the appointmentTimes array to the database here
        console.log('Appointment Times:', appointmentTimes);       
    };

    return (
        <>
            <StatusBar backgroundColor={'black'} />
            <LinearGradient locations={[0.7, 1]} colors={['#DDA0DD', 'white']} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Modify Availability</Text>
                    </View>
                    <View style={styles.backButton}>
                        <Pressable
                            style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText ]}
                        >
                            {({ pressed }) => (
                                <Link href = "/" asChild>
                                    <Text style={styles.backButtonText}>Back</Text>
                                </Link>
                            )}
                        </Pressable>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Thurs, October 4th</Text>
                    </View>

                                        
                    <View style={styles.calendar}>  
                        <MyCalendar pageName='ModifyAv' onDatesSelected={handleDatesSelected} disabled={false}/>
                    </View>
                    
                    <FlatList              //adds buttons for available times from db
                        data={listOfTimes} //need to change later to items from db and account for empty set
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (               
                            <View style={styles.timeCell}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: 'white' }]}
                                    onPress={() => handleAppointmentPress(item)}
                                >
                                    <Text style={[styles.buttonText, { color: appointmentTimes.includes(item) ? 'green' : 'red' }]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={4}                               //number buttons per row
                        contentContainerStyle={styles.timeContainer} //adjust to style buttons
                    />

                    <View style={styles.bottomButtonContainer}>
                        <View style={styles.bottomButton}>
                            <Pressable
                                style={({ pressed }) => [{
                                    backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                },
                                //styles.backButtonText
                                styles.bottomButtonText
                                ]}>
                                {({ pressed }) => (
                                    <Text style={styles.bottomButtonText}>Add Times</Text>
                                )}
                            </Pressable>
                        </View>
                        <View style={styles.bottomButton}>
                            <Pressable
                                style={({ pressed }) => [{
                                    backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                },
                                styles.bottomButtonText
                                ]}>
                                {({ pressed }) => (
                                    <Text style={styles.bottomButtonText}>Delete Times</Text>
                                )}
                            </Pressable>
                        </View>
                        <View style={styles.bottomButton}>
                            <Pressable
                                style={({ pressed }) => [{
                                    backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                }, styles.bottomButtonText]}
                                onPress={handleSetSchedule} // Attach the function to the onPress event
                                >
                                <Text style={styles.bottomButtonText}>Set Schedule</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </>
    );    
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
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
    // calendar.  calendarText is placeholder
    calendar: {
        flex: 0,
        height: 200,
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 50,
        padding: 0,
    },
    calendarText: {
        color: 'black'
    },
    // date
    dateContainer: {
        //backgroundColor: 'lightblue',
        height: 35
    },
    dateText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 20
    },
    // for the time slots
    timeContainer: {
        flex: 5,
        height: 100,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 30,
        //backgroundColor: 'grey'
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 15
    },
    timeCell: {
        //width: 80,
        paddingRight: 10,
        width: '25%',             //Adjust width to 25% for four buttons per row
        justifyContent: 'center', //center content vertically
        alignItems: 'center',     //center content horizontally
        marginBottom: 10,         //add marginBottom for spacing
        height: 50,               //add uniform height to buttons
    },
    // bottom three buttons
    bottomButtonContainer: {
        //backgroundColor: 'lightgreen',
        flex: 5,
        height: 230,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bottomButton: {
        width: 250
    },
    bottomButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        //backgroundColor: '#C154C1',
        textAlign: 'center',
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 10,
        //elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});