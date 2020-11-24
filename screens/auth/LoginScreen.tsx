import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Fire from '../../config/Fire';

import Error from '../../components/auth/Error';
import Heading from '../../components/auth/Heading';
import FilledButton from '../../components/auth/FilledButton';
import Input from '../../components/auth/Input';
import TextButton from '../../components/auth/TextButton';


const LoginScreen = ({ navigation }: any) => {
	const [password, setPassword] = useState('');
	const [mail, setMail] = useState('');
	const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<null|string|undefined>(null);

    useEffect(() => {
        // registerForPushNotificationsAsync();
    })

    async function registerForPushNotificationsAsync() {
        console.log("registerForPushNotificationsAsync...");
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
      }

	//fonction appeler lorsque il clique sur s'inscrire
	const connect = () => {
		//On réinitialise l'error
		setError('');
		//On lance le loader
		setLoading(true);
		Fire.shared
			.connect(mail, password)
			.then(async () => {
				//si l'inscription est réussi :
                await Fire.shared.updateToken(token);

                //On affiche un Toast
				ToastAndroid.show('Connexion réussi', 5000);
				//on change de stack
				navigation.reset({
					index: 0,
					routes: [{ name: 'AppStack' }],
				});
			})
			.catch((err) => {
				//si on à une erreur :
                //on met l'erreur dans le state
				setError(err.toString());
				//on remet le loader a false
				setLoading(false);
            });
	};

	return (
		<View style={styles.container}>
			<Heading style={styles.title}>CONNEXION</Heading>
			<Error error={error} />
			<Input
				style={styles.input}
				placeholder={'Mail'}
				keyboardType={'email-address'}
				value={mail}
				onChangeText={setMail}
			/>
			<Input
				style={styles.input}
				placeholder={'Mot de Passe'}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={'Me connecter'}
				style={styles.loginButton}
				onPress={() => {
					connect();
				}}
				loading={loading}
			/>
			<TextButton
				title="Pas encore inscrit ?"
				onPress={() => {
					navigation.navigate('Register');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	title: {
		marginBottom: 20,
	},
	input: {
		marginVertical: 8,
	},
	loginButton: {
		marginVertical: 32,
	},
});

export default LoginScreen;
