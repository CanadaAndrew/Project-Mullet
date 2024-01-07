import React, { useEffect, useState, } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Pressable,
    FlatList,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';
import moment from 'moment'; //used to format dates and times
import MyCalendar from './MyCalendar';
import axios from 'axios';  //Used to get data from the backend nodejs


export default function ModifyAv() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayedDate, setDisplayedDate] = useState(null);
    const listOfTimesDefault = [ //used initially and if row is empty for selected date
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      ];
    const [listOfTimes, setListOfTimes] = useState(listOfTimesDefault);

    //Creates a gateway to the server, make sure to replace with local IP of the computer hosting the backend,
    //in addition remember to turn on backend with node DatabaseConnection.tsx after going into the Database file section in a seperate terminal.
    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000', //Andrew pc local
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })
    //function that is called by onDayPress built in function that in turn calls the setSelctedDate function
    const handleDayPress = async (day) => {
        console.log(day.dateString)
        setSelectedDate(day.dateString);
        setDisplayedDate(moment(day.dateString).format('ddd, MMMM Do'));
        try {
            setLoading(true);
            //console.log(`Selected date: ${day.dateString}`);
            let tomorrow = day.day + 1;
            let tomorrowString = day.year + '-' + day.month + '-' + tomorrow.toString();
            const response = await database.get('/customQuery', {
                params: {
                    query: `SELECT * FROM Appointments WHERE AppointmentDate >= '${day.dateString}' AND AppointmentDate < '${tomorrowString}' AND VacancyStatus = 1;`
                },
            });
            console.log(response); //for testing purposes
            const newData = response.data ? response.data.map((appointment) => {
                // Extract hours and minutes from dateTime2 value
                const date = new Date(appointment.AppointmentDate);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            }) : null;            
            //update the state only if newData is not null
            if (newData !== null) {
                setAppointmentTimes(newData);
                console.log(newData);
            }
        } catch (error) {
            console.error(error);  //if there's an error, do not update state and keep current listOfTimes          
        } finally {
            setLoading(false);
        }
        return null;
    };

    useEffect(() => { //initialize appointmentTimes with demo data
        setAppointmentTimes(listOfTimes);
    }, []);

    const handleAppointmentPress = (time) => {
        setAppointmentTimes((prevAppointments) => {
            const updatedAppointments = [...prevAppointments];
            const index = updatedAppointments.indexOf(time);          
            if (index !== -1) {
                updatedAppointments.splice(index, 1);
            } else {
                updatedAppointments.push(time);
            }
            return updatedAppointments;
        });
    };
    
    const handleSetSchedule = async (day) => {
        try {
            const timesToInsert = listOfTimesDefault.filter(time => appointmentTimes.includes(time)); 
            //check if there are times to insert
            if (timesToInsert.length > 0) {
                //create new row for each time to insert
                const createPromises = timesToInsert.map(async (time) => {
                    const dateTimeString = `${selectedDate} ${time}:00`;
                    try {
                        const response = await database.post('/appointmentPost', {
                            queryString: 'INSERT INTO Appointments (AppointmentDate, VacancyStatus) VALUES (@AppointmentDate, @VacancyStatus);',
                            values: {
                                AppointmentDate: `${dateTimeString}`, 
                                VacancyStatus: 1
                            }
                        });
                        console.log(response);
                    } catch (error) {
                        console.error('Error creating appointment:', error.response.data);
                    }
                });
    
                //wait for all create operations to complete
                await Promise.all(createPromises);
            }
    
            //check if there are times to delete
            const timesToDelete = listOfTimesDefault.filter(time => !appointmentTimes.includes(time));
            if (timesToDelete.length > 0) {
                //delete rows for times in database but not in current list
                const deletePromises = timesToDelete.map(async (time) => {
                    const dateTimeString = `${selectedDate} ${time}:00`;
                    try {
                        const response = await database.delete('/customDelete', { 
                            params: {
                                query: `DELETE FROM AppointmentDate WHERE AppointmentDate = '${dateTimeString}';`
                            }
                        });
                        console.log(response); //for testing purposes
                    } catch (error) {
                        console.error('Error deleting appointment:', error);
                    }
                });
    
                //wait for all delete operations to complete
                await Promise.all(deletePromises);
            }
    
            //log success or handle it as needed
            console.log('Schedule updated successfully');
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };
    
    useEffect(() => {
        setAppointmentTimes(listOfTimes);
      }, [loading]);
     
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
                            style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText]}
                        >
                        {({ pressed }) => (
                            <Link href="/">
                                <Text style={styles.backButtonText}>Back</Text>
                            </Link>
                        )}
                        </Pressable>
                    </View>
                    <Calendar onDayPress={handleDayPress} />
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{displayedDate}</Text>
                    </View>
                    <FlatList
                        data={listOfTimes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.timeCell}>
                            <TouchableOpacity
                                style={[styles.timeButton, { backgroundColor: 'white' }]}
                                onPress={() => handleAppointmentPress(item)}
                            >
                            <Text style={[styles.buttonText, { color: appointmentTimes.includes(item) ? 'green' : 'red' }]}>
                                {item}
                            </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={5}
                    contentContainerStyle={styles.timeContainer}
                    />
                    <View style={styles.bottomButtonContainer}>
                        <View style={styles.bottomButton}>
                            <Pressable
                                style={({ pressed }) => [{
                                backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                },
                                styles.bottomButtonText
                                ]}
                                onPress={handleSetSchedule}
                            >
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
    // calendar.  calendarText is placeholder
    calendar: {
        flex: 0,
        height: 200,
        //backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 50,
        padding: 0,
        alignItems: 'center',
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
        //marginTop: 30,
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
        width: '20%',             //Adjust width to 20% for five buttons per row
        justifyContent: 'center', //center content vertically
        alignItems: 'center',     //center content horizontally
        marginBottom: 10,         //add marginBottom for spacing
        height: 40,               //add uniform height to buttons
    },
    // bottom three buttons
    bottomButtonContainer: {
        //backgroundColor: 'lightgreen',
        height: 50,
        flex: .2,
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
        paddingTop: 5,
        paddingBottom: 5,
        //elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    timeButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold', 
    }, 
});