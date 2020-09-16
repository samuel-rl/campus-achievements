import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

export interface HeadingProps {
    style: any;
    children :any;
}

const Heading = ({ children, style }: HeadingProps, ...props : any) => {
	return (
		<View>
			<Text {...props} style={[styles.text, style]}>
				{children}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
        marginTop: STATUSBAR_HEIGHT,
        fontSize: 32,
        color: "black",
        alignSelf: "center",
	},
});

export default Heading;