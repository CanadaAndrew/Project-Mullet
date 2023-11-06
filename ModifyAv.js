import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function ModifyAv() {

    // State variable that is initialized to null
    // selectDate stores the selectedState by the user
    // setSelectedDate is a function that updates the value of selectDate
    // setSelectDate is called when the uder clicks on a date and that in turn updates selectDate
    const [selectedDate, setSelectedDate] = useState(null);

    const listOfTimes = [
        '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm'
    ]

    //Getter functions
    const getSelectedDay = () => {
        if (selectedDate) {
            return selectedDate.day;
        }
        return null;
    }

    const getSelectedMonth = () => {
        if (selectedDate) {
            return selectedDate.month;
        }
        return null;
    }

    const getSelectedYear = () => {
        if (selectedDate) {
            return selectedDate.year;
        }
        return null;
    }

    const getSelectedFullDate = () => {
        if (selectedDate) {
            return `${selectedDate.day}-${selectedDate.month}-${selectedDate.year}`;
        }
        return null;
    }

    // function that is called by the onDayPress built in function that in turn calls the setSelctedDate function
    const handleDayPress = (day) => {
        setSelectedDate(day);
    }

    return (
        <>
            <LinearGradient
                locations={[0.7, 1]}
                colors={['#DDA0DD', 'white']} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Modify Availability</Text>
                    </View>
                    <View style={styles.backButton}>
                        <Pressable
                            style={({ pressed }) => [{
                                backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                            },
                            styles.backButtonText
                            ]}>
                            {({ pressed }) => (
                                <Text style={styles.backButtonText}>Back</Text>
                            )}

                        </Pressable>
                    </View>
                    
                    <View>
                    <SafeAreaView style={styles.container}>
                        <Calendar 
                            onDayPress={(day) => handleDayPress(day)}
                        />
                    </SafeAreaView>
                    </View>

                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Thurs, October 4th</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <View style={styles.timeRow}>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[0]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[1]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[2]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[3]}</Text>
                            </View>
                        </View>
                        <View style={styles.timeRow}>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[4]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[5]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[6]}</Text>
                            </View>
                            <View style={styles.timeCell}>
                                <Text style={styles.timeText}>{listOfTimes[7]}</Text>
                            </View>
                        </View>
                    </View>

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
                                },
                                styles.bottomButtonText
                                ]}>
                                {({ pressed }) => (
                                    <Text style={styles.bottomButtonText}>Set Schedule</Text>
                                )}

                            </Pressable>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </>
        
    );

}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#DDA0DD'
    },
    // header
    header: {
        alignItems: 'center',
        paddingTop: 60,
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
        height: 200,
        //backgroundColor: 'white',
        alignItems: 'center'
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
        height: 100,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 10,
        //backgroundColor: 'grey'
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 15
    },
    timeCell: {
        width: 80,
        paddingRight: 10
    },
    timeText: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 20,
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center'
    },
    // bottom three buttons
    bottomButtonContainer: {
        //backgroundColor: 'lightgreen',
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
    }

});