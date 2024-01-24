import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';




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

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
      <Text style={styles.todoList }>

        {'\n'}{sampleGoals.map((goalReached)=> <Text key={goalReached}> {goalReached}{'\n'}
        <Button title="fait">FAIT</Button>{'\n'}></Text>

        )}</Text>
        </View>
        <Button title="créer">CREER</Button>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoList: {
    fontSize: 20,
    fontWeight: 'bold',
    color : 'cadetblue'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row'
  },
  createButton :{

    backgroundColor :'green'

  }
});
