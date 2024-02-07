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
            <View style={styles.optionsLine}>
                <Text>{name}</Text>
                <Pressable onPress={() =>

                    navigation.navigate("Fav", {id: id})}>


                    <Image style={styles.navPic} source={require('../assets/images/FavStar.png')}></Image></Pressable>
            </View>

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

                <Text style={styles.mainTitle}> 10 RANDOM COCKTAILS</Text>
                <Text style={styles.title}>Touch any picture for details</Text>

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

        pic: {
            height: 250,
            width: 250,
            borderRadius: 20,
            padding: 5,

        },

        optionsLine: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        navPic: {

            alignSelf: 'flex-end',
            height: 25,
            width: 25,
        },

    }
)

