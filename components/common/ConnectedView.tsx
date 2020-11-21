import React from 'react';
import { StyleSheet, View , Animated} from 'react-native';

export interface ConnectedViewProps {
	children: JSX.Element;
    arrowDown: boolean;
    top: boolean;
    animatedStyle : any
}

const ConnectedView = ({ children, arrowDown, top, animatedStyle }: ConnectedViewProps) => {
	return (
		<View style={{marginTop: top ? 20 : 0}}>
			<View style={styles.div}>{children}</View>
			{arrowDown ? (
				<View style={styles.arrowDown}>
					<Animated.View style={[styles.left, {...animatedStyle}]}></Animated.View>
					<View style={styles.middle}></View>
					<Animated.View style={[styles.right, {...animatedStyle}]}></Animated.View>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	div: {
		marginHorizontal: 20,
		backgroundColor: 'white',
        borderRadius: 15,
        padding: 10
	},
	arrowDown: {
		alignSelf: 'center',
		flexDirection: 'row',
		height: 25,
	},
	left: {
		width: '49%',
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		zIndex: 3,
	},
	right: {
		width: '49%',
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		zIndex: 3,
	},
	middle: {
		marginHorizontal: '-4%',
		backgroundColor: 'white',
		width: '12%',
		zIndex: 2,
	},
});

export default ConnectedView;
