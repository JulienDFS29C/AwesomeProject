import {FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {FadeInView} from "../effects/FadeinView";
import {useRoute} from "@react-navigation/native";
import Foundation from "react-native-vector-icons/Foundation";

const iconSize = 28;
const image = '../assets/images/CocktailBG.jpg'

export function NameSearchScreen({navigation}) {

    const route = useRoute();
    let {name} = route.params;

    let [CockailByName, setCockailByName] = useState([])


    const CocktailMakerByName = ({name, pic, navigation, id}) => (


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


    useEffect(() => {
        console.log("useEffect update avec name: ", name);
        getByName();
    }, [name]);


    function getByName() {
        console.log('By Ingredient');
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }
                console.log(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${name}`)
                const json = await response.json();
                console.log("IDIND = " + json)

                setCockailByName(json.drinks)
                console.log("données settées :" + CockailByName)
                console.log(json.drinks)

            }).catch(e => {
            console.log('erreur : ', e);

        })

    }


    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.upContainer}>
                            <Text style={styles.mainTitle}>Result for {name} :</Text>
                            <Text style={styles.title}>(Touch any picture for details)</Text>
                        </View>


                        <Pressable onPress={() =>

                            navigation.goBack()}>
                            <Image style={styles.backPic}
                                   source={require('../assets/images/go-previous.png')}></Image></Pressable>

                        <FlatList
                            data={CockailByName}
                            renderItem={({item}) => (
                                <CocktailMakerByName
                                    name={item.strDrink}
                                    pic={item.strDrinkThumb}
                                    id={item.idDrink}
                                    navigation={navigation}
                                />
                            )}
                            keyExtractor={item => item.idDrink}
                        />

                    </View></View>
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
    backPic: {

        height: 25,
        width: 25,
        marginTop: 15,
        marginRight: 300,
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

    },
})
