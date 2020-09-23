import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Fire from '../../config/Fire';

const ParametersScreen = () => {

	return (
		<View style={styles.container}>
            <Button onPress={() => {Fire.shared.getPromos()}} title="getPromos"></Button>
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
