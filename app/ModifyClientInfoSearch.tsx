import { StyleSheet, Text, TextInput, View, ScrollView, FlatList, TouchableOpacity, Dimensions, SafeAreaView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

export default function ModifyClientInfoSearch() {

    const windowDimensions = Dimensions.get('window')

    //server connection                                 //***do we need a server connection?***
    const database = axios.create({
        baseURL: 'http://hair-done-wright530.azurewebsites.net', //Azure server
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
    });

    const [nameInput, newNameInput] = React.useState('');
    const dummyClients = ['John Seed', 'John Smith', 'John Taylor', 'John Zimmer', 'name5', 'name6', 'name7', 'name8', 'name9', 'name10', 'name11', 'name12', 'name13', 'name14', 'name15'];
    function filterNames(){

    }

    return (
        <SafeAreaView>
            <ScrollView>
                <LinearGradient
                    locations={[0.7, 1]}
                    colors={['#EB73C9', 'white']}
                    //style={{ width: windowDimensions.width, height: windowDimensions.height - 85 }}
                    style={{ width: useWindowDimensions().width, height: useWindowDimensions().height - 85 }}
                >
                    <View style={styles.container}>
                        <View style={[styles.searchBarContainer, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                            <TextInput
                                style={styles.textField}
                                value={nameInput}
                                onChangeText={newNameInput}
                                onTextInput={() => filterNames()}
                                placeholder="Search"
                            />
                        </View>
                        <View style={[styles.nameContainer, styles.boxShadowIOS, styles.boxShadowAndroid]}>
                            <FlatList
                                data={dummyClients}
                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity
                                            style={styles.nameButton}>
                                            <Text style={styles.nameText}>{item}</Text>
                                        </TouchableOpacity>
                                        <View style = {styles.nameLine}></View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        rowGap: 10,
        paddingVertical: 30
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
        elevation: 5
    },

    // search bar
    searchBarContainer: {
        alignItems: 'center'
    },
    textField: {
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        width: '90%',
        height: 50,
        borderRadius: 15,
        padding: 10,
        fontSize: 20
    },

    // names
    nameContainer: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        rowGap: 10,
        width: useWindowDimensions().width*.9,
        height: useWindowDimensions().height*.7,
    },
    nameButton: {
        padding: 10,
    },
    nameText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left'
    },
    nameLine: {
        borderTopColor: 'black',
        borderTopWidth: 1
    }
})
