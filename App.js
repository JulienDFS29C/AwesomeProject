import { StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./Screens/HomeScreen";
import {DetailsScreen} from "./Screens/DetailsScreen";


const Stack = createNativeStackNavigator();



/********************************************************************
********************************************************************/


export default function App() {




  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}


