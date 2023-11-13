import { StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {SafeAreaView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';


export default function ClientAp(){

    interface Appointment {
        name: string;
        service: string;
        date: string;
        stylist: string;
        realDate: Date;
    }


    //new list that makes it work better with filtering and acts more like actual data from the database
    let clientAppointments: Appointment[] = [
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
    //setting the times like i did in the dummy data makes it a UTC date which will always be 1 day behind PST so i add one to the day
    //possibly need to get rid of this when the data base gets added
    clientAppointments.forEach(val => val.realDate.setDate(val.realDate.getDate() + 1));

    //filteredAps is used as an global array to hold the filtered appointments if there is any that need to be filtered by date
    let filteredAps: Appointment[] = [];


    //for the drop down list below
    const [selected, setSelected] = React.useState("");

    const filter = [
        {key: 'All', value: 'All'},
        {key: 'Today', value: 'Today'},
        {key: 'This Week', value: 'This Week'},
        {key: 'This Month', value: 'This Month'}
    ]


    //will probably remove this when the database is added and just work with the date objects it has in it
    const dateFormat = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(2);
        return `${mm}/${dd}/${yy}`;
    }

    //handleSelection is called whenever a change is made in the drop down menu. It is passed the key value from the filter array above
    //it then decides which filtering option to use on the data based upon the key that it is passed in this function
    //it modifies the filteredAps global array and passes it back to the flatlist down below and the flatlist displays what was filtered
    function handleSelection(selected) {
        if(selected == 'All')
        {
            //this just grabs all appointments available in the database
            clientAppointments.forEach(val => filteredAps.push(Object.assign({}, val)));

            //alert(filteredAps[0].realDate.toLocaleDateString());
            //const curDay = new Date();
            //alert(curDay.toLocaleDateString())
        }
        else if(selected == 'Today')
        {
            //this filters out the appointments that are not today

            //making a new date object with the systems current time
            const curDay = new Date();

            //filters the appointments by adding the appointments that have the date in the date string, to the filteredAps array
            //with a temp array as a mediator because javascript is stupid and won't let me copy directly over between the two
            let temp: Appointment[] = [];
            //this line converts both dates to strings(mm/dd/yyy) and compares them storing the ones that are the same in temp
            temp = clientAppointments.filter((item) => item.realDate.toLocaleDateString() === curDay.toLocaleDateString());
            temp.forEach(val => filteredAps.push(Object.assign({}, val)));

        }
        else if(selected == 'This Week')
        { 
            //kinda the same thing as filtering by today but a little more in depth getting todays date from the system and
            //calculating the first and last days of the week for comparison down below
            const today = new Date();
            const firstDayOfWeek = new Date(today);
            const lastDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - today.getDay());
            lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));

            //making another temp array
            let temp: Appointment[] = [];
            
            //this filters the client appointments using the Date Objects instead of strings similar to what was done for 
            //filter by today
            temp = clientAppointments.filter((item) => {
                return item.realDate >= firstDayOfWeek && item.realDate <= lastDayOfWeek;
            })

            //copies each value of temp into the global filteredAps array
            temp.forEach(val => filteredAps.push(Object.assign({}, val)));
            
        }
        else if(selected == "This Month")
        {
            //very similar to filter by week except you are getting the first and last day of the month instead of the week
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);


            //making another temp array
            let temp: Appointment[] = [];
            
            //filtering out appointments that aren't in this month
            temp = clientAppointments.filter((item) => {
                return item.realDate >= firstDayOfMonth && item.realDate <= lastDayOfMonth;
            });

            //copies each value of temp into the global filteredAps array
            temp.forEach(val => filteredAps.push(Object.assign({}, val)));
            
            
        }
    }

    return(
      <>
        <LinearGradient 
        locations = {[0.7, 1]}
        colors = {['#EB73C9','white']}
        style = {styles.container}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                     <Text style = {styles.headerTitle}>Client Appointments</Text>
                </View>
                <View style = {styles.backButton}>     
                    
                    <Pressable
                            style={({ pressed }) => [{
                                backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                            },
                            styles.backButtonText
                            ]}>
                            {({ pressed }) => (
                                <Link href = "/" asChild>
                                <Text style={styles.backButtonText}>Back</Text>
                                </Link>
                            )}
                        </Pressable>
                    
                </View>
            </View>

            <View>
                <SafeAreaView style={styles.container}>
                    <Calendar />
                </SafeAreaView>
            </View>

            {/*drop down list formatting and rendering */}
            <View style = {styles.dropdowncont}>
                <SelectList
                    setSelected = {(val) => setSelected(val)}
                    data={filter}
                    boxStyles = {{backgroundColor:'white'}}
                    dropdownStyles = {{backgroundColor:'white'}}
                    save = 'value'
                    search = {false}
                    defaultOption = {{key: 'All', value: 'All'}}
                    onSelect = {() => handleSelection(selected) }
                    
                />
            </View>
        

            {/* flat list is replacing the hard coded list from before as this can work with database data and print out the entire
            list at once */}
            <FlatList

                data = {filteredAps}
                horizontal = {true}
                renderItem = {({item}) => (
                    <View style = {[styles.appointBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <View style = {styles.textAlignment}>
                        <Text style = {styles.appointText}>Customer:</Text>
                        <Text style = {styles.appointText}> {item.name}</Text>
                    </View>
                    <View style = {styles.textAlignment}>
                        <Text style = {styles.appointText}>Service:</Text>
                        <Text style = {styles.appointText}>{item.service}</Text>
                    </View>
                    <View style = {styles.textAlignment}>
                        <Text style = {styles.appointText}>Date:</Text>
                        <Text style = {styles.appointText}>{item.date}</Text>
                    </View>
                    <View style = {styles.textAlignment}>
                        <Text style = {styles.appointText}>Stylist:</Text>
                        <Text style = {styles.appointText}>{item.stylist}</Text>
                    </View>
                </View>
                )}
            />
        </LinearGradient>
      </> 
    );
}

const styles = StyleSheet.create({
    container: {
    },
    // title of page
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // header color
    header: {
        backgroundColor: '#942989',
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center'
    },
    // white appointment block
    appointBox: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        //alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 3

    },
    // appointment text information 
    appointText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 10
       ///textAlign: 'center'
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
    // text alignment
    textAlignment: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 10,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    //dropdown menu styles
    dropdowncont: {
        padding: 16
    },
})

