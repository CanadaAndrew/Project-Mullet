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
    const [alteredListOfTimes, setAlteredTimes] = useState([]);

    // for data transfer between appointment pages
    const {hairStyleData} = route.params;
    const {dateData} = route.params;

    //using this dummy data because the dateData variable isn't working currently ^^^ keeps spitting out Monday, December 4th, 2023
    let dateChosen = 'Mon, 04 December 2023';
    

    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000'
        //baseURL: 'http://10.0.0.199:3000',
        //baseURL: 'http://10.0.0.14:3000' Cameron's IP address for testing
    })


    function updateTimeList(appointmentData){
        //creates a new date object based on the dateChosen variable. getter/setter isn't working properly for it yet so it is still
        //using dummy data
        var appointmentDateChosen = new Date(dateChosen).toISOString().slice(0, 10);

        let appointment;
        let Times = [];
        /*
        for loop that searches the appointments in the database. If it matches the appointments that are of the same date chosen
        and the vacancy status is 0 meaning that there is no appointment scheduled for that time slot then it formats the time from
        the database and puts it into the Times array
        */
        for(appointment in appointmentData)
        {
            let databaseDate = appointmentData[appointment].AppointmentDate.slice(0, 10);

            if(databaseDate == appointmentDateChosen && appointmentData[appointment].VacancyStatus == 0)
            {
                //lots of formatting to be done
                let aptdate = new Date(appointmentData[appointment].AppointmentDate);
                const hours = aptdate.getUTCHours().toString().padStart(2, '0');
                const minutes = aptdate.getUTCMinutes().toString().padStart(2, '0');
                const seconds = aptdate.getUTCSeconds().toString().padStart(2, '0');
                const formattedTime = `${hours}:${minutes}:${seconds}`;

                const[hours1, minutes1] = formattedTime.split(':');
                let period = 'am';
                let hours12 = parseInt(hours, 10);
                if(hours12 >= 12)
                {
                    period = 'pm';
                    if(hours12 > 12)
                    {
                        hours12 -= 12;
                    }
                }

                const formatted12HourTime = `${hours12.toString()}:${minutes}${period}`;
                //at the end it pushes the formatted time to the Times array
                Times.push(formatted12HourTime);


            }
        }
        //useState that keeps track of the alteredListOfTimes array. Setting the alteredListOfTimes array to the correctly
        //formatted and ordered Times array so it can be used outside of this function.
        setAlteredTimes(Times);
    }

    //This is the call to get the appointments from the database. It calls updateTimeList with the data that the call recieves
    let appointmentData;
    database.get('/queryAppointments').then((ret) => appointmentData = ret.data).then(() => updateTimeList(appointmentData)).catch(() => {alert("error");});

    //this sets the original listOfTimes to the altered list of times based on the vacancy status in the database.
    const listOfTimes = alteredListOfTimes;

    const month = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const services = [];

    const dates = [];
    const dummyDates = dateData.split(', ')

    const legendWords = ['Available:', 'Selected:'];

    useEffect(() => {
        setAppointmentTimes(listOfTimes);
    }, []);

    const handleAppointmentPress = (time, date) => {
        setSelectedDate((prevDate) => {
            const newDate = prevDate === date ? null : date;
            alert('selected date: ' + newDate); //for testing purposes
            return newDate;
        });
        setSelectedTime((prevTime) => {
            const newTime = prevTime === time ? null : time;
            alert('selected time: ' + newTime); //for testing purposes
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
                                            {item}
                                        </Text>
                                    )}
                                    horizontal={true}
                                />
                            </View>
                            <View style={styles.appointmentDateChosen}>
                                <Text style={styles.appointmentText}>Dates Chosen:</Text>
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
                                        userID: '321-422-4215'
                                    }
                                }).then(()=>{alert('success')}).catch(() => alert('error'))}
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