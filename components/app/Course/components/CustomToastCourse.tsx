import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export interface ToastProps {
    internalState: any;
    status: number;
}

const CustomToastCourse = ({ internalState, status }: ToastProps) => {

    let emoji;
    if(status == 1){
        emoji = require('../../../../assets/emojis/cool.png');
    }else if(status == 2){
        emoji = require('../../../../assets/emojis/in-love.png');
    }else{
        emoji = require('../../../../assets/emojis/rich.png');
    }

	return (
		<View style={styles.container}>
			<View style={styles.containerImage}>
				<Image
					style={styles.image}
					source={emoji}
				/>
			</View>
			<View style={styles.containerInfos}>
				<Text style={styles.titre}>{internalState.text1}</Text>
				<Text>{internalState.text2}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 100,
		width: '90%',
		backgroundColor: 'white',
		borderRadius: 12,
		flexDirection: 'row',
	},
	containerImage: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 70,
		height: 70,
	},
	containerInfos: {
		flex: 7,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	titre: {
		fontSize: 17,
		includeFontPadding: false,
		fontWeight: 'bold',
		marginBottom: 15,
	},
});

export default CustomToastCourse;
