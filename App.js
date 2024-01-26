import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
// import TaskAdd from './Tasks.js'
const uniqueId = () =>{
    return  (Date.now()*(Math.random())*100000);
}

const SampleGoals = [
    {id: uniqueId(), name: "Faire un triathlon"},
    {id: uniqueId(), name: "Faire les courses"},
    {id: uniqueId(), name: "Aller à la salle 3 fois par semaine"},
    {id: uniqueId(), name: "Monter à plus de 5000m d altitude"},
    {id: uniqueId(), name: "Acheter mon premier appartement"},
    {id: uniqueId(), name: "Perdre 5 kgs"},
    {id: uniqueId(), name: "Gagner en productivité"},
    {id: uniqueId(), name: "Apprendre un nouveau langage"},
    {id: uniqueId(), name: "Faire une mission en freelance"},
    {id: uniqueId(), name: "Organiser un meetup autour de la tech"}];


/////-----


export default function App() {
    const [goals, setGoals] = useState(SampleGoals);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    function addGoal(text, goals) {
        setGoals([...goals, {id: uniqueId(), name: text}]);
        setText("")
    }


    const removeGoal = (element, goals) => {

        const thisId = element.id
        const filteredGoals = goals.filter(goals => (goals.id !== thisId))
        setGoals([...filteredGoals])
    }

    ///////-------------------/////////

    return (

        <ScrollView style={styles.scrollView}>

            <View><Text style={styles.title}>==>  MY GOAL APP</Text></View>

            <View style={styles.container}>
                {goals.map((element) => (
                    <View key={element.id} style={styles.goalItem}>
                        <Text style={styles.goalText}>{element.name}</Text>
                        <TouchableOpacity
                            onPress={() => removeGoal(element, goals)}
                            style={styles.removeButton}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

                    <View style={[styles.flexField]}>
                        <View style={styles.goalInput}>
                            <TextInput  placeholder="Add Task..." onChangeText={setText} value={text}/>

                            <View style={styles.addButton}>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log();

                                        addGoal(text, goals)
                                    }}
                                >
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                <StatusBar style="auto"/>

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
        marginHorizontal: 10,
    },

    title:{
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: 25,
        marginTop: 40,
        marginLeft: 40,
        color: "cadetblue"

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
    },
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    goalInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 12,
        backgroundColor: 'antiquewhite',
        borderRadius: 5,
    },
    goalText: {
        flex: 1,
    },
    removeButton: {
        marginLeft: 10,
        padding: 5,
        backgroundColor: '#d31616',
        borderRadius: 5,
    },

    addButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: 'cadetblue',
        borderRadius: 5,
    },
});

