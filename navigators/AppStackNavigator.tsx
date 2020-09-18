import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import {colors} from '../config/constants';

import HomeScreen from '../screens/app/HomeScreen';
import ParametersScreen from '../screens/app/ParametersScreen';
import RewardsScreen from '../screens/app/RewardsScreen';
import StatsScreen from '../screens/app/StatsScreen';
import NotificationsScreen from '../screens/app/NotificationsScreen';

const Tab = createMaterialBottomTabNavigator();
export default function AppStackNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="#AFAFAF"
			inactiveColor="#AAAAAA"
            shifting={true}
            screenOptions={{

            }}
		>
			<Tab.Screen
				name="Paramètres"
				component={ParametersScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<Feather name="settings" color={focused ? colors.foam : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Statistiques"
				component={StatsScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="chart-bar" color={focused ? colors.blue : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Mes cours"
				component={HomeScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="home" color={focused ? colors.lightBlue : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="bell" color={focused ? colors.shrimp : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Rewards"
				component={RewardsScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="medal" color={focused ? '#e5df88' : color} size={24} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
