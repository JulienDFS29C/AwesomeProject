import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FadeInView} from "../effects/FadeinView";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";


export function IngredientLookupScreen({navigation}) {

    const route = useRoute();
    let {ingredient} = route.params;

    const IngredientLookupMaker = ({name, desc, navigation}) => (


        <View style={styles.container}>
            <FadeInView>
                <Pressable onPress={() =>

                    navigation.goBack()}>
                    <Image style={styles.navPic}
                           source={require('../assets/images/go-previous.png')}></Image></Pressable>
                <Image style={styles.pic}
                       source={{uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}}
                />
                <Text style={styles.mainTitle}>{name}</Text>
                <Text style={styles.desc}>{desc}</Text>


            </FadeInView>
        </View>
    )

    const AlphaStack = createNativeStackNavigator();


    let [LookupIngredient, setLookupIngredient] = useState([]);


    useEffect(() => {
        console.log("useeffect update for ingredient :" + ingredient)
        getLookup();

    }, [ingredient])


    function getLookup() {


        console.log('getLookup')


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
                <Text style={styles.defaultText}>Aucun favori pour le moment</Text>
            </View>
        );
    };



    return (



        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {LookupIngredient.length <= 0 ? renderDefaultContent() : (

                <FlatList
                    data={LookupIngredient}
                    renderItem={({item}) =>
                        <IngredientLookupMaker name={item.strIngredient} desc={item.strDescription}
                                               id={item.idIngredient} navigation={navigation}/>
                    }
                    keyExtractor={item => item.idIngredient}
                />

                )}
            </View>


        </SafeAreaView>

    )
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
        alignSelf : "center"

    },
    navPic: {

        alignSelf: 'flex-start',
        height: 25,
        width: 25,
        margin : 12
    },
})




