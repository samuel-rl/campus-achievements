import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Fire from '../../config/Fire';

const ParametersScreen = () => {

	const logout = () => {
        Fire.shared.signOut();
    }

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.action} onPress={logout}>
				<Text style={styles.text}>Déconnexion</Text>
				<Feather name="log-out" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		marginHorizontal: 40,
	},
	action: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 20,
	},
	text: {
		fontSize: 24,
	},
});

export default ParametersScreen;
