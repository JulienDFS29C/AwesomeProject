import {Button, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import {DetailsScreen} from "./Screens/DetailsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FavouritesScreen} from "./Screens/FavouritesScreen";
import TenRandomScreen from "./Screens/TenRandomScreen";

const Stack = createNativeStackNavigator();


/********************************************************************
********************************************************************/
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="TenRand" component={TenRandomScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
};


export default function App() {


console.log("in the APP")

  return (

      <NavigationContainer>{
        <Stack.Navigator>
            <Stack.Screen name="Tab" component={BottomTabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="TenRand" component={TenRandomScreen} />

        </Stack.Navigator>


      }</NavigationContainer>
  );
}


