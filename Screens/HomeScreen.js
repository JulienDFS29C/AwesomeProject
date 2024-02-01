import * as React from 'react';
import {Button, View, Text, FlatList, StyleSheet, SafeAreaView, Image, ScrollView, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect, useState} from "react";


const CocktailMaker = ({name, pic, id}) => (


    <View style={styles.container}>

            <Image style={styles.pic}

                source= {{uri: pic}}
            />
            <Text>{name}</Text>
    </View>
)


export function HomeScreen({ navigation }) {

    let [Cocktails, setCocktails] = useState([]);
    let cocktailTab = [];



    // useEffect(() => {
    //     console.log("useeffect update")
    //     getCockAPI();
    //
    // }, [])


    function getCockAPI() {

        console.log('getAPI')

              fetch (`https://www.thecocktaildb.com/api/json/v2/9973533/recent.php`)

                .then(async response => {
                    if (!response.ok) {
                        throw new Error('pas de données cocktail trouvées');
                    }

                    const json = await response.json();
                    setCocktails(json)


                }).catch(e => {
                console.log('https://www.thecocktaildb.com/api/json/v2/9973533/recent.php');
                console.log('erreur : ', e);

            })


    }


/*    *****************************************************************
    ****************************************************************
    ******************************************************************/

    return (
        <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />


                <FlatList
                data={Cocktails}
                renderItem={({ item }) =>
                    <CocktailMaker name={item.strDrink} pic={item.strDrinkThumb} id={item.idDrink} />
                }
                keyExtractor={item => item.idDrink}
            />
        </View>


                    </SafeAreaView>)
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginVertical: 8,
        marginHorizontal: 16,
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
