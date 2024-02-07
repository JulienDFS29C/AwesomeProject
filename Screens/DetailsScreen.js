import {
    FlatList,
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import Foundation from "react-native-vector-icons/Foundation";

const image = '../assets/images/CocktailBG.jpg'
const iconSize = 28;
const OneCocktailMaker = ({
                              name, pic, id, ingredient1, ingredient2, ingredient3, ingredient4,
                              ingredient5, ingredient6, ingredient7, receipe, navigation
                          }) => (


    <View style={styles.container}>
        <View style={styles.upContainer}>
            <Text style={styles.title}>Details of:</Text><Text style={styles.mainTitle}>{name}</Text>
            <Text style={styles.title}>Touch ingredient for details</Text>
        </View>
        <View style={styles.optionsLine}>
            <Pressable onPress={() =>

                navigation.goBack()}>
                <Foundation style={styles.navPic} name="rewind" color='black' size={iconSize}/></Pressable>

            <Pressable onPress={() =>

                navigation.navigate("Fav", {id: id})}>


                <Foundation style={styles.navPic} name="star" color='black' size={iconSize}/></Pressable>
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
            <ImageBackground source={require(image)} resizeMode="cover" style={styles.bgImage}>

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
            </ImageBackground>
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 50,
        backgroundColor: 'rgba(95, 158, 160, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
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
    upContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 50,
        backgroundColor: 'rgba(95, 158, 160, 0.5)',
        // height: 280,
        width: '100%',
        padding: 5,
        marginHorizontal: 15,
        marginTop: 25,
    },


    pic: {
        height: 320,
        width: 320,
        borderRadius: 20,
        padding: 5,


    },


    optionsLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },


    navPic: {
        marginHorizontal: 50,
        marginVertical: 10

    },
    plainText: {

        fontWeight: 'bold',
        fontStyle: 'italic',

    }

})