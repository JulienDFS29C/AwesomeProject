import {Button, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";


const image = '../assets/images/CocktailBG.jpg'

export const SearchForm = ({navigation}) => {

    const [ingredient, setIngredient] = useState('')
    const [name, setName] = useState('')
    const [ingredientFO, setIngredientFO] = useState('')
    const buttonTitle = "GO"

    return (

        <SafeAreaView style={styles.container}>
            <ImageBackground source={require(image)} resizeMode="cover" style={styles.bgImage}>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    {/*
            ***********************BY INGREDIENT**********************
            */}
                    <View style={styles.upContainer}>
                        <Text style={styles.header}>SEARCH BY INGREDIENT</Text>

                        <TextInput editable
                                   maxLength={40}
                                   onChangeText={setIngredient}
                                   value={ingredient}
                                   style={styles.input}
                                   placeholder={'type your ingredient (gin, coca...)'}
                        />

                        <Button
                            title={buttonTitle}
                            style={styles.button}
                            onPress={() => {

                                navigation.navigate('IngredientSearch', {ingredient: ingredient})
                            }}
                        >
                        </Button>
                    </View>
                    {/*
         **************************BY NAME*************************
          */}
                    <View style={styles.upContainer}>

                        <Text style={styles.header}>SEARCH BY NAME</Text>

                        <TextInput
                            editable
                            maxLength={40}
                            onChangeText={setName}
                            value={name}
                            style={styles.input}
                            placeholder={'at least one letter'}
                        />

                        <Button
                            style={styles.button}
                            title={buttonTitle}
                            onPress={() => {

                                navigation.navigate('NameSearch', {name: name})
                            }}
                        >

                        </Button>

                    </View>

                    {/*
        *****************INGREDIENT LOOKUP *********************
*/}
                    <View style={styles.upContainer}>

                        <Text style={styles.header}>LOOK FOR AN INGREDIENT</Text>

                        <TextInput editable
                                   maxLength={40}
                                   onChangeText={setIngredientFO}
                                   value={ingredientFO}
                                   style={styles.input}
                                   placeholder={'find an ingredient'}
                        />

                        <Button
                            style={styles.button}
                            title={buttonTitle}
                            onPress={() => {

                                navigation.navigate('IngredientLookUp', {ingredient: ingredientFO})
                            }}
                        >

                        </Button>

                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );


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
        mainTitle: {
            fontWeight: 'bold',
            color: 'antiquewhite',
            fontSize: 25,
            marginTop: 25,
            marginBottom: 3
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


        pic: {
            height: 250,
            width: 250,
            borderRadius: 20,
            padding: 5,

        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: 'gray',
            borderRadius: 5,
            backgroundColor: 'white',
            color: 'black',
            width: '40%',
        },

        header: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'antiquewhite',
            marginTop: 80

        }
    }
)