import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export interface LoginScreenProps {}

const Input = ({ style, ...props }: any) => {
	return <TextInput {...props} style={[styles.input, style]} autoCapitalize="none" />;
};

const styles = StyleSheet.create({
	input: {
        backgroundColor: "#e8e8e8",
        padding: 15,
        borderRadius: 8,
        width: "100%"
	},
});

export default Input;
