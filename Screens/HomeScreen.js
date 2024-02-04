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
        <Text>{name}</Text>
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

        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/popular.php`)

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


                <FlatList

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
        backgroundColor: 'mistyrose',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 40,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 20,
    },

    title: {
        fontSize: 20,
        color: 'black',
        paddingBottom: 10
    },

    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,

    },
})
