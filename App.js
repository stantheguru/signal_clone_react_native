import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions=
      {{headerStyle: { backgroundColor: '#2C6BED'}, headerTitleStyle: {color:"#FFFFFF"}, headerTintColor: "#fff", gestureDirection: 'horizontal',
        gestureEnabled: true}}
      >
      <Stack.Screen
       name="Login" component={LoginScreen}>
      </Stack.Screen>

      <Stack.Screen
       name="Register" component={RegisterScreen}>
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
