import {Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {FadeInView} from "../effects/FadeinView";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import Foundation from "react-native-vector-icons/Foundation";

const image = '../assets/images/CocktailBG.jpg'
const iconSize = 28;

export function IngredientLookupScreen({navigation}) {

    const route = useRoute();
    let {ingredient} = route.params;
    let [LookupIngredient, setLookupIngredient] = useState([]);

    useEffect(() => {
        console.log("useeffect update for ingredient :" + ingredient)
        getLookup();

    }, [ingredient])

    function getLookup() {

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }

                const json = await response.json();
                console.log(json)
                setLookupIngredient(json.ingredients)

            }).catch(e => {
            console.log('erreur : ', e);
        })
    }

    const renderDefaultContent = () => {
        return (
            <View style={styles.defaultContainer}>
                <Text style={styles.defaultText}>No result</Text>
            </View>
        );
    };

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {LookupIngredient.length <= 0 ? renderDefaultContent() : (
                            <FadeInView>
                                <View style={styles.container}>


                                    <Pressable onPress={() =>

                                        navigation.goBack()}>
                                        <Foundation style={styles.navPic} name="rewind" color='black' size={iconSize}/></Pressable>

                                    <Image style={styles.pic}
                                           source={{uri: `https://www.thecocktaildb.com/images/ingredients/${LookupIngredient[0].strIngredient}-Medium.png`}}
                                    /><View style={styles.upContainer}>
                                    <Text style={styles.mainTitle}>{LookupIngredient[0].strIngredient}</Text>
                                    <Text style={styles.desc}>{LookupIngredient[0].strDescription}</Text>
                                </View>

                                </View>
                            </FadeInView>
                        )}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    )
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

    desc: {
        fontSize: 16,
        color: 'antiquewhite',
        paddingBottom: 10,

    },

    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,
        alignSelf: "center"

    },
    plainText: {

        fontWeight: 'bold',
        fontStyle: 'italic',
        marginHorizontal: 5

    },
    navPic: {

        alignSelf: 'flex-start',
        height: 25,
        width: 25,
        marginTop: 40,
        marginLeft: 15

    },

})




