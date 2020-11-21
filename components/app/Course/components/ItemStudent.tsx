import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BasicUserInfos } from '../../../../config/constantType';

export interface ItemStudentProps {
	student: BasicUserInfos;
}

const ItemStudent = ({ student }: ItemStudentProps) => {
	return (
		<View style={styles.container}>
			<View>
				<Image
					style={{ width: 50, height: 50, borderRadius: 100, marginRight: 20 }}
					source={{ uri: student.avatar }}
				/>
			</View>
			<Text style={styles.name}>{student.displayName}</Text>
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

export default ItemStudent;
