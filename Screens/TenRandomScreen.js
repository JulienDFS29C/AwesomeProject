import {FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View,} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import {CocktailMaker} from "../Components/CocktailMaker";

const image = '../assets/images/CocktailBG.jpg'


export default function TenRandomScreen({navigation}) {

    const [TenRandomCocktails, setTenRandomCocktails] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const refreshRandom = getRandomAPI();
            return () => refreshRandom;
        }, [navigation])
    );

    useEffect(() => {
        console.log("useeffect update")
        getRandomAPI();
    }, [useFocusEffect])

    function getRandomAPI() {

        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php`)

            .then(async response => {
                if (!response.ok) {
                    throw new Error('pas de données cocktail trouvées');
                }
                const json = await response.json();
                setTenRandomCocktails(json.drinks)

            }).catch(e => {
            console.log('erreur : ', e);
        })
    }

    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground blurRadius={1.5} source={require(image)} resizeMode="cover" style={styles.bgImage}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.upContainer}>
                        <Text style={styles.mainTitle}> 10 RANDOM COCKTAILS</Text>
                        <Text style={styles.title}>Touch any picture for details</Text>
                    </View>
                    <FlatList
                        data={TenRandomCocktails}
                        renderItem={({item}) =><CocktailMaker  pic={item.strDrinkThumb}
                                                               name={item.strDrink}
                                                               id={item.idDrink}
                                                               navigation={navigation}/>
                        }
                        keyExtractor={item => item.idDrink}
                    />

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            opacity: 50,
            backgroundColor: 'rgba(95, 158, 160, 0.7)',
            // alignItems: 'center',
            // justifyContent: 'center',
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
        upContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 50,
            backgroundColor: 'rgba(95, 158, 160, 0.5)',
            // height: 280,
            width: 280,
            padding: 5,
            marginHorizontal: 15

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

        pic: {
            height: 250,
            width: 250,
            borderRadius: 20,
            padding: 5,
            marginHorizontal: 15,
        },

        optionsLine: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15

        },
        navPic: {
            alignSelf: 'flex-end',
            height: 25,
            width: 25,
        },
        plainText: {
            fontWeight: 'bold',
            fontStyle: 'italic',
            marginHorizontal: 5,

        },
    }
)

