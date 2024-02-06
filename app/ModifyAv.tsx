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
    Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; //used to format dates and times
import MyCalendar from './MyCalendar';
import axios from 'axios';  //Used to get data from the backend nodejs

export default function ModifyAv() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]); //holds selected appointment times
    const [displayedDate, setDisplayedDate] = useState(null);
    const listOfTimesDefault = [ //used initially and if row is empty for selected date
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
      ];
    const [listOfTimes, setListOfTimes] = useState(listOfTimesDefault); //holds available appointment times
    const [modalVisible, setModalVisible] = useState(false); //popup for set schedule
    const [databaseTimes, setDatabaseTimes] = useState([]); //holds database times -> should make a separate file that pulls today's UTC date and converts to PST

    //Creates a gateway to the server, make sure to replace with local IP of the computer hosting the backend,
    //in addition remember to turn on backend with node DatabaseConnection.tsx after going into the Database file section in a seperate terminal.
    const database = axios.create({
        //baseURL: 'http://10.0.0.192:3000',
        baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })

    //function that is called by onDayPress built in function that in turn calls the setSelctedDate function
    const handleDayPress = async (day) => { 
        //console.log(day.dateString); //for testing purposes
        setSelectedDate(day.dateString);
        setDisplayedDate(moment(day.dateString).format('ddd, MMMM Do'));
        /*try {                                                                 //***commented out to work on post request***
            setLoading(true);
            //console.log(`Selected date: ${day.dateString}`);
            const todayStart = day.dateString + 'T00:00:00.000Z'; //sql DateTime2 format
            const todayEnd = day.dateString + 'T23:59:59.999Z'; //sql DateTime2 format
            const response = await database.get('/customQuery', {
                params: {
                    query: `SELECT * FROM Appointments WHERE AppointmentDate >= '${todayStart}' AND AppointmentDate <= '${todayEnd}';`
                },
            });
            //console.log(response.data); //for testing purposes
            const newAppointmentTimes = response.data ? response.data.map((appointment) => {

                //extract hours and minutes from dateTime2 value
                const date = new Date(appointment.AppointmentDate);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            }) : null;  

            //update state only if newAppointmentTimes is not null
            if (newAppointmentTimes.length > 0) {
                setAppointmentTimes(newAppointmentTimes); 
                //setListOfTimes(newAppointmentTimes);
            }
        } catch (error) {
            console.error(error);  //if there's an error, do not update state and keep current listOfTimes          
        } finally {
            setLoading(false);
        }*/
        return null;
    };

    useEffect(() => { //initialize appointmentTimes with demo data
        setListOfTimes([...listOfTimesDefault])
        setAppointmentTimes([...listOfTimesDefault]);   
    }, []);

    /*useEffect(() => { //for testing purposes -> prints to console whenever lists are updated
        console.log('appointmentTimes', appointmentTimes); //for testing purposes
        console.log('listOfTimes', listOfTimes); //for testing purposes
    }, [appointmentTimes, listOfTimes]);*/

    //removes times from appointmentTimes when button is red
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

    //filter schedule times available
    const handleFilterSchedule = () => {       
        setModalVisible(!modalVisible); //toggle popup to select time range      
    };

    //note: Date is in UNIX format, including milliseconds, using a converter is recommended
    //used for default times in filter schedule modal
    const timestamp = 1700326800000; //UNIX timestamp in milliseconds
    const timestampMidnight = new Date(timestamp).setHours(0, 0, 0, 0); //set to midnight for now to prompt user to change -> doesn't update appointmentTimes until new times are selected -> change in future?
    //const [date1, setDate1] = useState(new Date(1700326800000)); //original setup
    //const [date2, setDate2] = useState(new Date(1700355600000)); //original setup
    const [date1, setDate1] = useState(new Date(timestampMidnight));
    const [date2, setDate2] = useState(new Date(timestampMidnight));
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    
    //changes time with time picker to set opening time
    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow1(false);
        setDate1(currentDate);

        //setDate doesn't update immediately, which is why currentDate and Time1 are still different
        //getTime1 changes when function ends.
        var tempArray = []
        for(let i = currentDate.getHours(); i < date2.getHours(); i++)
        {
            if (i <= 12)
                tempArray.push(i + ":00am");
            else
                tempArray.push(i - 12 + ":00pm");
        }
        setListOfTimes(tempArray);
        setAppointmentTimes
        //console.log("tempArrayOpening: " + tempArray) //for debugging
        tempArray = [];
        //console.log("Time 1: " + getTime1()) //for testing purposes
        //console.log("Time 2: " + getTime2()) //for testing purposes
        //console.log(currentDate.getHours())  //for testing purposes
    };

    //changes time with time picker to set closing time
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow2(false);
        setDate2(currentDate);
        var tempArray = []
        for(let i = date1.getHours(); i < currentDate.getHours(); i++)
        {
            if (i <= 12)
            tempArray.push(i + ":00am");
        else
            tempArray.push(i - 12 + ":00pm");
        }

        //resets lists of times to be the times between the opening and closing times
        setListOfTimes(tempArray);
        setAppointmentTimes(tempArray);
        //console.log("tempArrayClosing: " + tempArray) //for debugging
        tempArray = [];
        if(date1.getHours() <= currentDate.getHours())
        {
            //not sure what this is for???
        }
        //console.log("Time 1: " + getTime1()) //for testing purposes
        //console.log("Time 2: " + getTime2()) //for testing purposes
        //console.log(currentDate.getHours())  //for testing purposes
    };
  
    const showTimePicker1 = () => {setShow1(true); };
    const showTimePicker2 = () => {setShow2(true); };

    //return times in hhmm am/pm format
    const getTime1 = () => {
        if(date1.getHours() <= 12)
        {
            if( date1.getMinutes() < 10)
                return (date1.getHours() + ":" +  "0" + date1.getMinutes() + "am");
            else
                return (date1.getHours() + ":" + date1.getMinutes() + "am");
        }
        else
        {
            if( date1.getMinutes() < 10)
                return (date1.getHours() - 12 + ":" +  "0" + date1.getMinutes() + "pm");
            else
                return (date1.getHours() - 12 + ":" + date1.getMinutes() + "pm");
        }
    }
    const getTime2 = () => {
        if(date2.getHours() <= 12)
        {
            if(date2.getMinutes() < 10)
                return (date2.getHours() + ":" +  "0" + date2.getMinutes() + "am");
            else
                return (date2.getHours() + ":" + date2.getMinutes() + "am");
        }
        else
        {
            if(date2.getMinutes() < 10)
                return (date2.getHours() - 12 + ":" +  "0" + date2.getMinutes() + "pm");
            else
                return (date2.getHours() - 12 + ":" + date2.getMinutes() + "pm");
        }
    }

    //converts time to 24 hour format and removes am/pm
    const convertTo24Hour = (time) => {
        const [hours, minutes] = time.replace(/[^\d:]/g, '').split(':');
        return (parseInt(hours) + (time.includes('pm') ? 12 : 0)).toString().padStart(2, '0') + ':' + minutes;
    };
    //console.log(convertTo24Hour('12:00pm')); //for testing purposes

    //maps appointmentTimes to datetime2 format -> currently not used but maybe later or in date/time file
    const convertToDateTime2 = (time24) => {
        return `${selectedDate}T${convertTo24Hour(time24)}:00.000Z`; //sql DateTime2 format
    };

    //updates appointment schedule in database
    const handleSetSchedule = async (day) => {  
        try {
            const convertedTimes = appointmentTimes.map(convertTo24Hour); //convert to 24 hour format
            //const timesToInsert = listOfTimes.filter(time => appointmentTimes.includes(time)); //times to insert into database
            const timesToInsert = convertedTimes;
            //console.log('convertedTimes', convertedTimes); //for testing purposes
            //console.log('timesToInsert', timesToInsert); //for testing purposes

            //check if there are times to insert
            if (timesToInsert.length > 0) {

                //create new row for each time to insert
                const addPromises = timesToInsert.map(async (time) => {
                    const addDateTimeString = `${selectedDate}T${time}:00.000Z`; //sql DateTime2 format -> could be replaced using convertToDateTime2
                    //console.log('addDateTimeString', addDateTimeString); //for testing purposes
                    const notBooked = 0; //vacancy status

                    //post available appointment times to database
                    try {
                        const response = await database.post('/addAvailability', {
                            addDateTimeString: addDateTimeString,
                            notBooked: notBooked
                        });
                        //console.log(response); //for testing purposes
                    } catch (error) {
                        console.error('Error adding appointment time slot:', error.response.data);
                    }
                });  

                //wait for all create operations to complete
                await Promise.all(addPromises);
            }
                                         //***will work on inserting and deleting only valid times after day query task is complete***

            //check if there are times to delete -> does work with old implementation -> 24hour not am/pm
            //const timesToDelete = listOfTimesDefault.filter(time => !appointmentTimes.includes(time));
            /*const timesToDelete = listOfTimes.filter(time => !appointmentTimes.includes(time)); //times to delete from database
            console.log('timesToDelete', timesToDelete); //for testing purposes
            if (timesToDelete.length > 0) {

                //delete rows for times in database but not in current list
                const removePromises = timesToDelete.map(async (time) => {
                    const removeDateTimeString = `${selectedDate}T${time}:00.000Z`; //sql DateTime2 format
                    //console.log('removeDateTimeString', removeDateTimeString); //for testing purposes

                    //remove available appointment times from database
                    try {
                        const response = await database.delete('/removeAvailability', { 
                            data: {
                                removeDateTimeString: removeDateTimeString
                            }
                        });
                        //console.log(response); //for testing purposes
                    } catch (error) {
                        console.error('Error deleting appointment time slot:', error);
                    }
                });
    
                //wait for all delete operations to complete
                await Promise.all(removePromises);
            }*/
    
            //log success or handle it as needed
            console.log('Schedule updated successfully');
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
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
                        //data={appointmentTimes}
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
                    numColumns={4}
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
                                onPress={handleFilterSchedule}
                            >
                            {({ pressed }) => (
                            <Text style={styles.bottomButtonText}>Filter Schedule</Text>
                            )}
                            </Pressable>
                        </View>
                    </View>   
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
                    <Modal visible={modalVisible} //popup that displays the two times to input
                     animationType="fade"
                     transparent = {true}
                    > 
                    <View style={styles.modal} >
                        <Text style={{fontSize: 24}}>{"\n"}Filter Schedule</Text>
                        <Text>{"\n"}</Text>
                        <View style={{ flexDirection:"row", flex: 0, columnGap: 10}}>                    
                            <Text>Opening Time</Text>                  
                            <Text>                   Closing Time</Text>
                            <Text>{"\n"}</Text>
                        </View>                
                        <View style={{ flexDirection:"row", flex: .2, columnGap: 85}}>
                            <TouchableOpacity style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 4 }}>
                                <Text style={{fontWeight: "bold"}}>{getTime1()}</Text>
                            </TouchableOpacity>                     
                            <TouchableOpacity style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 4 }}>
                                <Text style={{fontWeight: "bold"}}>{getTime2()}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>{"\n"}</Text>
                        <View style={{ flexDirection:"row", flex: .23, columnGap: 30}}>
                            <Pressable  style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText, styles.shadow ]} onPress={showTimePicker1}  >
                                <Text style={styles.backButtonText}>{"  Change Opening  "}</Text>
                            </Pressable>
                            <Pressable  style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText, styles.shadow ]} onPress={showTimePicker2}  >
                                <Text style={styles.backButtonText}>{"   Change Closing   "}</Text>
                            </Pressable>
                        </View>                     
                        {show1 && (
                        <DateTimePicker
                        value={date1}
                        mode={'time'}
                        is24Hour={false}
                        onChange={onChange1}                     
                        />
                        )}
                        {show2 && (
                        <DateTimePicker
                        value={date2}
                        mode={'time'}
                        is24Hour={false}
                        onChange={onChange2}                       
                        />
                        )}
                            <Text>{"\n\n"}</Text>
                            <Pressable //hide the popup window
                                style={({ pressed }) => [{ backgroundColor: pressed ? '#D8BFD8' : '#C154C1' }, styles.backButtonText, styles.shadow ]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text  style={styles.backButtonText} >    Close    </Text>
                            </Pressable>
                    </View>                                
                    </Modal>
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
        alignItems: 'center',  
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
        width: '25%',             //Adjust width to 20% for five buttons per row
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
    modal: {    
        flex: 0.5,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(211, 211, 250,0.979)",
        marginTop: 140,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -280,
        borderRadius: 36,
        elevation: 8,
        shadowOpacity: 0.55,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 6  
    },
    shadow: {   
        elevation: 15, 
    }
});