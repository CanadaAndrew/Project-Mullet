import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, useWindowDimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import axios from 'axios';

export default function appointmentsClientView(){

    const windowDimensions = Dimensions.get('window')
    interface Appointment {
        name: string;
        service: string;
        date: string;
        stylist: string;
        realDate: Date;
    }

    let defaultAppointment : Appointment[] = [];
    const [upcomingClientAppointments, setUpcomingClientAppointments] = React.useState(defaultAppointment);
    const [pastClientAppointments, setPastClientAppointments] = React.useState(defaultAppointment);

    const database = axios.create({
        baseURL: 'http://10.0.0.192:3000',
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
    })

    const [first, setFirst] = React.useState(0);
    firstUpdate();
    function firstUpdate(){
        if(first === 0 ){
            setFirst(1);
            let date = new Date;
            let dateString = date.toISOString(); //NOTE THAT THE DATE IS CURRENTLY OFF, NEED TO FIX IN ANOTHER SPRINT
            updateUpcomingAppointments(dateString.split("T")[0], 1); //Note that currently using ID 1 until the use of UserID transfer comes in
            updatePastAppointments(dateString.split("T")[0], 1);
        }
    }
    //Updates the upcoming appointments given a date.
    function updateUpcomingAppointments(date, userID){
        let data;
        database.get('/queryUpcomingAppointmentsByUserIDAndDate', {
            params: {
                date : date,
                userID: userID //temp value, will be changed
            }
        })
        .then((ret) => data = ret.data)
        .then(() => {updateUpcomingAppointmentsDisplay(data)})
        .catch(() => {alert("error");});
    }

    function updatePastAppointments(date, userID){
        let data;
        database.get('/queryPastAppointmentsByUserIDAndDate', {
            params: {
                date : date,
                userID: userID //temp value, will be changed
            }
        })
        .then((ret) => data = ret.data)
        .then(() => {updatePastAppointmentsDisplay(data)})
        .catch(() => {alert("error");});
    }

    function updateUpcomingAppointmentsDisplay(data){
        //alert(JSON.stringify(data));
        //alert(JSON.stringify(data[0]));
        let appointmentList : Appointment[] = [];
        let i = 0;
        data.forEach((appointment) => {
            let dateTimeArray = appointment.AppointmentDate.split("T");
            let newDate = dateTimeArray[0];
            let newTime = dateTimeArray[1].split("Z")[0];
            let newAppointment : Appointment = {
                name: appointment.UserID,
                service: appointment.TypeOfAppointment,
                date: newDate + ", " + newTime,
                stylist: 'Melissa Wright',
                realDate: new Date(newDate)
            }
            appointmentList[i] = newAppointment;
            i += 1;
        }
        )
        setUpcomingClientAppointments(appointmentList);
        alert("Upcoming List: " + JSON.stringify(appointmentList));
    }

    function updatePastAppointmentsDisplay(data){
        let appointmentList : Appointment[] = [];
        let i = 0;
        data.forEach((appointment) => {
            let dateTimeArray = appointment.AppointmentDate.split("T");
            let newDate = dateTimeArray[0];
            let newTime = dateTimeArray[1].split("Z")[0];
            let newAppointment : Appointment = {
                name: appointment.UserID,
                service: appointment.TypeOfAppointment,
                date: newDate + ", " + newTime,
                stylist: 'Melissa Wright',
                realDate: new Date(newDate)
            }
            appointmentList[i] = newAppointment;
            i += 1;
        }
        )
        setPastClientAppointments(appointmentList);
        //Test: alert("Past list: " + JSON.stringify(appointmentList));
    }


    let clientAppointmentsDefault: Appointment[] = [
        {
            name: "Will Smith",
            service: "Mens Haircut",
            date: "10/27/23, Fri, 1:00pm",
            stylist: 'Melissa Wright',
            realDate: new Date("2023-10-27")
        },
        {
            name: "Bob Smith",
            service: "Mens Haircut",
            date: "11/27/23, Mon, 2:00pm",
            stylist: 'Melissa Wright',
            realDate: (new Date("2023-11-27"))
        },
        {
            name: "Jane Doe",
            service: "Womens Haircut",
            date: "11/18/23, Fri, 3:00pm",
            stylist: 'Melissa Wright',
            realDate: new Date("2023-11-18")
        },
        {
            name: "Melinda Jackson",
            service: "Hair Extensions",
            date: "11/15/23, Sat, 2:00pm",
            stylist: 'Melissa Wright',
            realDate: new Date("2023-11-15")
        }
    ]

    return(
        <ScrollView>
            <View style = {styles.container}>
                <LinearGradient
                  locations = {[0.7, 1]}
                  colors = {['#EB73C9', 'white']}
                  style = {{width: windowDimensions.width, height: windowDimensions.height - 85}}
                >
                    <View style = {styles.background}>
                        {/*Upcoming Appointments List*/}
                        <Text style = {styles.objectTitle}>Upcoming Appointments:</Text>

                        <FlatList
                            data={clientAppointmentsDefault}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <View style={[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Customer:</Text>
                                        <Text style={styles.appointText}> {item.name}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Service:</Text>
                                        <Text style={styles.appointText}>{item.service}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Date:</Text>
                                        <Text style={styles.appointText}>{item.date}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Stylist:</Text>
                                        <Text style={styles.appointText}>{item.stylist}</Text>
                                    </View>
                                </View>
                            )}
                        />

                        {/*Past Appointments List*/}
                        <Text style = {styles.objectTitle}>Past Appointments:</Text>
                        {/*temporary data*/}
                        <FlatList
                            data={clientAppointmentsDefault}
                            horizontal={true}
                            renderItem={({ item }) => (
                                <View style={[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Customer:</Text>
                                        <Text style={styles.appointText}> {item.name}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Service:</Text>
                                        <Text style={styles.appointText}>{item.service}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Date:</Text>
                                        <Text style={styles.appointText}>{item.date}</Text>
                                    </View>
                                    <View style={styles.textAlignment}>
                                        <Text style={styles.appointText}>Stylist:</Text>
                                        <Text style={styles.appointText}>{item.stylist}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                </LinearGradient>

            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 90
    },
    // title styling 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 30,
        paddingBottom: 30
    },
    // background
    background: {
        //paddingTop: 20,
        //paddingBottom: 775,
        alignItems: 'center',
        borderRadius: 30
    },
    // shadow for objects IOS
    boxShadowIOS: {
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    // shadow for objects Android
    boxShadowAndroid: {
        elevation: 10
    },
    // white appointment block
    appointBox: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        //alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 3,

    },
    // text alignment
    textAlignment: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    // appointment text information 
    appointText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10
       ///textAlign: 'center'
    },

})

