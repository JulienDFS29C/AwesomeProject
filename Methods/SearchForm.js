import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";

export const SearchForm = ({navigation}) => {

    const [ingredient, setIngredient] = useState('')
    const [name, setName] = useState('')
    const [ingredientFO, setIngredientFO] = useState('')


    return (

        /*
                ***********************BY INGREDIENT**********************
        */


        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput editable
                       maxLength={40}
                       onChangeText={setIngredient}
                       value={ingredient}
                       style={styles.input}
                       placeholder={'enter an ingredient'}
            />

            <Pressable
                style={styles.button}
                onPress={() => {

                    navigation.navigate('IngredientSearch', {ingredient: ingredient})
                }}
            >
                <Text>GO</Text>
            </Pressable>

            {/*
         **************************BY NAME*************************
*/}

            <TextInput editable
                       maxLength={40}
                       onChangeText={setName}
                       value={name}
                       style={styles.input}
                       placeholder={'enter a full name or just a part'}
            />

            <Pressable
                style={styles.button}
                onPress={() => {

                    navigation.navigate('NameSearch', {name: name})
                }}
            >
                <Text>GO</Text>
            </Pressable>


            {/*
        *****************INGREDIENT LOOKUP *********************
*/}


            <TextInput editable
                       maxLength={40}
                       onChangeText={setIngredientFO}
                       value={ingredientFO}
                       style={styles.input}
                       placeholder={'find an ingredient'}
            />

            <Pressable
                style={styles.button}
                onPress={() => {

                    navigation.navigate('IngredientLookUp', {ingredient: ingredientFO})
                }}
            >
                <Text>GO</Text>
            </Pressable>


        </View>


    );


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

        },
        input: {
            height: 40, // Hauteur explicite
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderColor: 'gray', // Couleur de la bordure visible
            borderRadius: 5,
            backgroundColor: 'white', // Fond clair
            color: 'black', // Texte foncé
            width: '80%', // Largeur définie
        },

    }
)