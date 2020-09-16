import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ErrorProps {
    error : string
}

const Error = ({error} : ErrorProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{error}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        paddingVertical : 2
    },
    text:{
        color: 'red',
        fontWeight: 'bold'
    }
});

export default Error;