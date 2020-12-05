import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export interface ToastProps {
	internalState: any;
	status: string;
}

const CustomToastQuizz = ({ internalState, status }: ToastProps) => {

    const happy = require('../../../../assets/emojis/happy.png');
    const surprised = require('../../../../assets/emojis/surprised.png');
    const injured = require('../../../../assets/emojis/injured.png');

    let emoji;
    if(status == "good"){
        emoji = happy
    }else if(status == 'bad'){
        emoji = injured
    }else{
        emoji = surprised
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

export default CustomToastQuizz;
