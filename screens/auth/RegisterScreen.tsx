import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform } from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import Fire from '../../config/Fire';

import Error from '../../components/auth/Error';
import Heading from '../../components/auth/Heading';
import FilledButton from '../../components/auth/FilledButton';
import Input from '../../components/auth/Input';
import TextButton from '../../components/auth/TextButton';
import ProfilePicturePicker from '../../components/auth/ProfilePicturePicker';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export interface RegisterScreenProps {}

const RegisterScreen = ({ navigation }: any) => {
	const [mail, setMail] = useState('');
	const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [avatar, setAvatar] = useState<null | string>(null);
	const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<null|string|undefined>(null);
    const [random] = useState(Date.now() % 9);


    useEffect(() => {
        registerForPushNotificationsAsync();
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
          //alert('Must use physical device for Push Notifications');
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

	//fonction appeler lorsque il clique sur se connecter
	const register = (mail: string, password: string, nom: string, prenom: string, avatar: null | string) => {
		//On réinitialise l'error
		setError('');
		//On lance le loader
		setLoading(true);
		//
		console.log({ mail, password, nom, prenom, avatar });
		Fire.shared
			.createUser(mail, password, nom, prenom, avatar)
			.then(async () => {
                //si la connexion est réussi :
                
                await Fire.shared.updateToken(token);

				//On affiche un Toast
				ToastAndroid.show('Inscription réussie', 5000);
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

	//fonction appelé lorsque on click sur l'avatar
	const handlePickAvatar = async () => {
		//on demande la permission d'ouvrir les photos
		getCameraPermission();

		//on va aller chercher une image au format 1/1
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
		});

		//si l'utilisateur à bien pris une image, alors on la met dans le state
		if (!result.cancelled) {
			setAvatar(result.uri);
		}
	};

	//function qui demande la permission d'acceder aux photos
	const getCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		//si il refuse on lui met une alerte
		if (status != 'granted') {
			alert('Il besoin de la camera');
		}
    };


	return (
		<View style={styles.container}>
			<Heading style={styles.title}>INSCRIPTION</Heading>
			<Error error={error} />
			<ProfilePicturePicker onPress={handlePickAvatar} avatarLink={avatar} randomAvatar={random}/>
			<Input
				style={styles.input}
				placeholder={'Mail'}
				keyboardType={'email-address'}
				value={mail}
				onChangeText={setMail}
			/>
			<Input style={styles.input} placeholder={'Nom'} value={nom} onChangeText={setNom} />
			<Input style={styles.input} placeholder={'Prenom'} value={prenom} onChangeText={setPrenom} />
			<Input
				style={styles.input}
				placeholder={'Mot de Passe'}
				//secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={"s'inscrire"}
				style={styles.loginButton}
				onPress={() => {
					register(mail, password, nom, prenom, avatar);
				}}
				loading={loading}
			/>
			<TextButton
				title="Déja inscrit ?"
				onPress={() => {
					navigation.pop();
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
		marginBottom: 0,
	},
	input: {
		marginVertical: 8,
	},
	loginButton: {
		marginVertical: 32,
	},
});

export default RegisterScreen;
