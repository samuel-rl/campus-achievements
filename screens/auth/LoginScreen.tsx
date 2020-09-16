import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Button, TouchableOpacity, Text, ToastAndroid } from 'react-native';

import Fire from '../../config/Fire';

import Error from '../../components/auth/Error'

const LoginScreen = ({ navigation }: any) => {

    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [error, setError] = useState('aaaa');

    const connect = () => {
        Fire.shared.connect(mail, password).then(() => {ToastAndroid.show("Connexion ok", 1000); navigation.navigate('AppStack')}).catch((err) => setError(err.toString()))
    }

    
	return (
		<View style={styles.container}>
            <Error error={error} />
			<View style={styles.containerTextinput}>
                <TextInput style={styles.textinput} placeholder='Votre mail' onChangeText={(text) => setMail(text)} value={mail}></TextInput>
                <TextInput style={styles.textinput} placeholder='Votre mot de passe' onChangeText={(text) => setPassword(text)} secureTextEntry value={password}></TextInput>
            </View>
            <TouchableOpacity style={styles.containerButton} onPress={() => connect()}>
                <Text style={styles.textButton}>CONNEXION</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerAuthSwitch} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.authSwitch}>Je n'ai pas de compte</Text>
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

export default LoginScreen;
