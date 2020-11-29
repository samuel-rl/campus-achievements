import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import SplashScreen from './screens/splash/SplashScreen';
import DrawerNavigator from './navigators/drawer/DrawerNavigator';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Fire from './config/Fire';

//Stack contenant toute l'application
const RootStack = createStackNavigator();

export default function App() {
	const [token, setToken] = useState<null | string | undefined>(null);
	const [firstLaunch, setFirstLaunch] = useState(true);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(async (state) => {
			if (firstLaunch == true) {
				setFirstLaunch(false);
				if (state.isConnected == true) {
                    Fire.shared.firebase.auth().onAuthStateChanged((user) => {
                        user ? setConnected(true) : setConnected(false)
                    });
					if (Fire.shared.uid != undefined) {
                        await getTokenAndUpdate();
                    }
                    setLoading(false);
				}
			}

			Fire.shared.connectedToInternet = state.isConnected;
		});
		return () => {
			unsubscribe();
		};
    }, []);

	const getTokenAndUpdate = async () => {
		registerForPushNotificationsAsync().then(() => {
			Fire.shared.updateToken(token);
		});
	};

	const registerForPushNotificationsAsync = async () => {
		console.log('registerForPushNotificationsAsync...');
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
		} else {
			alert('Must use physical device for Push Notifications');
		}
		setToken(token);
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
	};

	return (
		<NavigationContainer>
			<RootStack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{loading ? (
					<RootStack.Screen name={'Splash'} component={SplashScreen} />
				) : connected ? (
					<RootStack.Screen name={'AppStack'} component={DrawerNavigator} />
				) : (
					<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
				)}
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
