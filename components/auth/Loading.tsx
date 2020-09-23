import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';


import { colors } from '../../config/constants';

export interface SplashScreenProps {}

const SplashScreen = () => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;

	Animated.loop(Animated.timing(animatedValue, {
		toValue: 1,
		duration: 700,
		useNativeDriver: false,
	})).start();

	const dot1 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [2, -5, -10, -5, 2, 2, 2, 2, 2, 2, 2],
	});

	const dot2 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [2, 2, 2, -5, -10, -5, 2, 2, 2, 2, 2],
	});

	const dot3 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [2, 2, 2, 2, 2, -5, -10, -5, 2, 2, 2],
	});

	const dot4 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [2, 2, 2, 2, 2, 2, 2, -5, -10, -5, 2],
	});

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.dot,
					{
						backgroundColor: colors.almostWhite,
						transform: [
							{
								translateY: dot1,
							},
						],
					},
				]}
			/>
			<Animated.View
				style={[
					styles.dot,
					{
						backgroundColor: colors.foam,
						transform: [
							{
								translateY: dot2,
							},
						],
					},
				]}
			/>
			<Animated.View
				style={[
					styles.dot,
					{
						backgroundColor: colors.shrimp,
						transform: [
							{
								translateY: dot3,
							},
						],
					},
				]}
			/>
			<Animated.View
				style={[
					styles.dot,
					{
						backgroundColor: colors.lightBlue,
						transform: [
							{
								translateY: dot4,
							},
						],
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 20,
		marginHorizontal: 15,
	},
});

export default SplashScreen;