import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";




const OneCocktailMaker = ({
                              name, pic, id, ingredient1, ingredient2, ingredient3, ingredient4,
                              ingredient5, ingredient6, ingredient7, receipe, navigation
                          }) => (


    <View style={styles.container}>
        <Pressable onPress={() =>

            navigation.goBack()}><Text>Retour</Text></Pressable>
        <Pressable onPress={() =>

            navigation.navigate("Fav", {id: id})



        }><Text>ADD</Text></Pressable>



        <Image style={styles.pic}

               source={{uri: pic}}
        />
        <Text style={styles.title}>{name}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient1})}><Text>{ingredient1}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient2})}><Text>{ingredient2}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient3})}><Text>{ingredient3}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient4})}><Text>{ingredient4}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient5})}><Text>{ingredient5}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient6})}><Text>{ingredient6}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient7})}><Text>{ingredient7}</Text></TouchableOpacity>

        <Text>{receipe}</Text>


    </View>
)

export function DetailsScreen({navigation}) {


    console.log("in the Detail")
    const [OneCocktail, setOneCocktail] = useState([]);
    const route = useRoute();
    let {id} = route.params;


    useEffect(() => {
        console.log("useEffect update avec ID: ", id);
        getOneAPI();
    }, [id]);


    useEffect(() => {
        console.log("useeffect update")
        getOneAPI();

    }, [])


    function getOneAPI() {
        console.log('coucou')


        console.log('getAPI')

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }

                const json = await response.json();
                console.log("IDIND = " + json)
                setOneCocktail(json.drinks)


            }).catch(e => {
            console.log('erreur : ', e);

        })


    }


    /*    *****************************************************************
        ****************************************************************
        ******************************************************************/

    return (

        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>


                <FlatList

                    data={OneCocktail}
                    renderItem={({item}) =>
                        <OneCocktailMaker name={item.strDrink} pic={item.strDrinkThumb} id={item.idDrink}
                                          navigation={navigation}
                                          receipe={item.strInstructions}
                                          ingredient1={item.strIngredient1 === null ? '' : item.strIngredient1}
                                          ingredient2={item.strIngredient2 === null ? '' : item.strIngredient2}
                                          ingredient3={item.strIngredient3 === null ? '' : item.strIngredient3}
                                          ingredient4={item.strIngredient4 === null ? '' : item.strIngredient4}
                                          ingredient5={item.strIngredient5 === null ? '' : item.strIngredient5}
                                          ingredient6={item.strIngredient6 === null ? '' : item.strIngredient6}
                                          ingredient7={item.strIngredient7 === null ? '' : item.strIngredient7}
                        />
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
        marginTop: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
    },

    title: {
        fontSize: 35,
        color: 'cadetblue',

    },

    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,

    },
})