import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PromosScreen from '../screens/auth/PromosScreen';

//creation de la stack
const AuthStack = createStackNavigator();

//stack qui s'appelera AuthStackNavigator
//Pas de header car pas besoin pour l'authentification
//deux screens dans cette stack : 
// -LoginScreen   =>   (lancer en première)
// -RegisterScreen
export default function AuthStackNavigator() {
	return (
        <AuthStack.Navigator 
        mode={"modal"}
        initialRouteName='Login'
        screenOptions={{
            headerShown: false
        }}>
			<AuthStack.Screen name={'Login'} component={LoginScreen} />
			<AuthStack.Screen name={'Register'} component={PromosScreen} />
		</AuthStack.Navigator>
	);
}
