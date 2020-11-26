import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Skill } from '../../../config/constantType';
import SkillItem from './components/SkillItem';

export interface ListSkillsProps {
    skills: Skill[];
    navigation: any
}

const ListSkills = ({ skills, navigation }: ListSkillsProps) => {

	return (
		<View style={styles.container}>
			{skills.length == 0 ? (
				<Text style={styles.warningText}>Aucune compétences à débloquer</Text>
			) : (
				skills.map((skill: Skill, index: number) => {
					return <SkillItem key={index.toString()} done={false} skill={skill} navigation={navigation}/>;
				})
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
    },
	warningText: {
        color: 'red',
        marginTop: 30,
        alignSelf: "center",
        fontSize: 18
	},
});

export default ListSkills;


/*
style={[
										{ width: 70, height: 70 },
										item.done ? null : { tintColor: 'gray', opacity: 0.1 },
									]}
*/