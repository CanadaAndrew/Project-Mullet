import { StyleSheet, Text, View, Pressable, ScrollView, Button, Touchable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';
  
export default function modifyClientInfo() {

    //for the drop down list below
    const [selected, setSelected] = React.useState("All");

    const filter = [
        {key: 'Sort by Descending', value: 'Sort by Descending'},
        {key: 'Sort by Aescending', value: 'Sort by Aescending'},
    ]

    const dummyAtoEClients = ['Adam', 'Amy', 'Alex','Bob', 'Diana', 'Eve'];
    const dummyFtoJClients = ['Fred', 'Hannah', 'Harold', 'Jim'];
    const dummyKtoOClients = ['Logan', 'Michael', 'Melissa', 'Olivia'];
    const dummyPtoTClients = ['Peter', 'Rose', 'Sarah', 'Sam'];
    const dummyUtoZClients = ['Vanessa', 'Victor', 'Will', 'Emma', 'Yara'];


    return (
        
        <View style = {styles.container}> 
          <ScrollView>
            <View>
        

            <LinearGradient 
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
             >

                {/*tile*/}
                <View>
                   <Text >{'\n'}</Text>
                </View>
                 <Text style = {styles.objectTitle}>Client List</Text>

                {/*I believe redirect to modify client info search page if admin does not want to 
                search for client manually in this page*/}
                <View>
                    <TouchableOpacity
                      style = {styles.searchButton}
                    >
                    <Text style = {styles.searchButtonText}>Search Client List</Text>
                    </TouchableOpacity>
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
                    defaultOption = {{key: 'Sort by Descending', value: 'Sort by Descending'}}
                />
            </View>


            {/*A-E names */}
            <Text style = {styles.Title}>Names from A to E</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyAtoEClients}
                       renderItem = {({item}) => (
                        <View>
                            <Pressable
                              style={styles.nameButton}
                              children = {({pressed}) => (
                                <Text style={[styles.boxText,{ color: pressed ? 'red' : 'black'}]}>
                                     {item}
                                </Text>
                              )}
                            />
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View>

            {/*F-J names */}
            <Text style = {styles.Title}>Names from F to J</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyFtoJClients}
                       renderItem = {({item}) => (
                        <View>
                            <Pressable
                              style={styles.nameButton}
                              children = {({pressed}) => (
                                <Text style={[styles.boxText,{ color: pressed ? 'red' : 'black'}]}>
                                     {item}
                                </Text>
                              )}
                            />
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View>

            {/*K-O names */}
            <Text style = {styles.Title}>Names from K to 0</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyKtoOClients}
                       renderItem = {({item}) => (
                        <View>
                            <Pressable
                              style={styles.nameButton}
                              children = {({pressed}) => (
                                <Text style={[styles.boxText,{ color: pressed ? 'red' : 'black'}]}>
                                     {item}
                                </Text>
                              )}
                            />
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View>

            {/*P-T names */}
            <Text style = {styles.Title}>Names from P to T</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyPtoTClients}
                       renderItem = {({item}) => (
                        <View>
                            <Pressable
                              style={styles.nameButton}
                              children = {({pressed}) => (
                                <Text style={[styles.boxText,{ color: pressed ? 'red' : 'black'}]}>
                                     {item}
                                </Text>
                              )}
                            />
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View>

            {/*U-Z names */}
            <Text style = {styles.Title}>Names from U to Z</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyUtoZClients}
                       renderItem = {({item}) => (
                        <View>
                            <Pressable
                              style={styles.nameButton}
                              children = {({pressed}) => (
                                <Text style={[styles.boxText,{ color: pressed ? 'red' : 'black'}]}>
                                     {item}
                                </Text>
                              )}
                            />
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View>

            {/*
            <Text style = {styles.Title}>Names beginning with D</Text>
                <View style = {[styles.clientBox, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                    <FlatList
                       style = {styles.flatList}
                       data = {dummyDClients}
                       renderItem = {({item}) => (
                        <View>
                            <TouchableOpacity
                                 style={styles.nameButton}>
                                <Text style = {styles.boxText}>{item}</Text>
                            </TouchableOpacity>
                            <View style = {styles.boxLine}></View>
                        </View>
                       )}
                    />
                </View> */}

             </LinearGradient>
             </View>
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 90
    },
    // title styling 
    objectTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    // Title text
    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    // background
    background: {
        paddingBottom: 250,
        alignItems: 'center',
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
    // search button style
    searchButton: {
        width: 350, //
        height: 50, //
        paddingTop: 15,
        margin: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: '#BE42B2',
        borderRadius: 20,
    },
    // search button text style
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 20,
    },
    // white appointment block
    clientBox: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    //dropdown menu styles
    dropdowncont: {
        padding: 15
    },
    flatList: {
        height: 150,
        width: 200,
        flexGrow: 0
    },
    // show button text style
    boxText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    boxLine: {
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    nameButton: {
        padding: 10,
    },
})