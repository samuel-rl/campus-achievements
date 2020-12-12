import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
	divide,
	interpolate,
	Extrapolate,
	sub,
	cond,
	add,
	lessThan,
	multiply,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface RemoveNotificationProps {
	x: Animated.Node<number>;
	deleteOpacity: Animated.Node<number>;
}

const RemoveNotification = ({ x, deleteOpacity }: RemoveNotificationProps) => {
	const size = cond(lessThan(x, 100), x, add(x, sub(x, 100)));
	const translateX = cond(lessThan(x, 100), 0, divide(sub(x, 100), 2));
	const borderRadius = divide(size, 2);
	const scale = interpolate(size, {
		inputRange: [20, 30],
		outputRange: [0.01, 1],
		extrapolate: Extrapolate.CLAMP,
	});
	const iconOpacity = interpolate(size, {
		inputRange: [100 - 10, 100 + 10],
		outputRange: [1, 0],
	});
	const textOpacity = sub(1, iconOpacity);
	return (
		<Animated.View
			style={{
                backgroundColor: '#D93F12',
				borderRadius: 12,
				justifyContent: 'center',
				alignItems: 'center',
                height: size,
                maxHeight: 100,
				width: size,
				transform: [{ translateX }],
			}}
		>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					justifyContent: 'center',
					alignItems: 'center',
					opacity: iconOpacity,
					transform: [{ scale }],
				}}
			>
				<MaterialCommunityIcons name="delete" size={24} color="white" />
			</Animated.View>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					justifyContent: 'center',
					alignItems: 'center',
					opacity: multiply(textOpacity, deleteOpacity),
				}}
			>
				<Text style={styles.remove}>Supprimer</Text>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	remove: {
		color: 'white',
		fontSize: 14,
	},
});

export default RemoveNotification;
