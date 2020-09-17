import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Button, TouchableOpacity, Text, ToastAndroid } from 'react-native';

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

	const connect = () => {
        setError('');
        setLoading(true);
		Fire.shared
			.connect(mail, password)
			.then(() => {
				ToastAndroid.show('Connexion réussi', 5000);
				navigation.navigate('AppStack');
			})
			.catch((err) => {setError(err.toString()); setLoading(false)});
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
					connect()
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
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20
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
