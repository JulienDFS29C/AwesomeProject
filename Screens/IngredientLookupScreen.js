import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FadeInView} from "../effects/FadeinView";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";


export function IngredientLookupScreen({navigation}) {

    const route = useRoute();
    let {ingredient} = route.params;

    const IngredientLookupMaker = ({name, desc, navigation}) => (


        <View style={styles.container}>
            <FadeInView>
                <Pressable onPress={() =>

                    navigation.goBack()}><Text>Retour</Text></Pressable>
                    <Image style={styles.pic}
                           source={{uri: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}}
                    />
                <Text>{name}</Text>
                <Text>{desc}</Text>


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


        return (
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>


                    <FlatList
                        data={LookupIngredient}
                        renderItem={({item}) =>
                            <IngredientLookupMaker name={item.strIngredient} desc={item.strDescription}
                                                id={item.idIngredient} navigation={navigation}/>
                        }
                        keyExtractor={item => item.idIngredient}
                    />


                </View>


            </SafeAreaView>

        )
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
                fontSize: 20,
                color: 'black',
                paddingBottom: 10
            },

            pic: {
                height: 250,
                width: 250,
                borderRadius: 20,
                padding: 5,

            }
        })




