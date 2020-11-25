import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BasicUserInfos } from '../../../../config/constantType';

export interface ItemEnseignantProps {
	enseignant: BasicUserInfos;
}

const ItemEnseignant = ({ enseignant }: ItemEnseignantProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Image
					style={{ width: 50, height: 50, borderRadius: 100, marginRight: 20 }}
					source={{ uri: enseignant.avatar }}
				/>
			</View>
			<Text style={styles.name}>{enseignant.displayName}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 5,
		backgroundColor: 'white',
		marginHorizontal: 20,
		marginVertical: 10,
        borderRadius: 10,
        flexDirection: "row"
    },
    name: {
        fontSize: 18,
        alignSelf: "center"
    }
});

export default ItemEnseignant;
