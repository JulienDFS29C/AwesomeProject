import React, {useEffect, useState} from 'react';
import {FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import * as Location from 'expo-location';
import backImage from "./assets/day.jpg";





const ThatDateItem = ({id, name, pic, temp, description, hours})=> (



    <View>
<Text style={styles.forecastZone}><Text >
        <Text >{name}{'  '}</Text>
        <Text >{hours}:00 : {'  '}</Text>
        <Text>{description}</Text>
        <Text>{temp}°C</Text>
        <Image style={styles.tinyLogoFC}
            source={{uri : pic}}
        />
    </Text></Text>
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

    const textColor = isDayTime ? "darkblue"
        : "antiquewhite"

const backImageWhite = require("./assets/white-texture-background.jpg")
    const API_KEY = '322270ae0aaaf6c97a4832d8c66fb1ef'
     let latitude = loc?.coords?.latitude;
     let longitude = loc?.coords?.longitude;
     let API_W_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

     let API_F_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    let thatDate = [];


     useEffect(() => {
console.log("useeffect update with loc value :", loc)
        loc != null  &&  getApiWData();
         loc != null  &&  getApiFData();
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
        }).catch(e=>{
        console.log(API_W_URL);
            console.log('erreur : ' , e);
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


             }).catch(e=>{

             console.log('erreur : ' , e);
         })
     }

/*
    ******** 3 HEURES*******
*/

    useEffect(() => {
        for (let i = 0; i < 40; i++) {

            let day = new Date(FData?.list?.[i].dt_txt).getDay()

            switch (day) {
                case 1 :
                    day = "Monday"
                    break
                case 2 :
                    day = "Tuesday"
                    break
                case 3 :
                    day = "Wednesday"
                    break
                case 4 :
                    day = "Thursday"
                    break
                case 5 :
                    day = "Friday"
                    break
                case 6 :
                    day = "Saturday"
                    break
                case 7 :
                    day = "Sunday"
                    break
                default :
                    day = "Soon"
                    break
            }

            thatDate.push({
                id: i,
                name: day  ?? 'LOADING',
                hours: new Date(FData?.list?.[i].dt_txt).getHours(),
                pic: `https://openweathermap.org/img/wn/${FData.list?.[i]?.weather?.[0].icon}@2x.png`,
                temp: Math.floor(FData?.list?.[i].main?.temp),
                description: FData?.list?.[i].weather?.[0]?.main?.description
            })


        }

        setDateCollection(thatDate)

    },[FData])


     let tempCelsius = WData?.main?.temp?? "chargement température"/*Math.round(WData?.main.temp)*/
     let name = WData?.name ?? 'Chargement...';
     let description = WData.weather?.[0]?.description?? 'Chargement...';
     let imageUrl = `https://openweathermap.org/img/wn/${WData.weather?.[0]?.icon}@2x.png`




    return (
<SafeAreaView >

              <ImageBackground source={backImage} resizeMode="cover">
                  <ScrollView stickyHeaderIndices={[0]}
                              showsVerticalScrollIndicator={false}
                              style={styles.scrollView}>
{/*
              ****** UPPERFRAME ******
*/}

          <View style={styles.container}>



          <View style={styles.upper}>

             <Text style={styles.mainText}>
                <Text style={{color: textColor}}>{name} {"\n"}{description}{"\n"}{"\n"}{tempCelsius}°C {"\n"}</Text>
          </Text>

             <Image
                 style={styles.tinyLogo}
                 source={{
                     uri: imageUrl,
                 }}
             />
          </View>
            </View>

{/*
              ********SCROLLFRAME*******
*/}
            {/*<ImageBackground source={backImageWhite} resizeMode="cover" >*/}
                      <View style={styles.item}>
            <Text style={styles.itemCalque}>

                 <FlatList

                     colorSetter={textColor}
                     data={DateCollection}
                     renderItem={({item}) => <ThatDateItem name={item.name} pic={item.pic} temp={item.temp} description={item.description} hours={item.hours}/>}
                     keyExtractor={item => item.id}
                     horizontal='true'
                 />


             </Text></View>
           {/*</ImageBackground>*/}
              </ScrollView>
              </ImageBackground>


</SafeAreaView>
        );

}



const styles = StyleSheet.create({




    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
flex: 1,

    },
    scrollView: {
        marginHorizontal: 10,

    },


    upper:{
        display : 'flex',
        flexDirection : 'row',
        marginTop : 50,
        marginBottom : 20,
        marginHorizontal: 10,
    },
mainText:{
  fontSize : 25,
    textAlign : 'center',
    padding : 5,

},

    tinyLogo: {
        justifyContent: 'center',
        margin : -30,
        width: 200,
        height: 200
    },
    tinyLogoFC: {
        alignItems: 'center',

        width: 50,
        height: 50,
    },
    oneDay:{
        fontSize: 24,
        textAlign: 'center',
        margin: 3,
    },
    itemCalque:{



    },
    item: {
        backgroundColor: 'rgba(5150, 255, 255, 0.3)',
        width : '100%',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly",

    },

    forecastZone:{
       flexDirection: "row",
       fontSize : 25,
        fontWeight :'bold',
        justifyContent: 'space-evenly',



    },

});

 export default App;
