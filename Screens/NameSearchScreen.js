import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {FadeInView} from "../effects/FadeinView";
import {useRoute} from "@react-navigation/native";

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
                <Text>{name}</Text>
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Pressable onPress={() =>

                    navigation.goBack()}><Text>Retour</Text></Pressable>

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
            </View>
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
