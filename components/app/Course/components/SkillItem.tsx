import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Skill } from '../../../../config/constantType';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

export interface SkillItemProps {
	skill: Skill;
    done: boolean;
    navigation: any;
    uidCourse: string | undefined;
    updateAutoEvaluateSkill: Function;
}

const SkillItem = ({ skill, navigation, uidCourse, done, updateAutoEvaluateSkill }: SkillItemProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(done);


	return (
		<TouchableOpacity style={[styles.container, {backgroundColor : isDone ? "#99f3bd" : "#fff"}]} activeOpacity={1} onPress={() => {
            if(!isDone){
                if(skill.quizz != null){
                    navigation.navigate('QuizzScreen', {skill : skill, uidCourse: uidCourse})
                }else{
                    setLoading(true)
                    updateAutoEvaluateSkill(skill.nom).then(() => {
                        setIsDone(true);
                        setLoading(false)
                    })
                }
            } 
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
                {loading ? <ActivityIndicator /> : isDone ? <View></View> : <SimpleLineIcons name="arrow-right" size={15} color="black" />}
				{}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
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
