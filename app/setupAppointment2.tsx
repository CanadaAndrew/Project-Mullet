import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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
    Image
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';

export default function setupAppointment2() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
    {/*demo data from queried db, used leading space to keep auto button width uniform*/ }
    const listOfTimes = [
        ' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm'
    ]

    // dummy input.  change later.
    const month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]
    const services = [
        //'Service 1', 'Service 2', 'Service 3', 'Service 4'
        'Women\'s Haircut'
    ]
    const dates = [
        //'1', '8', '17', '24'
        '24th', '27th'
    ]
    const dummyDates = [
        'Tues, Oct 24th', 'Fri, Oct 27th'
    ]
    const legendWords = [
        'Available:', 'Unavailable:', 'Selected:'
    ]

    // functions
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
        console.log(`Selected day: ${day.day}`);     //For testing purposes
        console.log(`Selected month: ${day.month}`); //For testing purposes
        console.log(`Selected year: ${day.year}`);   //For testing purposes
        //add API call to database here using day and copy results over listOfTimes
    };

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
                    <View style = {styles.body}>
                        <View style={styles.appointmentInfoContainer}>
                            <View style={styles.appointmentHeader}>
                                <Text style={styles.appointmentText}>Schedule an Appointment</Text>
                            </View>
                            <View style={styles.appointmentServicesSelected}>
                                <Text style={styles.appointmentText}>Services Selected:</Text>
                                <FlatList              //adds buttons for available times from db
                                    data={services} //need to change later to items from db and account for empty set
                                    renderItem={({ item }) => (
                                        <Text style={styles.appointmentText}>
                                            {item}{', '}
                                        </Text>
                                    )}
                                    horizontal = {true}
                                //contentContainerStyle={styles.timeContainer} //adjust to style buttons
                                />
                            </View>
                            <View style={styles.appointmentDateChosen}>
                                <Text style={styles.appointmentText}>Date/Dates Chosen:</Text>
                                <FlatList              //adds buttons for available times from db
                                    data={dates} //need to change later to items from db and account for empty set
                                    renderItem={({ item }) => (
                                        <Text style={styles.appointmentText}>
                                            {item}{', '}
                                        </Text>
                                    )}
                                    horizontal = {true}
                                />
                            </View>
                        </View>
                        <View style = {styles.availableContainer}>
                            <View style={styles.availableTimesHeader}>
                                <Text style={styles.appointmentText}>Available Times:</Text>
                            </View>
                            <View style = {styles.availableIterable}>
                                <FlatList              //adds buttons for available times from db
                                    data={dummyDates} //need to change later to items from db and account for empty set
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style = {styles.availableViewInFlatList}>
                                            <View style = {styles.availableDateContainer}>
                                                <Text style={styles.availableDateText}>{item}</Text>
                                            </View>
                                            <View style={styles.availableTimeContainer}>
                                                <FlatList              //adds buttons for available times from db
                                                    data={listOfTimes} //need to change later to items from db and account for empty set
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item }) => (
                                                        <View style={styles.availableTimeCell}>
                                                            <TouchableOpacity
                                                                style={[styles.availableTimeCellButton, { backgroundColor: 'white' }]}
                                                                onPress={() => handleAppointmentPress(item)}
                                                            >
                                                                <Text style={[styles.availableTimeCellText, { color: appointmentTimes.includes(item) ? 'green' : 'red' }]}>
                                                                    {item}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    numColumns={4}                               //number buttons per row
                                                    contentContainerStyle={styles.availableTimeContainer} //adjust to style buttons
                                                />
                                            </View>
                                        </View>
                                    )}
                                    contentContainerStyle={styles.availableIterable}
                                />
                            </View>
                            <View style = {styles.availableLegendContainer}>
                                <Text style={styles.availableLegendText}>{legendWords[0]}</Text>
                                <View style = {styles.availableLegendDotCell}>
                                    <Image source={require('./images/black_dot.png')} style={styles.availableLegendDot} />
                                </View>
                                <Text style={styles.availableLegendText}>{legendWords[1]}</Text>
                                <View style={styles.availableLegendDotCell}>
                                    <Image source={require('./images/red_dot.png')} style={styles.availableLegendDot} />
                                </View>
                                <Text style={styles.availableLegendText}>{legendWords[2]}</Text>
                                <View style={styles.availableLegendDotCell}>
                                    <Image source={require('./images/green_dot.png')} style={styles.availableLegendDot} />
                                </View>
                            </View>
                        </View>
                        <View style = {styles.confirmButtonContainer}>
                            <Pressable
                                style={({ pressed }) => [{
                                    backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                },
                                styles.confirmButton
                                ]}>
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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