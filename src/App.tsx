import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Profile from './Profile';
import Credential from './components/Credential';
import DisplayJSON from './components/DisplayJSON';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Credential" component={Credential}/>
        <Stack.Screen name="DisplayJSON" component={DisplayJSON}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
