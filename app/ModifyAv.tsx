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
<<<<<<< Updated upstream
import DateTimePicker from "@react-native-community/datetimepicker";
=======
import DateTimePicker from '@react-native-community/datetimepicker';
>>>>>>> Stashed changes

export default function ModifyAv() { 
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
     {/*demo data from queried db, used leading space to keep auto button width uniform*/}
     const listOfTimes = [ 
        ' 7:00am', ' 8:00am', ' 9:00am', '10:00am', '11:00am', '12:00pm', ' 1:00pm', ' 2:00pm'
    ]

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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
   
    const [modalVisible, setModalVisible] = useState(false); //popup for set schedule
    const handleSetSchedule = () => {
        // Push the appointmentTimes array to the database here

        setModalVisible(!modalVisible); //toggle popup
  
        console.log('Appointment Times:', appointmentTimes);       
=======
    
 const [modalVisible, setModalVisible] = useState(false); //popup for set schedule
=======
    const [modalVisible, setModalVisible] = useState(false); //popup for set schedule
>>>>>>> Stashed changes
 const handleSetSchedule = () => {
     //TODO: Push the appointmentTimes array to the database here
     setModalVisible(!modalVisible);

     console.log('Appointment Times:', appointmentTimes);       
 };
<<<<<<< Updated upstream
 const [date, setDate] = useState(new Date(1598051700000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showTimepicker = () => {
      showMode('time');
>>>>>>> Stashed changes
=======
    
 //NOTE: Date is set in Unix timestamp format, using a converter highly recommended. https://www.epochconverter.com/
    const [date1, setDate1] = useState(new Date(1700326800000));
    const [show1, setShow1] = useState(false);
  
    const onChange1 = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow1(false);
      setDate1(currentDate);
>>>>>>> Stashed changes
    };
  
    const showTimePicker1 = () => {setShow1(true); };

    const [date2, setDate2] = useState(new Date(1700355600000));
    const [show2, setShow2] = useState(false);
  
    const onChange2 = (event, selectedDate2) => {
      const currentDate2 = selectedDate2;
      setShow2(false);
      setDate2(currentDate2);
    };
  
    const showTimePicker2 = () => {setShow2(true); };

    const getTime1 = () => {

        return (date1.getHours()*100) + date1.getMinutes();
    }

    const getTime2 = () => {

        return (date2.getHours()*100) + date2.getMinutes();
        
    }

    




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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
            <Modal visible={modalVisible}> 
=======

    <Modal visible={modalVisible}> 
>>>>>>> Stashed changes
=======
            <Modal visible={modalVisible}> 
>>>>>>> Stashed changes
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

        
<<<<<<< Updated upstream
                                
        
=======
>>>>>>> Stashed changes
          <Pressable 
            style={({ pressed }) => [{
                backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
            }, styles.bottomButtonText]}
           onPress={() => setModalVisible(!modalVisible)}>
           <Text >Hide Modal</Text>
        
          </Pressable>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======



          <Pressable onPress={showTimepicker}  >
          <Text>Show time picker!</Text>
          </Pressable>

        <Text>selected: {date.toLocaleTimeString()}</Text>
        <Text>selected: {date.toTimeString()}</Text>
        <Text>selected: {date.getTime()}</Text>
        <Text>selected: {date.getHours()}</Text>
        <Text>selected: {date.getMinutes()}</Text>
        {show && (
          <DateTimePicker
            value={date}
            mode={'time'}
            is24Hour={false}
            onChange={onChange}
            
          />
        )}
>>>>>>> Stashed changes
        </View>
      </Modal>

=======



          <Pressable onPress={showTimePicker1}  >
          <Text>Show time picker #1!</Text>
          </Pressable>

          <Pressable onPress={showTimePicker2}  >
          <Text>Show time picker #2!</Text>
          </Pressable>

        
        <Text>time 1: {date1.getHours()} : {date1.getMinutes()}</Text>
        <Text>time 1 const: {getTime1()}</Text>
        <Text>time 2: {date2.getHours()} : {date2.getMinutes()}</Text>
        <Text>time 2 const: {getTime2()}</Text>
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
        </View>
      </Modal>
>>>>>>> Stashed changes
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
    // date1
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
});