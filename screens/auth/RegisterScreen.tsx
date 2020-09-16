import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity, View, Text, ToastAndroid } from 'react-native';

import Fire from '../../config/Fire';

export interface RegisterScreenProps {}

const RegisterScreen = ({ navigation }: any) => {
	const [mail, setMail] = useState('');
	const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const create = (mail: string, nom: string, prenom: string, password: string) => {
        setError('');
        Fire.shared.createUser(mail, password,nom,prenom, null).then(() => ToastAndroid.show("inscription ok", 1000)).catch((err) => setError(err.toString()))
    }

	return (
		<View style={styles.container}>
            <Text>INSCRIPTION</Text>
            <Text style={styles.error}>{error}</Text>
			<View style={styles.containerTextinput}>
				<TextInput
					style={styles.textinput}
					placeholder="Votre mail"
					onChangeText={(text) => setMail(text)}
					value={mail}
				></TextInput>
				<TextInput
					style={styles.textinput}
					placeholder="Votre nom"
					onChangeText={(text) => setNom(text)}
					value={nom}
				></TextInput>
				<TextInput
					style={styles.textinput}
					placeholder="Votre prenom"
					onChangeText={(text) => setPrenom(text)}
					value={prenom}
				></TextInput>
				<TextInput
					style={styles.textinput}
					placeholder="Votre mot de passe"
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
					value={password}
				></TextInput>
			</View>
			<TouchableOpacity style={styles.containerButton} onPress={() => create(mail, nom, prenom, password)}>
				<Text style={styles.textButton}>INSCRIPTION</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.containerAuthSwitch} onPress={() => navigation.navigate('Login')}>
				<Text style={styles.authSwitch}>J'ai deja un compte</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: "center",
    },
    containerTextinput: {
        marginHorizontal: 15,
        marginBottom: 30,
    },
    textinput: {
        paddingVertical: 20,
        marginVertical: 10,
        paddingLeft: 20,
        color: "black",
        marginBottom: 20,
        backgroundColor: "#e5e5e5",
    },
    containerAuthSwitch : {
        alignSelf: "center",
        marginTop: 30
    },
    authSwitch: {
        textDecorationLine: "underline",
        color: "#2a54c5"
    },
    containerButton: {
        backgroundColor: "#5e86f2",
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 60,
        paddingVertical: 20
    },
    textButton:{
        color: "white"
    },
    error : {
        color: "red",
        alignSelf: "center"
    }
});

export default RegisterScreen;
