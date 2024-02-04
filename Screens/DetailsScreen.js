import {Button, FlatList, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";


const OneCocktailMaker = ({name, pic, id, ingredient1, ingredient2, ingredient3, ingredient4,
                              ingredient5, ingredient6, ingredient7, receipe}) => (


    <View style={styles.container}>

        <Image style={styles.pic}

               source= {{uri: pic}}
        />
        <Text style={styles.title}>{name}</Text>
        <Text>{ingredient1}</Text>
        <Text>{ingredient2}</Text>
        <Text>{ingredient3}</Text>
        <Text>{ingredient4}</Text>
        <Text>{ingredient5}</Text>
        <Text>{ingredient6}</Text>
        <Text>{ingredient7}</Text>

        <Text>{receipe}</Text>

    </View>
)

export function DetailsScreen({ navigation }) {



    console.log("in the Detail")

    const [OneCocktail, setOneCocktail] = useState([]);
    const route = useRoute();
    let { id } = route.params;


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

        fetch (`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>




                <FlatList

                    data={OneCocktail}
                    renderItem={({ item }) =>
                        <OneCocktailMaker name={item.strDrink} pic={item.strDrinkThumb} id={item.idDrink} navigation={navigation}
                                          receipe ={item.strInstructions}
                                          ingredient1 = {item.strIngredient1===null? '' : item.strIngredient1}
                                          ingredient2 = {item.strIngredient2===null? '' : item.strIngredient2}
                                          ingredient3 = {item.strIngredient3===null? '' : item.strIngredient3}
                                          ingredient4 = {item.strIngredient4===null? '' : item.strIngredient4}
                                          ingredient5 = {item.strIngredient5===null? '' : item.strIngredient5}
                                          ingredient6 = {item.strIngredient6===null? '' : item.strIngredient6}
                                          ingredient7 = {item.strIngredient7===null? '' : item.strIngredient7}
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
        marginTop : 40,
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