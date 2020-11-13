import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Switch, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { colors } from '../../../config/constants';
import Fire from '../../../config/Fire';
import { Skill, Quizz, BasicUserInfos, CourseWithoutUID } from '../../../config/constantType';




const AddCourseScreen = ({ navigation, route }: any) => {
	const [nom, setNom] = useState('');
    const [skills, setSkills] = useState<Skill[]>([]);
    const [color, setColor] = useState("")

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRight}
					onPress={() => {
                        const userAdd:BasicUserInfos = {
                            uid: Fire.shared.uid,
                            avatar: Fire.shared.photoURL,
                            displayName: Fire.shared.displayName,
                            token: Fire.shared.token,
                        };
                        const course:CourseWithoutUID = {
                            color: color,
                            enseignants: [userAdd],
                            etudiants: [],
                            nom: nom,
                            skills: skills,
                        }
                        Fire.shared.addCourse(course)
                        ToastAndroid.show("Ajouté", 2000);
					}}
				>
					<Feather name="plus-circle" size={25} color="black" />
				</TouchableOpacity>
			),
		});
    }, [navigation, nom, skills]);
    
    useEffect(() => {
        const rand = Math.floor(Math.random() * Math.floor(3))
        switch (rand) {
            case 0:
                setColor("#fa1616");
                break;
            case 1:
                setColor("#ffdd67");
                break;
            case 2:
                setColor("#7577cd");
                break;
            default:
                break;
        }
    }, [])

	return (
		<View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					marginHorizontal: 20,
					paddingTop: 100,
					paddingBottom: 20,
				}}
			>
				<TextInput
					style={styles.input}
					theme={{ colors: { text: '#000', primary: colors.blue } }}
					mode="outlined"
					label="Nom de la matière"
					value={nom}
					onChangeText={(text) => setNom(text)}
				/>
				<Text>Skills : </Text>
				{skills.map((x: any, index: any) => {
					return (
						<View key={index} style={styles.skills}>
							<TextInput
								style={styles.input}
								theme={{ colors: { text: '#000', primary: colors.blue } }}
								mode="outlined"
								label={'skill ' + (parseInt(index) + 1).toString()}
								value={skills[index].nom}
								onChangeText={(text) => {
									let newArr = [...skills];
									newArr[index].nom = text;
									setSkills(newArr);
								}}
							/>
							<View style={styles.containerSwitch}>
								<Text>Auto Evalution : </Text>
								<Switch
									value={skills[index].autoEvaluate}
									onValueChange={() => {
										let newArr = [...skills];
										newArr[index].autoEvaluate = !skills[index].autoEvaluate;
										setSkills(newArr);
									}}
								/>
							</View>
							<View style={styles.containerSwitch}>
								<Text>Quizz : </Text>
								<Switch
									value={skills[index].quizz != null ? true : false}
									onValueChange={(res) => {
										if (res == true) {
											let newArr = [...skills];
											newArr[index].quizz = [];
											setSkills(newArr);
										} else {
											let newArr = [...skills];
											newArr[index].quizz = null;
											setSkills(newArr);
										}
									}}
								/>
							</View>
							{skills[index].quizz != null ? (
								<View>
									{skills[index].quizz?.map((question: any, indexQuestion: any) => {
										return (
											<View key={indexQuestion}>
                                                <Text style={styles.questiontitre}>Question {indexQuestion+1}:</Text>
												<TextInput
													style={styles.inputQuestion}
													theme={{ colors: { text: '#000', primary: colors.blue } }}
													mode="outlined"
													label={"Intitulé"}
													value={skills[index].quizz[indexQuestion].question}
													onChangeText={(text) => {
                                                        let newArr = [...skills];
                                                        newArr[index].quizz[indexQuestion].question = text;
                                                        setSkills(newArr);
													}}
												/>
												<TextInput
													style={styles.inputQuestion}
													theme={{ colors: { text: '#000', primary: colors.blue } }}
													mode="outlined"
													label={'Solution'}
													value={skills[index].quizz[indexQuestion].solution}
													onChangeText={(text) => {
														let newArr = [...skills];
                                                        newArr[index].quizz[indexQuestion].solution = text;
                                                        setSkills(newArr);
													}}
												/>
												<TextInput
													style={styles.inputQuestion}
													theme={{ colors: { text: '#000', primary: colors.blue } }}
													mode="outlined"
													label={'Autre choix'}
													value={skills[index].quizz[indexQuestion].propositions[0]}
													onChangeText={(text) => {
														let newArr = [...skills];
                                                        newArr[index].quizz[indexQuestion].propositions[0] = text;
                                                        setSkills(newArr);
													}}
												/>
												<TextInput
													style={styles.inputQuestion}
													theme={{ colors: { text: '#000', primary: colors.blue } }}
													mode="outlined"
													label={'Autre choix'}
													value={skills[index].quizz[indexQuestion].propositions[1]}
													onChangeText={(text) => {
                                                        let newArr = [...skills];
                                                        newArr[index].quizz[indexQuestion].propositions[1] = text;
                                                        setSkills(newArr);
													}}
												/>
												<TextInput
													style={styles.inputQuestion}
													theme={{ colors: { text: '#000', primary: colors.blue } }}
													mode="outlined"
													label={'Autre choix'}
													value={skills[index].quizz[indexQuestion].propositions[2]}
													onChangeText={(text) => {
                                                        let newArr = [...skills];
                                                        newArr[index].quizz[indexQuestion].propositions[2] = text;
                                                        setSkills(newArr);
													}}
												/>
											</View>
										);
									})}
									<TouchableOpacity
										style={styles.moreQuizz}
										onPress={() => {
											let newArr = [...skills];
											const quizz: Quizz = {
												question: '',
												propositions: ['', '', ''],
												solution: '',
											};
											newArr[index].quizz?.push(quizz);
											setSkills(newArr);
										}}
									>
										<AntDesign name="pluscircleo" size={20} color="black" />
									</TouchableOpacity>
								</View>
							) : null}
						</View>
					);
				})}
				<TouchableOpacity
					style={styles.more}
					onPress={() => {
						let newArr = [...skills];
						const newObj: Skill = {
							nom: '',
							autoEvaluate: false,
							isSoftSkill: false,
							quizz: null,
						};
						newArr.push(newObj);
						setSkills(newArr);
					}}
				>
					<AntDesign name="pluscircleo" size={30} color="black" />
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginVertical: 7,
	},
	more: {
		marginTop: 15,
		alignSelf: 'center',
    },
    moreQuizz: {
		marginVertical: 20,
		alignSelf: 'center',
	},
	headerRight: {
		marginRight: 20,
	},
	skills: {
		backgroundColor: '#E0E0E0',
		marginVertical: 5,
		paddingHorizontal: 5,
		borderRadius: 8,
	},
	containerSwitch: {
		marginVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-around',
    },
    questiontitre: {
        marginTop: 20
    },
    inputQuestion: {
        marginVertical: 1
    }
});

export default AddCourseScreen;
