import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {FadeInView} from "../effects/FadeinView";


export function FavoritesScreen({navigation}) {

    const [favorites, setFavorites] = useState([]);
    const route = useRoute();
    let id = route.params ? route.params.id : null;


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
                    <Text>{name}</Text>
                    <Pressable onPress={() =>
                        removeFav(id)
                    }>
                        <Image style={styles.navPic}
                               source={require('../assets/images/trash.png')}></Image></Pressable>
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
                <Text style={styles.defaultText}>Aucun favori pour le moment</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.mainTitle}> YOUR FAVORITES</Text>
                <Text style={styles.title}>Touch any picture for details</Text>
                {favorites.length <= 0 ? renderDefaultContent() : (
                    <FlatList

                        data={favorites}
                        renderItem={({item}) => <FavCocktailMaker name={item.strDrink} pic={item.strDrinkThumb}
                                                                  id={item.idDrink} navigation={navigation}/>}
                        keyExtractor={item => item.idDrink}
                    />
                )}
            </View>
        </SafeAreaView>

    );
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
        marginTop: 15,
        marginBottom: 3,

    },

    defaultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    defaultText: {
        backgroundColor: 'antiquewhite',
        borderRadius: 10,
        fontSize: 18,
        padding: 5,
        color: 'grey',
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
})
