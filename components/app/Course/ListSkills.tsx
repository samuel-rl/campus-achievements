import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Skill } from '../../../config/constantType';
import Fire from '../../../config/Fire';
import SkillItem from './components/SkillItem';

export interface ListSkillsProps {
    skills: Skill[];
    navigation: any,
    uidCourse: string | undefined;
}

const ListSkills = ({ skills, navigation, uidCourse }: ListSkillsProps) => {
	return (
		<View style={styles.container}>
			{skills.length == 0 ? (
				<Text style={styles.warningText}>Aucune compétences à débloquer</Text>
			) : (
				skills.map((skill: Skill, index: number) => {
                    var done = Fire.shared.uid ? skill.check.includes(Fire.shared.uid) : false;
					return <SkillItem key={index.toString()} done={done} skill={skill} navigation={navigation} uidCourse={uidCourse}/>;
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