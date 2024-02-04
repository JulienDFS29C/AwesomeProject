import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {FadeInView} from '../effects/FadeinView'




const AlphaCocktailMaker = ({name, pic, id, navigation}) => (


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

const AlphaStack = createNativeStackNavigator();


export default function TenRandomScreen({navigation}) {

    let [TenRandomCocktails, setTenRandomCocktails] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const refreshRandom = getRandomAPI();

            return () => refreshRandom;
        }, [navigation])
    );


    console.log("in the Random")


    useEffect(() => {
        console.log("useeffect update")
        getRandomAPI();

    }, [useFocusEffect])


    function getRandomAPI() {


        console.log('getRandomApi')


        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }

                const json = await response.json();
                console.log(json)
                setTenRandomCocktails(json.drinks)


            }).catch(e => {
            console.log('erreur : ', e);

        })

    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Pressable onPress={() =>

                    navigation.goBack()}><Text>Retour</Text></Pressable>

                <FlatList
                    data={TenRandomCocktails}
                    renderItem={({item}) =>
                        <AlphaCocktailMaker name={item.strDrink} pic={item.strDrinkThumb}
                                            id={item.idDrink} navigation={navigation}/>
                    }
                    keyExtractor={item => item.idDrink}
                />


            </View>


        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: 40,
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

        }
    }
)

