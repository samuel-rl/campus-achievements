import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import {colors} from '../../config/constants';

import Loading from '../../components/auth/Loading';

export interface FilledButtonProps {
    title : string,
    style: StyleSheet,
    onPress: Function,
    loading :boolean
}

const FilledButton = ({ title, style, onPress, loading }: any) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			{loading ? <Loading /> : <Text style={styles.text}>{title.toUpperCase()}</Text>}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
        backgroundColor: colors.blue,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 8,
        height: 50
    },
    text:{
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});

export default FilledButton;
