import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/app/HomeScreen';

const AppStack = createStackNavigator();

export default function AppStackNavigator() {
	return (
        <AppStack.Navigator 
        mode={"modal"}
        initialRouteName='Home'
        screenOptions={{
            headerShown: false
        }}>
			<AppStack.Screen name={'Home'} component={HomeScreen} />
		</AppStack.Navigator>
	);
}
