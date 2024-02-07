import {FlatList, Image, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {FadeInView} from "../effects/FadeinView";
import Foundation from "react-native-vector-icons/Foundation";


export function FavoritesScreen({navigation}) {

    const [favorites, setFavorites] = useState([]);
    const route = useRoute();
    let id = route.params ? route.params.id : null;
    const iconSize = 28
    const image = '../assets/images/CocktailBG.jpg'


    const removeFav = (idToRemove) => {
        setFavorites((currentFavorites) =>
            currentFavorites.filter(favorite => favorite.idDrink !== idToRemove)
        );
    };


    const FavCocktailMaker = ({name, pic, id}) => (


        <View>
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
                        removeFav(id)
                    }><Foundation style={styles.navPic} name="trash" color='black' size={iconSize}/></Pressable>
                </View>
            </FadeInView>
        </View>
    )


    useEffect(() => {

        if (id) {
            console.log("useEffect update avec ID: ", id);
            getFav();
        }
    }, [id]);


    function getFav() {
        console.log('coucou')
        if (!id) {
            console.log('ID non défini, pas de fetch');
            return;
        }

        console.log('getAPI')

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }

                let json = await response.json();
                console.log("IDIND = " + json)
                const newFavorite = json.drinks[0];


                setFavorites(favorites => {
                    if (favorites.some(favorite => favorite.idDrink === newFavorite.idDrink)) {
                        return favorites;
                    } else {
                        return [...favorites, newFavorite];
                    }
                })
            })
            .catch(e => {
                console.log('erreur : ', e);
            })

    }

    const renderDefaultContent = () => {
        return (
            <View style={styles.defaultContainer}>
                <Text style={styles.defaultText}>No Favorite for now</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                    <View style={styles.upContainer}>
                        <Text style={styles.mainTitle}>YOUR FAVORITES</Text>
                        <Text style={styles.title}>Touch any picture for details</Text>
                        <View>
                            {favorites.length <= 0 ? renderDefaultContent() : (
                                <FlatList

                                    data={favorites}
                                    renderItem={({item}) => <FavCocktailMaker name={item.strDrink}
                                                                              pic={item.strDrinkThumb}
                                                                              id={item.idDrink}
                                                                              navigation={navigation}/>}
                                    keyExtractor={item => item.idDrink}
                                />
                            )}
                        </View></View>
                </ImageBackground></View>
        </SafeAreaView>

    );
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

    }
})
