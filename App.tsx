import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import AppStackNavigator from './navigators/AppStackNavigator';


//Stack contenant toute l'application
const RootStack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
                <RootStack.Screen name={'AppStack'} component={AppStackNavigator} />
				<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
            </RootStack.Navigator>
		</NavigationContainer>
	);
}
