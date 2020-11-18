import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../config/constants';

export interface ConnectedViewProps {
	children: JSX.Element;
    arrowDown: boolean;
    top: boolean;
}

const ConnectedView = ({ children, arrowDown, top }: ConnectedViewProps) => {
	return (
		<View style={{marginTop: top ? 20 : 0}}>
			<View style={styles.div}>{children}</View>
			{arrowDown ? (
				<View style={styles.arrowDown}>
					<View style={styles.left}></View>
					<View style={styles.middle}></View>
					<View style={styles.right}></View>
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
		height: 20,
	},
	left: {
		backgroundColor: colors.background,
		width: '49%',
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		zIndex: 3,
	},
	right: {
		backgroundColor: colors.background,
		width: '49%',
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		zIndex: 3,
	},
	middle: {
		marginHorizontal: '-2%',
		backgroundColor: 'white',
		width: '5%',
		zIndex: 2,
	},
});

export default ConnectedView;
