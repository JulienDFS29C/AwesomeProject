import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import * as Location from 'expo-location';

 function App() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [WData, setWData] = useState(null);

    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;

    const API_KEY = '9cb58d87fbca1bbc43e019ad115b1a9c'
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        getApiData();
        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);

    }


    //******************************************************************************

    // async function getApiData() {
    //     try {
    //         const response = await fetch(API_URL)
    //         const data = await response.json()
    //         console.log(data)
    //         setWData(data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }


function getApiData() {
        console.log(API_URL);
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('pas de données trouvées');
            }

            return response.json()
        .then(json => {
                    console.log(json)
                    setWData(json);

                });
        }).catch(e=>{
        console.log(API_URL);
            console.log('erreur : ' , e);
    })
}


    //******************************************************************************
    // getApiData();
    //     {if (WData != null) {
    //     let temp = Math.round(WData.main.temp)


        return (

            <View style={styles.container}>
                <Text style={styles.paragraph}>{text}</Text>
                <Text style={styles.paragraph}>{WData.name}</Text>

                <Text>{}</Text>
            </View>
        );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, paragraph: undefined

});

 export default App;
