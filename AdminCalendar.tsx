import React from 'react';
import {
    SafeAreaView,
    ScrollView,
} from 'react-native';
import ModifyAv from './ModifyAv'

const App = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <ModifyAv/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default App;