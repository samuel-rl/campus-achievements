import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export interface LoginScreenProps {}

const LoginScreen = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<Button title="Je ne suis pas inscrit" onPress={() => {navigation.navigate('Register')}}></Button>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: "center"
    }
});

export default LoginScreen;
