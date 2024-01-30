import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image,StyleSheet, Text, View} from 'react-native';

import * as Location from 'expo-location';

 function App() {

    const [loc, setLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let [WData, setWData] = useState({});

    let latitude = loc?.coords?.latitude;
    let longitude = loc?.coords?.longitude;

    const API_KEY = '886705b4c1182eb1c69f28eb8c520e20'
    // let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;



     useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLoc(location);
            console.log(location)
            getApiData();

        })();
    }, [])

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (loc) {
        text = JSON.stringify(loc);

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
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    fetch(API_URL)
        .then(async response => {
            if (!response.ok) {
                throw new Error('pas de données trouvées');
            }

            const json = await response.json();
            console.log(json);
            setWData(json);
        }).catch(e=>{
        console.log(API_URL);
            console.log('erreur : ' , e);
    })
}


     let tempCelsius = Math.round(WData.main.temp)

     let name = WData.name;
     let description = WData.weather?.[0]?.description;
     let imageUrl = `https://openweathermap.org/img/wn/${WData.weather?.[0]?.icon}@2x.png`



     return (
         <View style={styles.container}>
             <Text>{text}</Text>
                <Text>{name}</Text>
                <Text>{description}</Text>
             <Text>{tempCelsius}°C</Text>
             <Image
                 style={styles.tinyLogo}
                 source={{
                     uri: imageUrl,
                 }}
             />
                <Text></Text>

            </View>
        );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100
    }
});

 export default App;
