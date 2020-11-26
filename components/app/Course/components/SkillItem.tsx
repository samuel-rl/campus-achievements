import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Skill } from '../../../../config/constantType';
import { SimpleLineIcons } from '@expo/vector-icons';

export interface SkillItemProps {
	skill: Skill;
    done: boolean;
    navigation: any
}

const SkillItem = ({ skill, navigation }: SkillItemProps) => {
	return (
		<TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => {
            navigation.navigate('QuizzScreen', skill)
        }}>
			<View style={styles.containerInfos}>
				<Text style={styles.titre}>{skill.nom}</Text>
				<View style={styles.icons}>
					{skill.autoEvaluate ? (
						<Image style={styles.image} source={require('../../../../assets/icons/tick.png')} />
                    ) : <Image style={styles.image} source={require('../../../../assets/icons/question.png')} /> }
                    {skill.isSoftSkill ? <Image style={styles.image} source={require('../../../../assets/icons/bear.png')} /> : null}
				</View>
			</View>
			<View style={styles.containerMore}>
				<SimpleLineIcons name="arrow-right" size={15} color="black" />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		height: 80,
		marginVertical: 10,
		borderRadius: 20,
		flexDirection: 'row',
		paddingVertical: 15,
	},
	containerInfos: {
		flex: 8,
		paddingLeft: 15,
		justifyContent: 'space-between',
	},
	titre: {
		fontSize: 16,
		includeFontPadding: false,
		fontWeight: 'bold',
	},
	containerMore: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icons: {
		paddingVertical: 5,
		flexDirection: 'row',
	},
	image: {
		marginHorizontal: 5,
		width: 30,
		height: 30,
	},
});

export default SkillItem;
