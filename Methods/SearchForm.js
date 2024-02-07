import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {SafeAreaConsumer} from "react-native-safe-area-context";

export const SearchForm = ({navigation}) => {

    const [ingredient, setIngredient] = useState('')
    const [name, setName] = useState('')
    const [ingredientFO, setIngredientFO] = useState('')
    const buttonTitle = "GO"

    return (

<SafeAreaView style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            {/*
            ***********************BY INGREDIENT**********************
            */}

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

            {/*
         **************************BY NAME*************************
          */}
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


            {/*
        *****************INGREDIENT LOOKUP *********************
*/}

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

</SafeAreaView>
    );


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