import {FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View,} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from '@react-navigation/native';
import {CocktailMaker} from "../Components/CocktailMaker";
import {CocktailFetcher} from "../Components/CocktailFetcher";

const image = '../assets/images/CocktailBG.jpg'


export default function TenRandomScreen({navigation}) {

    const [TenRandomCocktails, setTenRandomCocktails] = useState([]);
    const URL = `https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php`;

    useFocusEffect(
        useCallback(() => {
            const refreshRandom = CocktailFetcher(URL);
            return () => refreshRandom;
        }, [navigation])
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await CocktailFetcher(URL);
                setTenRandomCocktails(data);
            } catch (error) {
                console.error('Error fetching cocktail data:', error.message);
            }
        }
        fetchData();

    }, []);


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

