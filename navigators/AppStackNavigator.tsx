import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../config/constants';

import HomeScreen from '../screens/app/HomeScreen';
import StatsScreen from '../screens/app/StatsScreen';
import RewardsScreen from '../screens/app/RewardsScreen';

import HeaderAvatar from '../components/app/HeaderAvatar';
import AddCourseScreen from '../screens/app/AddCourseScreen';
import AddCourseStudentScreen from '../screens/app/student/AddCourseStudentScreen'
import { TouchableOpacity } from 'react-native';

const HomeStack = createStackNavigator();
const RewardsStack = createStackNavigator();
const StatsStack = createStackNavigator();

const HomeStackScreen = ({ navigation }: any) => (
	<HomeStack.Navigator>
		<HomeStack.Screen
			name="Home"
			component={HomeScreen}
			options={{
				title: 'Mes cours',
				headerTransparent: true,
				headerLeft: () => <HeaderAvatar navigation={navigation} />,
				headerTitleAlign: 'center',
			}}
		/>
		<HomeStack.Screen
			name="AddCourse"
			component={AddCourseScreen}
			options={{
                title: 'Nouvelle matière',
				headerTransparent: true,
				headerLeft: () => (
					<TouchableOpacity
						style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
						onPress={() => navigation.navigate("Home")}
					>
						<Feather name="arrow-left-circle" size={25} color="black" />
					</TouchableOpacity>
				),
				headerTitleAlign: 'center',
			}}
		/>
        <HomeStack.Screen
			name="AddCourseStudent"
			component={AddCourseStudentScreen}
			options={{
                title: 'Rejoindre un cours',
				headerTransparent: true,
				headerLeft: () => (
					<TouchableOpacity
						style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
						onPress={() => navigation.navigate("Home")}
					>
						<Feather name="arrow-left-circle" size={25} color="black" />
					</TouchableOpacity>
				),
				headerTitleAlign: 'center',
			}}
		/>
	</HomeStack.Navigator>
);

const RewardsStackScreen = ({ navigation }: any) => (
	<RewardsStack.Navigator>
		<RewardsStack.Screen
			name="Rewards"
			component={RewardsScreen}
			options={{
				title: 'Rewards',
				headerTransparent: true,
				headerLeft: () => <HeaderAvatar navigation={navigation} />,
				headerTitleAlign: 'center',
			}}
		/>
	</RewardsStack.Navigator>
);

const StatsStackScreen = ({ navigation }: any) => (
	<StatsStack.Navigator>
		<StatsStack.Screen
			name="Stats"
			component={StatsScreen}
			options={{
				title: 'Statistiques',
				headerTransparent: true,
				headerLeft: () => <HeaderAvatar navigation={navigation} />,
				headerTitleAlign: 'center',
			}}
		/>
	</StatsStack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();

export default function AppStackNavigator() {
	return (
		<Tab.Navigator initialRouteName="Mes cours" activeColor="#AFAFAF" inactiveColor="#AAAAAA" shifting={true}>
			<Tab.Screen
				name="Statistiques"
				component={StatsStackScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="chart-bar" color={focused ? colors.blue : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Mes cours"
				component={HomeStackScreen}
				options={{
					tabBarColor: 'white',
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome5 name="home" color={focused ? colors.lightBlue : color} size={24} />
					),
				}}
			/>
			<Tab.Screen
				name="Rewards"
				component={RewardsStackScreen}
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
