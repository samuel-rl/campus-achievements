import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { BasicUserInfos } from '../../../config/constantType';
import ItemStudent from './components/ItemStudent';

export interface StudentsProps {
	students: BasicUserInfos[];
}

const Students = ({ students }: StudentsProps) => {
	return (
		<ScrollView style={styles.container}>
			{students.map((student: BasicUserInfos, index: number) => {
				return <ItemStudent key={index.toString()} student={student} />;
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Students;
