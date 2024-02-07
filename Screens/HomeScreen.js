//import * as React from 'react';
import {useEffect, useState} from "react";
import {FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FadeInView} from '../effects/FadeinView'
import Foundation from "react-native-vector-icons/Foundation";

const iconSize = 28;
const image = '../assets/images/CocktailBG.jpg'
const CocktailMaker = ({name, pic, id, navigation}) => (


    <View style={styles.container}>
        <FadeInView>


            <Pressable onPress={() =>

                navigation.navigate('Details', {id: id})}>
                <Image style={styles.pic}
                       source={{uri: pic}}

                />

            </Pressable>
            <View style={styles.optionsLine}>
                <Text style={styles.plainText}>{name}</Text>
                <Pressable onPress={() =>

                    navigation.navigate("Fav", {id: id})}>


                    <Foundation style={styles.navPic} name="star" color='black' size={iconSize}/></Pressable>

            </View>
        </FadeInView>
    </View>
)


export default function HomeScreen({navigation}) {

    console.log("in the HomeScreen")
    let [Cocktails, setCocktails] = useState([]);


    useEffect(() => {
        console.log("useeffect update")
        getCockAPI();

    }, [])


    function getCockAPI() {
        console.log('coucou')


        console.log('getAPI')

        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }

                const json = await response.json();
                console.log(json)
                setCocktails(json.drinks)


            }).catch(e => {
            console.log('erreur : ', e);

        })


    }


    /*    *****************************************************************
        ****************************************************************
        ******************************************************************/

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.upContainer}>
                        <Image style={styles.titlePic} source={require('../assets/images/glass2.jpg')}></Image>
                        <Text style={styles.mainTitle}>  DRINK  MAKER</Text>
                        <Text style={styles.title}>Touch any picture for details</Text>
                    </View>

                    <FlatList onEndReached={getCockAPI}
                              onEndReachedThreshold={0.5}

                              data={Cocktails}
                              renderItem={({item}) =>
                                  <CocktailMaker name={item.strDrink} pic={item.strDrinkThumb} id={item.idDrink}
                                                 navigation={navigation}/>
                              }
                              keyExtractor={item => item.idDrink}
                    />

                </View>
            </ImageBackground>

        </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 50,
        backgroundColor: 'rgba(95, 158, 160, 0.7)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'column',
        // marginTop: 40,
        // marginVertical: 5,
        // marginHorizontal: 5,
        // borderRadius: 20,
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',


    },
    upContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 50,
        backgroundColor: 'rgba(95, 158, 160, 0.5)',
        // height: 280,
        width: 280,
        padding: 5,
        marginHorizontal: 15

    },
    mainTitle: {
        fontWeight: 'bold',
        color: 'antiquewhite',
        fontSize: 30,
        marginTop: 25,
        marginBottom: 3
    },

    title: {
        fontSize: 20,
        color: 'antiquewhite',
        paddingBottom: 10
    },
    titlePic: {
        height: 70,
        width: 70,
        borderRadius: 50,
        padding: 15,
        marginTop: 30,
        marginBottom: -80

    },
    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 15,


    },
    navPic: {

        alignSelf: 'flex-end',
        height: 25,
        width: 25,
    },

    optionsLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15

    },
    plainText: {

        fontWeight: 'bold',
        fontStyle: 'italic',
        marginHorizontal: 5

    }
})
