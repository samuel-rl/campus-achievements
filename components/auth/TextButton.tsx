import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import {colors} from '../../config/constants';

const TextButton = ({ title, style, onPress }: any) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={styles.text}>{title.toUpperCase()}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 6,
    },
    text : {
        color: colors.shrimp,
        fontWeight: "500",
        fontSize: 14
    }
});

export default TextButton;
