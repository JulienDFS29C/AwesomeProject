import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
// import TaskAdd from './Tasks.js'

const SampleGoals = [
    "Faire un triathlon",
    "Faire les courses",
    "Aller à la salle 3 fois par semaine",
    "Monter à plus de 5000m d altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech"];



export default function App() {

    const [goals, setGoal] = useState(SampleGoals);
    const [text ,setText ] = useState('');

    // const ListGoals = props => ({ListGoals}) => {
    //
    //
    //
    //     <View>{ListGoals[i]}</View>
    // }

    function addGoal(text, goals){
        setGoal([...goals, text]);
        setText("")
    }

    useEffect(() => {

        console.log("goals :", goals)
    },[goals])

    return (

        <ScrollView style={styles.scrollView}>
            <Text style={styles.container}>


                <View style={styles.flex}>
                    <Text style={styles.todoList}>
                        {'\n'}{goals.map((text) => <Text key={text}> {text}{'\n'}
                        <Button title="fait">
                            <Text>FAIT</Text></Button>{'\n'}></Text>
                    )}

                    </Text>

                    <View style={[styles.flexField]}>
                        <View>
                            <TextInput placeholder="Add Task..." onChangeText={setText} value={text}/>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {

                                        addGoal(text, goals)

                                    }}
                                >
                                    <Text>Submit</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                  {/*  <Button title="ADD" onPress={() => SampleGoals.push(text)} > </Button>*/}



                </View>
                );

                <StatusBar style="auto"/>

            </Text>
        </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'lightgray',
        marginHorizontal: 20,
    },
    todoList: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'cadetblue'
    },
    flexField: {

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    block: {

        display: 'block'
    },

    createButton: {
        backgroundColor: 'green'

    }

});

