//import * as React from 'react';
import {useEffect, useState} from "react";
import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FadeInView} from '../effects/FadeinView'


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
                <Text>{name}</Text>
                <Pressable onPress={() =>

                    navigation.navigate("Fav", {id: id})}>


                    <Image style={styles.navPic} source={require('../assets/images/FavStar.png')}></Image></Pressable>
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={styles.mainTitle}>THE INFINITE BAR</Text>

                <Image style={styles.titlePic} source={require('../assets/images/glass.jpg')}></Image>
                <Text style={styles.title}>Touch any picture for details</Text>


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
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cadetblue',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 40,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    mainTitle: {
        fontWeight: 'bold',
        color: 'antiquewhite',
        fontSize: 25,
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
        marginVertical: 25

    },
    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,

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
    }
})
