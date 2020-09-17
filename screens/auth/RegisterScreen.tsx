import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';

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

	const register = (mail: string, nom: string, prenom: string, password: string, avatar: null | string) => {
        setError('');
        setLoading(true);
		Fire.shared
			.createUser(mail, password, nom, prenom, avatar)
			.then(() => {
				ToastAndroid.show('Inscription réussi', 5000);
				navigation.navigate('AppStack');
			})
			.catch((err) => {setError(err.toString()); setLoading(false)});
	};

	const handlePickAvatar = async () => {
		getCameraPermission();

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
		});

		if (!result.cancelled) {
			setAvatar(result.uri);
		}
	};

	const getCameraPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status != 'granted') {
			alert('Il besoin de la camera');
		}
	};

	return (
		<View style={styles.container}>
			<Heading style={styles.title}>INSCRIPTION</Heading>
			<Error error={error} />
			<ProfilePicturePicker onPress={handlePickAvatar} avatarLink={avatar} />
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
				secureTextEntry
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
