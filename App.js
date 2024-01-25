import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
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


let i = 0;

let initialText = 'add a task';

export default function App() {

    const [Goal, setGoal] = useState(SampleGoals);
    const [Sthg ,setSthg ] = useState('');

    let sampleGoals = props => ({SampleGoals}) => {

        <View>{SampleGoals}</View>
    }



    return (

        <ScrollView style={styles.scrollView}>
            <Text style={styles.container}>


                <View style={styles.flex}>
                    <Text style={styles.todoList}>
                        {'\n'}{Goal.map((goal) => <Text key={goal}> {goal}{'\n'}
                        <Button title="fait">
                            <Text>FAIT</Text></Button>{'\n'}></Text>
                    )}

                    </Text>

                    <View style={[styles.flexField]}>
                        <View>
                            <TextInput placeholder="Add Task..." onChangeText={setSthg}/>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {

                                        setGoal(Sthg)

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

