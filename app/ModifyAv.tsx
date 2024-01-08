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
    Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';  //Used to get data from the backend nodejs


export default function ModifyAv() { 
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
     {/*demo data from queried db, used leading space to keep auto button width uniform*/}
     const [listOfTimes, setlistOfTimes] = useState([]);
     

    //Creates a gateway to the server, make sure to replace with local IP of the computer hosting the backend, 
    //in addition remember to turn on backend with node DatabaseConnection.tsx after going into the Database file section in a seperate terminal.
    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000',
    })

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
        setlistOfTimes([' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm'])
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

    const [modalVisible, setModalVisible] = useState(false); //popup for set schedule
    const handleSetSchedule = () => {
        // Push the appointmentTimes array to the database here
        setModalVisible(!modalVisible); //toggle popup to select time range
        console.log('Appointment Times:', appointmentTimes);       
    };

    //note: Date is in UNIX format, including milliseconds, using a converter is recommended
    const [date1, setDate1] = useState(new Date(1700326800000));
    const [date2, setDate2] = useState(new Date(1700355600000));
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    //changes time with time picker
    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow1(false);
        setDate1(currentDate);
        //setDate doesn't update immediately, which is why currentDate and Time1 are still different
        //getTime1 changes when function ends.
        var tempArray = []

        for(let i = currentDate.getHours(); i < getTime2(); i++)
        {
            tempArray.push(i + " ");
        }

        setlistOfTimes(tempArray);
        tempArray = [];

        console.log("Time 1: " + getTime1())
        console.log("Time 2: " + getTime2())
        console.log(currentDate.getHours())

    
      };

      const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow2(false);
        setDate2(currentDate);

        var tempArray = []

        for(let i = getTime1(); i < currentDate.getHours(); i++)
        {
            tempArray.push(i + " ");
        }

        setlistOfTimes(tempArray);
        tempArray = [];

        console.log("Time 1: " + getTime1())
        console.log("Time 2: " + getTime2())
        console.log(currentDate.getHours())
      };
  
      const showTimePicker1 = () => {setShow1(true); };
      const showTimePicker2 = () => {setShow2(true); };

      //return time in hhmm format
      const getTime1 = () => {return (date1.getHours());}
      const getTime2 = () => {return (date2.getHours());}

     
      
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
                                <Link href = "/">
                                    <Text style={styles.backButtonText}>Back</Text>
                                </Link>
                            )}
                        </Pressable>
                    </View>
                    <Calendar onDayPress={(day) => handleDayPress(day)}/>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>Thurs, October 4th</Text>
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
                                ]}
                                /**
                                 * Example on how to custom query, for the basic queries the second arguement is not needed
                                 * Please form exactly how it is for a custom query with params:{query: queryString}
                                 */
                                onPress={() => database.get('/customQuery',{
                                    params:{
                                        query: 
                                        "SELECT * FROM ServicesWanted WHERE PhoneNumberEmail = '321-422-4215';"
                                    }
                                }
                                )
                                /**
                                 * Note the JSON.stringify, it turns whatever object it is into a string with keys and values,
                                 * might be a better way to handle it for a string as this prints the {} as well.
                                 * Should include ret.data, otherwise you get additional internet header stuff.
                                 */
                                .then((ret) => {alert(JSON.stringify(ret.data[0]))})
                                .catch(() =>alert('error'))}
                                >
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
                    
                    <Modal visible={modalVisible} //popup that displays the two times to input
                     animationType="fade"
                     transparent = {true}
                    > 
                     <View style={styles.modal}>
                        <Pressable onPress={showTimePicker1}  >
                        <Text>Show time picker #1!</Text>
                        </Pressable>

                        <Pressable onPress={showTimePicker2}  >
                        <Text>Show time picker #2!</Text>
                        </Pressable>


                        <Text>time 1: {date1.getHours()} : {date1.getMinutes()}</Text>
                       
                        <Text>time 2: {date2.getHours()} : {date2.getMinutes()}</Text>
                       
                        <Text>listOfTimes: {listOfTimes}</Text>
                        
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
                       
                        <Pressable //hide the popup window
                                    style={({ pressed }) => [{
                                        backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                                    }, styles.bottomButtonText]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text >Hide Modal</Text>
                                

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
    modal: {
      
        flex: 0.5,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(211, 211, 255,0.979)",
        height: 500,
        marginTop: 200,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 36,
        elevation: 8,
        shadowOpacity: 0.55,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 6
        
       
      },
});