import {FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import {FadeInView} from "../effects/FadeinView";


export function FavoritesScreen({navigation}) {

    const [favorites, setFavorites] = useState([]);
    const route = useRoute();
    let id = route.params ? route.params.id : null;




    const FavCocktailMaker = ({name, pic}) => (


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

                const json = await response.json();
                console.log("IDIND = " + json)

                setFavorites(favorites => [...favorites, ...json.drinks]);


            }).catch(e => {
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {favorites.length <= 0 ? renderDefaultContent() : (
                <FlatList
                    data={favorites}
                    renderItem={({item}) => <FavCocktailMaker name={item.strDrink} pic={item.strDrinkThumb}
                                                              id={item.idDrink} navigation={navigation}/>}
                    keyExtractor={item => item.idDrink}
                />
            )}
        </View>
    );
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

    defaultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultText: {
        fontSize: 18,
        color: 'grey',
    }
})
