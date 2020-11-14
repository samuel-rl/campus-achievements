import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../config/constants';

export interface ConnectedViewProps {}

const ConnectedView = () => {
	return (
		<View>
			<View style={styles.div}></View>
			<View style={styles.arrowDown}>
				<View style={styles.left}></View>
				<View style={styles.middle}></View>
				<View style={styles.right}></View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    div: {
        marginHorizontal: 20,
        height: 70,
        backgroundColor: "white",
        borderRadius: 50
    },
    arrowDown :{
        alignSelf: "center",
        flexDirection:"row",
        height: 20
    },
    left: {
        backgroundColor: colors.background,
        width: "49%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 3,
    },
    right: {
        backgroundColor: colors.background,
        width: "49%",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: 3,
    },
    middle:{
        marginHorizontal: "-2%",
        backgroundColor: "white",
        width: "5%",
        zIndex: 2,
    }
});

export default ConnectedView;
