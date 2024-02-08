//import * as React from 'react';
import {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CocktailMaker} from "../Components/CocktailMaker";
import { CocktailFetcher } from "../Components/CocktailFetcher";

const image = '../assets/images/CocktailBG.jpg'
const URL = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`;
export default function HomeScreen({navigation}) {


    console.log("in the HomeScreen")
    let [Cocktails, setCocktails] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await CocktailFetcher(URL);
                setCocktails(data);
            } catch (error) {
                console.error('Error fetching cocktail data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, []);



    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.upContainer}>
                        <Image style={styles.titlePic} source={require('../assets/images/glass2.jpg')}></Image>
                        <Text style={styles.mainTitle}> DRINK MAKER</Text>
                        <Text style={styles.title}>Touch any picture for details</Text>
                    </View>
                    {loading ?
                        <ActivityIndicator size="large"/> :
                    <FlatList onEndReached={CocktailFetcher}
                              onEndReachedThreshold={0.5}

                              data={Cocktails}
                              renderItem={({item}) =>
                                  <CocktailMaker name={item.strDrink} pic={item.strDrinkThumb} id={item.idDrink}
                                                 navigation={navigation}/>
                              }
                              keyExtractor={item => item.idDrink}
                    />
                    }
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
