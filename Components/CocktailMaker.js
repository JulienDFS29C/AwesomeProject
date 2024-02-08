import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {FadeInView} from "../effects/FadeinView";
import Foundation from "react-native-vector-icons/Foundation";

const iconSize = 28;

export const CocktailMaker = ({name, pic, id, navigation}) => {
    return (

        <View style={styles.container}>

                <FadeInView>

                    <Pressable onPress={() =>
                        navigation.navigate('Details', {id: id})}>
                        <View>
                            <Image style={styles.pic}
                                   source={{uri: pic}}
                            /></View>

                    </Pressable>
                    <View style={styles.optionsLine}>
                        <Text style={styles.plainText}>{name}</Text>
                        <Pressable onPress={() =>

                            navigation.navigate("Fav", {id: id})}>


                            <Foundation style={styles.navPic} name="star" color='black' size={iconSize}/></Pressable>

                    </View>
                </FadeInView>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 50,
        backgroundColor: 'rgba(95, 158, 160, 0.7)',
    },

    pic: {
        height: 250,
        width: 250,
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 15,

    },
    navPic: {

        alignSelf: 'flex-end',
        height: 25,
        width: 25,
    },

    optionsLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15

    },
    plainText: {

        fontWeight: 'bold',
        fontStyle: 'italic',
        marginHorizontal: 5

    }
})
