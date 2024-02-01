import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import * as Location from 'expo-location';


const ThatDateItem = ({id, name, pic, temp,  hours}) => (


    <View style={styles.item}>

            <Text style={styles.oneDay}>{name}{'  '}</Text>
            <Text style={styles.oneDay}>{hours}:00 : {'  '}</Text>
            <Text style={styles.oneDay}>{temp}°C</Text>
            <Image style={styles.tinyLogoFC}
                   source={{uri: pic}}
            />

    </View>

)

/*
*******START*******
*/

function App() {

    const [loc, setLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let [WData, setWData] = useState({});
    let [FData, setFData] = useState({});
    let [DateCollection, setDateCollection] = useState([]);


    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20
    const backImage = isDayTime ? require("./assets/day.jpg")
        : require("./assets/night.jpg")

    const textColor = isDayTime ? "black"
        : "antiquewhite"

    // const backImageWhite = require("./assets/white-texture-background.jpg")
    const API_KEY = '322270ae0aaaf6c97a4832d8c66fb1ef'
    let latitude = loc?.coords?.latitude;
    let longitude = loc?.coords?.longitude;
    let API_W_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    let API_F_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    let thatDate = [];


    useEffect(() => {
        console.log("useeffect update with loc value :", loc)
        loc != null && getApiWData();
        loc != null && getApiFData();
    }, [loc])


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
            getApiWData();
            getApiFData()


            ;
        })();
    }, [])


    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (loc) {
        text = JSON.stringify(loc);

    }


    /*
        *********FETCH*********
    */

    function getApiWData() {

        console.log('getApiWData')
        console.log(API_W_URL)

        fetch(API_W_URL)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données weather trouvées');
                }

                const json = await response.json();
                console.log(json);
                setWData(json);
            }).catch(e => {
            console.log(API_W_URL);
            console.log('erreur : ', e);
        })
    }

    function getApiFData() {

        fetch(API_F_URL)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données forecast trouvées');
                }

                const json = await response.json();
                setFData(json);
                console.log(FData);
                console.log(" IMAGE !!!!!!!!!!!!!!!! " + DateCollection[0].pic)


            }).catch(e => {

            console.log('erreur : ', e);
        })
    }

    /*
        ******** 3 HEURES*******
    */

    useEffect(() => {
        for (let i = 0; i < 40; i++) {

            let day = new Date(FData?.list?.[i].dt_txt).getDay()

            switch (day) {
                case 0 : day = "Sunday"
                    break
                case 1 : day = "Monday"
                    break
                case 2 : day = "Tuesday"
                    break
                case 3 : day = "Wednesday"
                    break
                case 4 : day = "Thursday"
                    break
                case 5 : day = "Friday"
                    break
                case 6 : day = "Saturday"
                    break
                default : day = "Soon"
                    break
            }

            thatDate.push({
                id: i,
                name: day ?? 'LOADING',
                hours: new Date(FData?.list?.[i].dt_txt).getHours() ?? 'LOADING',
                pic: `https://openweathermap.org/img/wn/${FData.list?.[i]?.weather?.[0].icon}@2x.png`,
                temp: Math.floor(FData?.list?.[i].main?.temp),
            })


        }

        setDateCollection(thatDate)

    }, [FData])


    let tempCelsius = WData?.main?.temp ?? "chargement température"/*Math.round(WData?.main.temp)*/
    let name = WData?.name ?? 'Chargement...';
    let description = WData.weather?.[0]?.description ?? 'Chargement...';
    let imageUrl = `https://openweathermap.org/img/wn/${WData.weather?.[0]?.icon}@2x.png`


    if (FData)
        return (
            <SafeAreaView>

                <ImageBackground source={backImage} resizeMode="cover">
                    <ScrollView horizontal={true}
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollView}>
                        {/*
              ****** UPPERFRAME ******
*/}

                        <View style={styles.container}>

                            <View style={styles.upper}>

                                <Text style={styles.mainText}>
                                    <Text
                                        style={{color: textColor}}>{name} {"\n"}{description}{"\n"}{"\n"}{tempCelsius}°C {"\n"}</Text>
                                </Text>

                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: imageUrl,
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    <ScrollView stickyHeaderIndices={[1]}
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollView}>
                        {/*
              ********SCROLLFRAME*******
*/}
                        {/*<ImageBackground source={backImageWhite} resizeMode="cover" >*/}
                        <View>


                                <FlatList
                                    colorSetter={textColor}
                                    data={DateCollection}
                                    renderItem={({item}) => <ThatDateItem name={item.name} pic={item.pic}
                                                                          temp={item.temp}
                                                                          style={styles.test}
                                                                          hours={item.hours}/>}
                                                                          textColor={textColor}
                                    keyExtractor={item => item.id}
                                    horizontal={false}
                                    contentContainerStyle={styles.containerStyle}
                                />

                            </View>
                        {/*</ImageBackground>*/}
                    </ScrollView>
                </ImageBackground>

            </SafeAreaView>
        );

}


const styles = StyleSheet.create({


    container: {
        flex: 1,
    },

    scrollView: {
        marginHorizontal: 10,

    },


    upper: {
        display: 'bloc',
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,

    },

    tinyLogo: {
        justifyContent: 'center',
        margin: -40,
        width: 150,
        height: 150
    },
    tinyLogoFC: {
        alignItems: 'center',

        width: 50,
        height: 50,
    },
    oneDay: {
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        color:'lightgoldenrodyellow',
        fontWeight : 'bold'


    },

    containerStyle:{
        flexGrow: 1, justifyContent: 'center',
        flexDirection :'column'

    },


    item: {
        backgroundColor: 'rgba(5150, 255, 255, 0.3)',
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",



    },

    forecastZone: {

        fontSize: 25,
        marginVertical: 10,
        alignItems : 'center',
        fontWeight: 'bold',
        justifyContent: 'space-evenly',



    },



});

export default App;
