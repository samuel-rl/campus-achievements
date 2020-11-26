import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface SettingItemProps {
  texte: string;
}

const SettingItem = ({texte}:SettingItemProps) => {
	return (
		<View style={styles.container}>
      <Text style={styles.texte}>{texte}</Text>
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
    texte: {
        fontSize: 18,
        alignSelf: "center"
    }
});

export default SettingItem;
