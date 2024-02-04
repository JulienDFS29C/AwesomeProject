import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {FadeInView} from "../effects/FadeinView";
import {useRoute} from "@react-navigation/native";



export function SearchScreen({navigation}) {

    const [CockailsByIngredient, setCockailsByIngredient] = useState([])
    const route = useRoute();
    let {ingredient} = route.params;

    const CocktailMakerByIngredient = ({name, pic, id, navigation}) => (


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
        console.log("useEffect update avec ingredient: ", ingredient);
        getByIngredient();
    }, []);


    useEffect(() => {
        console.log("useEffect update avec ingredient: ", ingredient);
        getByIngredient();
    }, [ingredient]);






    function getByIngredient(ingredient) {
        console.log('By Ingredient');
        if (ingredient === null) { navigation.navigate('Form')}
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Pas de données cocktail trouvées');
                }
                const json = await response.json();
                console.log("Données récupérées: ", json);
                setCockailsByIngredient(json.idDrink);
            }).catch(e => {
            console.log('Erreur : ', e);
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={CockailsByIngredient}
                renderItem={({ item }) => (
                    <CocktailMakerByIngredient
                        name={item.strDrink}
                        pic={item.strDrinkThumb}
                        id={item.idDrink}
                        navigation={navigation}
                    />
                )}
                keyExtractor={item => item.idDrink}
            />
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
