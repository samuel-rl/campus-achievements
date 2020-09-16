import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/authentificationScreens/LoginScreen';
import RegisterScreen from '../screens/authentificationScreens/RegisterScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
	return (
        <AuthStack.Navigator 
        mode={"modal"}
        initialRouteName='Login'
        screenOptions={{
            headerShown: false
        }}>
			<AuthStack.Screen name={'Login'} component={LoginScreen} />
			<AuthStack.Screen name={'Register'} component={RegisterScreen} />
		</AuthStack.Navigator>
	);
}
