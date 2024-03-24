import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import firebase from './Firebase';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

//Declaring Window as a global variable to be accessed
declare global {
    interface Window { // ⚠️ notice that "Window" is capitalized here
      RecaptchaVerifier: any;
    }
  }
  
export default function newClientInfo_AdminView({ navigation }){

    //Variables to set customer info

    //This userID is temporary right now as there is no feature to bring the userID over from the previous page yet.
    //Need this to be changed later!!!!*************
    let userID = 3;

    const [editingContactInfo, setEditingContactInfo] = useState(false);
    const [custName, setCustName] = useState('');
    const [custNumber, setCustNumber] = useState('');
    const [custEmail, setCustEmail] = useState('');
    const [custAddress, setCustAddress] = useState('');

    const [editingPreferences, setEditingPreferences] = useState(false);
    const [custServices, setCustServices] = useState('');
    const [custNotes, setCustNotes] = useState('');

    const auth = getAuth(firebase);
    auth.languageCode = 'en';

    //Toggles the edit permissions for the contact info box
    const toggleEditContactInfo = () => {
        setEditingContactInfo(prevState => !prevState);
      };
    
      //Toggles the edit permissions for the preferences info box
      const toggleEditPreferences = () => {
        setEditingPreferences(prevState => !prevState);
      };
    
      //Saves the information by setting the editing flag to false
      const saveChanges = () => {
        // Here you can implement logic to save changes to the database
        setEditingContactInfo(false); // After saving, switch back to view mode
        setEditingPreferences(false); // After saving, switch back to view mode
      };

    const database = axios.create({
        //baseURL: 'http://10.0.0.192:3000', //Andrew pc local
        //baseURL: 'http://192.168.1.150:3000', //Chris pc local
        //baseURL: 'http://10.0.0.133:3000',
        baseURL: 'http://10.0.0.14:3000', //Cameron pc local
    })

    //this function gets the client info based on the UserID that is passed in to this page
    async function getClientInfo()
    {
        //queries the database for the regular client view because this part gets the clients name, email, and phone number
        //all clients new and current should have these in the database. This is all based on the UserID up above
        let clientData;
        let response = await database.get('/queryClientViewWithID', {
            params: {
                UserID: userID
            }
        });
        clientData = response.data;

        //formatting the clients name and sets it along with the email and phone number of the client
        let clientName = clientData[0].FirstName + " " + clientData[0].LastName;
        setCustName(clientName);
        setCustEmail(clientData[0].Email);
        setCustNumber(clientData[0].PhoneNumber);
        
        //the next one queries the current client View for the rest of the entries on the page, based on the userID above
        let response2 = await database.get('/queryCurrentClientViewWithID', {
            params: {
                UserID: userID
            }
        });
        let clientData2 = response2.data;

        //this if Statement checks to see if there is any data given back from the current client view query. If there is
        //then that means that the client is a current client and has the necessary information to fill out the remaining fields.
        //if the query comes back empty it means that the client being searched for is not in the current client view and is 
        //therefore a new client. if that is the case then it fills the remaining fields with "New Client, Space is Blank"
        if(clientData2 != null)
        {
            //formatting the address of the client and setting it along with the clients notes
            let clientAddress = clientData2[0].Street + " " + clientData2[0].City + ", " + clientData2[0].StateAbbreviation + ", " + clientData2[0].Zip;
            setCustAddress(clientAddress);
            setCustNotes(clientData2[0].ClientNotes);

            //the last query gets the services wanted. Since we know the client is in the current client view in this block of the code
            //they should have entered in their preferred services when being made a current client. 
            let response3 = await database.get('/queryServicesWantedWithID', {
                params: {
                    UserID: userID
                }
            });
            let clientServices = response3.data;

            //formats the preferred services. This block really only matters if there is more than one preferred service
            //it will look the same for everyone who has just one preferred service
            let prefServices = "";
            for(let i = 0; i < clientServices.length; i++)
            {
                prefServices = prefServices + clientServices[i].ServiceName + "\n"
            }

            //sets the clients services
            setCustServices(prefServices);
        }
        else
        {
            //if the client being searched for is not a current client they will not have the necessary data to fill out the remaining
            //fields so this is the place holder text
            setCustAddress("New Client, Space is Blank");
            setCustServices("New Client, Space is Blank");
            setCustNotes("New Client, Space is Blank");
        }

    }

    useEffect(() => {
        getClientInfo();
    }, [])

    return (
        <View >
          <ScrollView>
            
            <LinearGradient
              locations = {[0.7, 1]}
              colors = {['#EB73C9', 'white']}
              style = {styles.background}
             >

                <View>
                    <Text >{'\n'}</Text>
                </View>
                <View style = {styles.titleBox}>
                    <Text style = {styles.clientNameTitle}>{custName}</Text>
                </View>
                <View>
                    <Text >{'\n'}</Text>
                </View>

                {/*Edit button and title*/}
                <View style={styles.inlineLayout}>
                    <Text style={styles.objectTitle}>Contact Info</Text>
                    <TouchableOpacity
                    style={styles.editButton}
                    onPress={editingContactInfo ? saveChanges : toggleEditContactInfo}
                    >
                    <Text style={styles.editButtonText}>{editingContactInfo ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>

                {/*Client Info Box*/}
                <View style={[styles.clientBox, styles.container]}>
                    <Text style={styles.clientTilteText}>Email</Text>
                    {editingContactInfo ? (
                        <TextInput
                            style={styles.clientTextInput}
                            value={custEmail}
                            onChangeText={setCustEmail}
                        />
                    ) : (
                    <Text style={styles.clientText}>{custEmail}</Text>
                    )}
                    <Text>{'\n'}</Text>
                    <Text style={styles.clientTilteText}>Phone Number</Text>
                    {editingContactInfo ? (
                        <TextInput
                            style={styles.clientTextInput}
                            value={custNumber}
                            onChangeText={setCustNumber}
                        />
                    ) : (
                    <Text style={styles.clientText}>{custNumber}</Text>
                    )}
                        <Text>{'\n'}</Text>
                        <Text style={styles.clientTilteText}>Address</Text>
                    {editingContactInfo ? (
                        <TextInput
                            style={styles.clientTextInput}
                            value={custAddress}
                            onChangeText={setCustAddress}
                        />
                    ) : (
                    <Text style={styles.clientText}>{custAddress}</Text>
                    )}
                </View>
                <View>
                    <Text>{'\n'}</Text>
                </View>

                {/* Edit button and title for Preferences */}
                <View style={styles.inlineLayout}>
                <Text style={styles.objectTitle}>Preferences</Text>
                <TouchableOpacity
                style={styles.editButton}
                onPress={toggleEditPreferences}
                >
                <Text style={styles.editButtonText}>{editingPreferences ? 'Save' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>

                {/* Client Info Box for Preferences */}
            <View style={[styles.clientBox, styles.container]}>
                <Text style={styles.clientTilteText}>Preferred Services</Text>
                {editingPreferences ? (
                <TextInput
                    style={styles.clientTextInput}
                    value={custServices}
                    onChangeText={setCustServices}
                    multiline={true}
                />
                ) : (
                <Text style={styles.clientText}>{custServices}</Text>
                )}
                <Text>{'\n'}</Text>
                <Text style={styles.clientTilteText}>Notes</Text>
                {editingPreferences ? (
                <TextInput
                    style={styles.clientTextInput}
                    value={custNotes}
                    onChangeText={setCustNotes}
                    multiline={true}
                />
                ) : (
                <Text style={styles.clientText}>{custNotes}</Text>
                )}
            </View>

            </LinearGradient>
             
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //borderRadius: 90,
        //justifyContent: 'flex-start'
    },
    // title styling 
    objectTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        paddingBottom: 10
    },
    // background under logo image
    background: {
        paddingBottom: 200,
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
    // client text info
    clientText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },

    clientTextInput: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 18
    },
    // titles for client text info
    clientTilteText: {
        color: '#942989',
        fontWeight: 'bold',
        fontSize: 18
    },
    // white appointment block
    clientBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        flexDirection: 'column',
        alignItems: 'flex-start',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
    },
    // Submit button style
    titleBox: {
        width: 350, //
        height: 100, //
        paddingTop: 30,
        backgroundColor: '#942989',
        borderRadius: 20,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
    },
    // Client Name 
    clientNameTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
        //marginTop: 25
    },
    // Edit Button text
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    // Edit Button
    editButton: {
        width: 65, 
        height: 40, 
        paddingTop: 12,
        marginBottom: 20,
        marginLeft: 'auto',//25,
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
    //Unused for now. Was too glitchy. Was going to use to change save button color
    saveButton: {
        backgroundColor: 'green',
    },
    // to split title and edit button on one line
    inlineLayout: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10,
    }
})