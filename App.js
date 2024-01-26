import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
// import TaskAdd from './Tasks.js'

const SampleGoals = [
    {id: 1, name: "Faire un triathlon"},
    {id: 2, name: "Faire les courses"},
    {id: 3, name: "Aller à la salle 3 fois par semaine"},
    {id: 4, name: "Monter à plus de 5000m d altitude"},
    {id: 5, name: "Acheter mon premier appartement"},
    {id: 6, name: "Perdre 5 kgs"},
    {id: 7, name: "Gagner en productivité"},
    {id: 8, name: "Apprendre un nouveau langage"},
    {id: 9, name: "Faire une mission en freelance"},
    {id: 10, name: "Organiser un meetup autour de la tech"}];


export default function App() {

    const [goals, setGoals] = useState(SampleGoals);
    const [text, setText] = useState('');


    function addGoal(text, goals) {
        setGoals([...goals, {id: goals.length + 1, name: text}]);
        setText("")
    }


    const removeGoal = (element, goals) => {

        const thisId = element.id
        const filteredGoals = goals.filter(goals => (goals.id !== thisId))
        setGoals([...filteredGoals])

    }

    return (

        <ScrollView style={styles.scrollView}>
            <Text style={styles.container}>

                <View style={styles.flex}>
                    <Text style={styles.todoList}>
                        {'\n'}{goals.map((element, id) => <Text key={element.id}> {element.name}{'\n'}
                            <View style={[styles.flexField]}>
                                <TouchableOpacity

                                    onPress={() => {

                                        removeGoal(element, goals)
                                    }}
                                >
                                    <Text>X</Text>
                                </TouchableOpacity>
                            </View>
                        </Text>
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

