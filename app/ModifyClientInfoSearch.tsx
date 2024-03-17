import { StyleSheet, Text, TextInput, View, ScrollView, FlatList, TouchableOpacity, Dimensions, SafeAreaView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import axios from 'axios';

export default function ModifyClientInfoSearch() {

    const windowDimensions = Dimensions.get('window')
    const database = axios.create({
        //baseURL: 'http://10.0.0.119:3000',  // Wilson local
        //baseURL: 'http://10.0.0.192:3000',
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
        baseURL: 'http://10.0.0.14:3000', //Cameron Local
    })

    const [nameInput, newNameInput] = React.useState('');
    const [clientList, setClientList] = React.useState([]);
    const [firstLetterArr, setFirstLetterArr] = React.useState([]);
    const [clientList2, setClientList2] = React.useState([[]]);

    //const dummyClients = ['John Seed', 'John Smith', 'John Taylor', 'John Zimmer', 'name5', 'name6', 'name7', 'name8', 'name9', 'name10', 'name11', 'name12', 'name13', 'name14', 'name15'];
    function filterNames(){

    }

    async function displayClientList()
    {
        let clientNames: string[] = [];
        let tempFirstLetterArr: string[] = [];
        let tempNameArr: string[][] = [];
        let response = await database.get('/queryClients');

        let clientData = response.data;
        let client1;
        //sorts clientData to be in alphabetical order
        clientData.sort((a, b) => a.FirstName.localeCompare(b.FirstName))

        //this loop makes the array of all the first letters in first names to be used to sort the list later.
        for(client1 in clientData)
        {
            let firstLetter = clientData[client1].FirstName[0];
            if(tempFirstLetterArr.find(o => o === firstLetter) == null)
            {
                tempFirstLetterArr.push(firstLetter);
            }
        }

        //loop that makes a string array with only the names of the clients and nothing else.
        let iterable;
        for(iterable in clientData)
        {
            let name = clientData[iterable].FirstName + " " + clientData[iterable].LastName;
            clientNames.push(name);
        }


        let temp: string[] = [];
        //this loop splits clientData up into multiple seperate arrays that have names all beginning with the same letter.
        for(let client2 = 0; client2 < clientNames.length; client2++)
        {
            //if temp is empty
            if(temp.length == 0)
            {
                temp.push(clientNames[client2]);
            }
            else if(clientNames[client2].charAt(0) == clientNames[client2 - 1].charAt(0))
            {
                
                temp.push(clientNames[client2]);
                if(clientNames[client2 + 1] == null)
                {
                    tempNameArr.push(temp);
                    temp.length = 0;
                }
            }
            else if(clientNames[client2].charAt(0) != clientNames[client2 - 1].charAt(0))
            {
                tempNameArr.push(temp);

                temp.length = 0;
                temp.push(clientNames[client2]);
                //detects if it is at the end of the clientNames list. If so then it pushes whatever is in temp to the array of arrays
                //and sets temp to empty
                if(clientNames[client2 + 1] == null)
                {
                    tempNameArr.push(temp);
                    temp.length = 0;
                }
            }
        }
        setFirstLetterArr(tempFirstLetterArr);
        setClientList(clientData);

    }

    useEffect(() => {
        displayClientList();
    }, []);

    return (
        <SafeAreaView>
            
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
                            data={clientList}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity
                                        style={styles.nameButton}>
                                        <Text style={styles.nameText}>{item.FirstName + " " + item.LastName}</Text>
                                    </TouchableOpacity>
                                    <View style = {styles.nameLine}></View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </LinearGradient>
            
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
