import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import {DetailsScreen} from "./Screens/DetailsScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TenRandomScreen from "./Screens/TenRandomScreen";
import {SearchForm} from "./Methods/SearchForm"
import Foundation from "react-native-vector-icons/Foundation"
import {SearchScreen} from "./Screens/SearchScreen";

const Stack = createNativeStackNavigator();


/********************************************************************
 ********************************************************************/
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator  initialRouteName="Home" options={{tabBarActiveTintColor: '#444444', headerShown: false,
             }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="home" color='cadetblue' size={size} />
                ),}}/>
            <Tab.Screen name="TenRand" component={TenRandomScreen} options={{headerShown: false, tabBarLabel: 'Random',
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="die-five" color='cadetblue' size={size} />
                ),}}/>
            <Tab.Screen  name="Form" component={SearchForm} options={{headerShown: false, tabBarLabel: 'Search',
                tabBarIcon: ({ color, size }) => (
                    <Foundation name="magnifying-glass" color='cadetblue' size={size} />
                ),}}/>

        </Tab.Navigator>
    );
}


export default function App() {


    console.log("in the APP")

    return (

        <NavigationContainer >{
            <Stack.Navigator >
                <Stack.Screen name="Tab" component={BottomTabNavigator} options={{headerShown: false}}/>
                <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
            </Stack.Navigator>


        }</NavigationContainer>
    );
}

