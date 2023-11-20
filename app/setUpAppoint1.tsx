import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import MyCalendar from './MyCalendar';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

//made this available for all pages in the app
export let hairStyleSelected: string[] = [];

export default function setUpAppoint1() {

    //useState for drop down menu
    const [selected, setSelected] = React.useState("");

    //options for drop down menu
    const hairOptions = [
        {key: 'Mens Haircut', value: 'Mens Haircut'},
        {key: 'Womens Haircut', value: 'Womens Haircut'},
        {key: 'Hair Color', value: 'Hair Color'},
        {key: 'Extensions', value: 'Extensions'}
    ];
        
    /*I have genuinely no idea why this function is needed*/
    const handleDatesSelected = (selectedDates: string[]) => {};

    

    //the hairStyleSelected string array that is able to be given to different pages
    //let hairStyleSelected: string[] = [];

    //function that handles the selection of the drop down menu
    //converts selected items to a string so it is 100% a string, splits selected based on "," and stores
    //them in the global hairStyleSelected array
    function handleHairSelection(selected)
    {
        let temparr: string[] = [];

        var temp = selected.toString();
        temparr = temp.split(",");
        hairStyleSelected = temparr;
    }

    return(
        <>
        <ScrollView>
          <View style = {styles.container}>

            {/*added logo image use imagebackground in order for back button to overlap image*/}
            <ImageBackground
              style = {styles.logo}
              source={require('./images/Hair_Done_Wright_LOGO.png')}
            >

                {/*back button takes you back to index.tsx*/}
                <View style = {styles.backButton}>
                    <Pressable
                        style = {({pressed}) => [{
                            backgroundColor: pressed ? '#D8BFD8' : '#C154C1'
                        },
                        styles.backButtonText
                    ]}>
                        {({pressed}) => (
                            <Link href = "/" asChild>
                                <Text style = {styles.backButtonText}>Back</Text>
                            </Link>
                        )}
                    </Pressable>


                </View>
            </ImageBackground>


            {/*linear gradient for background */}
            <LinearGradient
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
              >
            <View style = {styles.background}>

                <Text style = {styles.objectTitle}> Schedule an Appointment</Text>

                {/*
                -----multiple select drop down list-----
                this is kinda cool because it concatinates every selection onto the next as a CSV-like object and it takes them off
                in order automatically if you deselect the item. handles the selection up above
                */}
                <View>
                    <MultipleSelectList
                        setSelected = {(val) => setSelected(val)}
                        data={hairOptions}
                        boxStyles = {styles.dropDown}
                        dropdownStyles = {{backgroundColor:'white'}}
                        badgeStyles = {styles.badgeStyle}
                        maxHeight = {270}
                        save = 'value'
                        search = {false}
                        label = "Hair Options"
                        placeholder = "Hair Options"
                        onSelect = {() => handleHairSelection(selected) }
                    />
                </View>

                <Text style = {styles.objectTitle}>Select Preferred Days:</Text>

                {/*Basic calendar implementation. Currently logs selected dates to the console and highlights them.*/
                /*Setting disabled to true will disable the higlighting feature.*/}
                <View style = {[styles.dummyCalendar, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <MyCalendar pageName='setUpAppoint1' onDatesSelected={handleDatesSelected} disabled={false}/>
                </View>

                {/*appointment button no functionality yet*/}
                <View style = {styles.appointmentButton}>
                  <Pressable
                    style = {({ pressed }) => [{ backgroundColor: pressed ? '#C154C1' : '#BE42B2'}, styles.appointButtonText ]}>
                        {({ pressed }) => (<Text style = {styles.appointButtonText}>Schedule Appointment</Text>)}
                  </Pressable>
                </View>

            </View>
            </LinearGradient>

          </View>
        </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    container:{
        borderRadius: 90
    },
    // title styling for dropdown menu and calendar 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    // temporary dummy drop down
    dropDown: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 10,
        //paddingBottom: 10,
        //paddingRight: 150,
        //paddingLeft: 100,
        padding: 100
    },
    // temporary dummy calendar
    dummyCalendar: {
        backgroundColor: 'white',
        margin: 15,
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 50,
        paddingRight: 50,
    },
    // background under logo image
    background: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        borderRadius: 30
    },
    // logo image
    logo: {
        width: 435,
        height: 250,
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
    // backButton style
    backButton: {
        width: 100,
        height: 65,
        paddingLeft: 20,
        paddingTop: 10,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    // backButton text style
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    // schedule appointment button style
    appointmentButton: {
        width: 350,
        height: 65,
        paddingTop: 20,
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        //alignItems: 'center'
    },
    // schedule appointment button text style
    appointButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,

    },
    badgeStyle: {
        textAlign: 'center',
        backgroundColor: '#C154C1',
    }
})