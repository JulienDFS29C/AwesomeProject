import {FlatList, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import Foundation from "react-native-vector-icons/Foundation";
import {CocktailMaker} from "../Components/CocktailMaker";
import {CocktailFetcher} from "../Components/CocktailFetcher";

const iconSize = 28;

export function IngredientSearchScreen({navigation}) {

    const route = useRoute();
    let {ingredient} = route.params;
    const [CockailsByIngredient, setCockailsByIngredient] = useState([])
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const image = '../assets/images/CocktailBG.jpg'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await CocktailFetcher(URL);
                setCockailsByIngredient(data);
            } catch (error) {
                console.error('Error fetching cocktail data:', error.message);
            }
        };
        fetchData();

    }, []);



    const renderDefaultContent = () => {
        return (
            <View style={styles.defaultContainer}>
                <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>

                    <Text style={styles.defaultText}>No Result</Text>
                </ImageBackground>
            </View>
        );
    };

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>


                    <View style={styles.upContainer}>
                        <Text style={styles.title}>Results for :</Text><Text
                        style={styles.mainTitle}>{ingredient}</Text>
                        <Text style={styles.title}>Touch any picture for details</Text>

                        <Pressable onPress={() =>
                            navigation.goBack()}>
                            <Foundation style={styles.navPic} name="rewind" color='black' size={iconSize}/></Pressable></View>
                    {CockailsByIngredient.length <= 0 ? renderDefaultContent() : (

                        <FlatList
                            data={CockailsByIngredient}
                            renderItem={({item}) => (
                                <CocktailMaker
                                    name={item.strDrink}
                                    pic={item.strDrinkThumb}
                                    id={item.idDrink}
                                    navigation={navigation}
                                />
                            )}
                            keyExtractor={item => item.idDrink}
                        />)}
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
    defaultContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    defaultText: {
        backgroundColor: 'antiquewhite',
        borderRadius: 10,

        fontSize: 18,
        padding: 5,
        marginHorizontal: 120,

        color: 'grey',
    },
    plainText: {

        fontWeight: 'bold',
        fontStyle: 'italic',
        marginHorizontal: 5,

    },
})
