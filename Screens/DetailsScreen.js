import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";


const OneCocktailMaker = ({
                              name, pic, id, ingredient1, ingredient2, ingredient3, ingredient4,
                              ingredient5, ingredient6, ingredient7, receipe, navigation
                          }) => (


    <View style={styles.container}>

        <Text style={styles.mainTitle}>Details of {name}</Text>
        <Text style={styles.title}>Touch any ingredient for more details</Text>

        <View style={styles.optionsLine}>
            <Pressable onPress={() =>

                navigation.goBack()}>
                <Image style={styles.navPic} source={require('../assets/images/go-previous.png')}></Image></Pressable>

            <Pressable onPress={() =>

                navigation.navigate("Fav", {id: id})}>


                <Image style={styles.navPic} source={require('../assets/images/FavStar.png')}></Image></Pressable>
        </View>

        <Image style={styles.pic}

               source={{uri: pic}}
        />

        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient1})}><Text
            style={styles.title}>{ingredient1}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient2})}><Text
            style={styles.title}>{ingredient2}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient3})}><Text
            style={styles.title}>{ingredient3}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient4})}><Text
            style={styles.title}>{ingredient4}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient5})}><Text
            style={styles.title}>{ingredient5}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient6})}><Text
            style={styles.title}>{ingredient6}</Text></TouchableOpacity>
        <TouchableOpacity
            onPress={() => navigation.navigate('IngredientLookUp', {ingredient: ingredient7})}><Text
            style={styles.title}>{ingredient7}</Text></TouchableOpacity>

        <Text style={styles.title}>{receipe}</Text>


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
                                          ingredient3={item.strIngredient3 === null ? null : item.strIngredient3}
                                          ingredient4={item.strIngredient4 === null ? null : item.strIngredient4}
                                          ingredient5={item.strIngredient5 === null ? null : item.strIngredient5}
                                          ingredient6={item.strIngredient6 === null ? null : item.strIngredient6}
                                          ingredient7={item.strIngredient7 === null ? null : item.strIngredient7}
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
        justifyContent: 'space-around',
    },


    navPic: {
        marginHorizontal: 50,
        height: 25,
        width: 25,
        marginVertical: 25

    },

})