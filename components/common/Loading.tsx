import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import { colors } from '../../config/constants';

const Loading = () => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;

	Animated.loop(Animated.timing(animatedValue, {
		toValue: 1,
		duration: 1200,
		useNativeDriver: false,
	})).start();
    
    
	const dot1 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [0, -15, -30, -15, 0, 0, 0, 0, 0, 0, 0],
	});

	const dot2 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [0, 0, 0, -15, -30, -15, 0, 0, 0, 0, 0],
	});

	const dot3 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [0, 0, 0, 0, 0, -15, -30, -15, 0, 0, 0],
	});

	const dot4 = animatedValue.interpolate({
		inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
		outputRange: [0, 0, 0, 0, 0, 0, 0, -15, -30, -15, 0],
	});

    

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.dot,
					{
						backgroundColor: colors.blue,
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    dot: {
		width: 25,
		height: 25,
		borderRadius: 20,
		marginHorizontal: 15,
	},
});

export default Loading;