import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/app/HomeScreen';

//creation de la stack
const AppStack = createStackNavigator();

//stack qui s'appelera AppStackNavigator
//Il y aura ici tous les screens de l'application (hors ceux pour la connexion/inscription)

export default function AppStackNavigator() {
	return (
        <AppStack.Navigator 
        mode={"modal"}
        initialRouteName='Home'
        >
			<AppStack.Screen name={'Home'} component={HomeScreen} />
		</AppStack.Navigator>
	);
}
