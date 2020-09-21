import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../drawer/DrawerContent';

import NotificationScreen from '../../screens/app/NotificationsScreen';
import ParametersScreen from '../../screens/app/ParametersScreen';
import AppStackNavigator from '../AppStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderAvatar from '../../components/app/HeaderAvatar';

const NotifticationsStack = createStackNavigator();
const ParametersStack = createStackNavigator();

const NotifticationsStackScreen = ({ navigation }: any) => (
	<NotifticationsStack.Navigator>
		<NotifticationsStack.Screen
			name="Home"
            component={NotificationScreen}
            
			options={{
                title: 'Mes notifications',
                headerTransparent:true,
				headerLeft: () => (
                    <HeaderAvatar navigation={navigation}/>
				),
				headerTitleAlign: 'center',
			}}
		/>
	</NotifticationsStack.Navigator>
);

const ParametersStackScreen = ({ navigation }: any) => (
	<ParametersStack.Navigator>
		<ParametersStack.Screen
			name="Home"
            component={NotificationScreen}
            
			options={{
                title: 'Paramètres',
                headerTransparent:true,
				headerLeft: () => (
                    <HeaderAvatar navigation={navigation}/>
				),
				headerTitleAlign: 'center',
			}}
		/>
	</ParametersStack.Navigator>
);


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			drawerStyle={{
				width: 240,
			}}
			edgeWidth={400}
			drawerType="front"
            initialRouteName="Accueil"
            drawerContent={DrawerContent}
		>
			<Drawer.Screen name="Accueil" component={AppStackNavigator} />
			<Drawer.Screen name="Notifications" component={NotifticationsStackScreen} />
			<Drawer.Screen name="Paramètres" component={ParametersStackScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;