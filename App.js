import { StatusBar } from 'expo-status-bar';
import {Button,  ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
// import TaskAdd from './Tasks.js'

const sampleGoals= [
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

let text;
let initialText = 'add a task';


const fillingField = () => {
  const [text, onChangeText] = useState('');

  return(

        <TextInput

          placeholder = 'ADD'
          value={text}
          onChangeText={text => onChangeText(text)}
          defaultValue={initialText}
        >
        </TextInput>
)
}




export default function App() {  return (

    <ScrollView style={styles.scrollView}>
    <Text style={styles.container}>


        <View style={styles.flex}>
          <Text style={styles.todoList }>

        {'\n'}{sampleGoals.map((goalReached)=> <Text key={goalReached}> {goalReached}{'\n'}
        <Button title="fait">FAIT</Button>{'\n'}></Text>

        )}
           </Text>
          <View style={[styles.flexField ]} >

            {fillingField()}

            <Button title="ADD" onPress={() => sampleGoals.push(text)} > </Button>

          </View>
       </View>
      );


      <StatusBar style="auto" />


    </Text>
</ScrollView> )
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
    color : 'cadetblue'
  },
  flexField: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },

  block:{

    display: 'block'
  },

  createButton :{
    backgroundColor :'green'

  }
});
