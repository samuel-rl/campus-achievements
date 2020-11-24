import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Switch, ToastAndroid, Animated } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack';
import { colors, courseColors } from '../../../config/constants';
import Fire from '../../../config/Fire';
import { Skill, Quizz, BasicUserInfos, CourseWithoutUID } from '../../../config/constantType';
import ColorPalette from 'react-native-color-palette';
import ConnectedView from '../../../components/common/ConnectedView';

const AddCourseScreen = ({ navigation }: any) => {
	const [nom, setNom] = useState('');
	const [skills, setSkills] = useState<Skill[]>([]);
	const [color, setColor] = useState(courseColors[0]);
	const headerHeight = useHeaderHeight();
	const [animation, setAnimation] = useState<Animated.Value[]>([]);

	const [animationBg, setanimationBg] = useState(new Animated.Value(0));
	const [backgroundColor, setBackgroundColor] = useState(colors.background);

	const scrollViewRef = useRef<ScrollView | null>(null);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRight}
					onPress={() => {
						const userAdd: BasicUserInfos = {
							uid: Fire.shared.uid,
							avatar: Fire.shared.photoURL ? Fire.shared.photoURL : '',
							displayName: Fire.shared.displayName,
							token: Fire.shared.token,
						};
						const course: CourseWithoutUID = {
							color: color,
							enseignants: [userAdd],
							etudiants: [],
							nom: nom,
                            skills: skills,
                            messages: []
						};
						Fire.shared.addCourse(course).then(() => {
							navigation.navigate('Home');
						});
					}}
				>
					<Feather name="plus" size={25} color="#000" />
				</TouchableOpacity>
			),
		});
    }, [navigation, nom, skills]);
    

	const handleAnimation = () => {
        setBackgroundColor(color)
		Animated.timing(animationBg, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: false,
		}).start(() => {
            setanimationBg(new Animated.Value(0))
        });
	};

    
	const boxInterpolation = animationBg.interpolate({
		inputRange: [0, 1],
        outputRange: [backgroundColor, color],
    });
    
	const animatedStyle = {
		backgroundColor: boxInterpolation,
    };
    


	return (
		<Animated.View style={[{ ...animatedStyle }, {flex: 1}]}>
			<ScrollView
				ref={scrollViewRef}
				onContentSizeChange={() => {
					scrollViewRef?.current?.scrollToEnd({ animated: true });
				}}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					paddingTop: headerHeight,
					paddingBottom: 20,
				}}
			>
				<ConnectedView
                    animatedStyle={{...animatedStyle}}
					top={true}
					arrowDown={true}
					children={
						<TextInput
							style={styles.input}
							theme={{ colors: { text: '#000', primary: colors.blue } }}
							mode="outlined"
							label="Nom de la matière"
							value={nom}
							onChangeText={(text) => setNom(text)}
						/>
					}
				/>
				<ConnectedView
                    animatedStyle={{...animatedStyle}}
					top={false}
					arrowDown={true}
					children={
						<ColorPalette
							onChange={(colorValue) => {
                                setColor(colorValue);
                                handleAnimation();
							}}
							defaultColor={courseColors[0]}
							colors={courseColors}
							title={'Couleur de votre cours:'}
							icon={<Text>✔</Text>}
						/>
					}
				/>

				{skills.map((skill: Skill, index: number) => {
					return (
						<ConnectedView
                        animatedStyle={{...animatedStyle}}
							key={index}
							top={false}
							arrowDown={true}
							children={
								<Animated.View
									style={{
										transform: [
											{
												scale: animation[index].interpolate({
													inputRange: [0, 1],
													outputRange: [0, 1],
												}),
											},
										],
									}}
								>
									<TextInput
										style={styles.input}
										theme={{ colors: { text: '#000', primary: colors.blue } }}
										mode="outlined"
										label={'skill ' + (index + 1).toString()}
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
                                                newArr[index].quizz == null ? newArr[index].quizz=[] : newArr[index].quizz=null; 
												setSkills(newArr);
											}}
										/>
									</View>
									<View style={styles.containerSwitch}>
										<Text>Quizz : </Text>
										<Switch
											value={skills[index].quizz != null ? true : false}
											onValueChange={(res) => {
                                                let newArr = [...skills];
                                                res == true ? newArr[index].quizz = [] : newArr[index].quizz = null;
                                                newArr[index].autoEvaluate = !skills[index].autoEvaluate;
                                                setSkills(newArr);												
											}}
										/>
									</View>
									{skills[index].quizz != null ? (
										<View>
											{skills[index].quizz?.map((quizz: Quizz, indexQuestion: any) => {
												return (
													<View key={indexQuestion}>
														<Text style={styles.questiontitre}>
															Question {indexQuestion + 1}:
														</Text>
														<TextInput
															style={styles.inputQuestion}
															theme={{ colors: { text: '#000', primary: colors.blue } }}
															mode="outlined"
															label={'Intitulé'}
															value={quizz.question}
															onChangeText={(text) => {
																let tempArrSkill = skills.slice(0, skills.length - 1);
																let temp: Skill = skills[index];
																if (temp.quizz) {
																	temp.quizz[indexQuestion].question = text;
																}
																tempArrSkill = [...tempArrSkill, temp];
																setSkills(tempArrSkill);
															}}
														/>
														<TextInput
															style={styles.inputQuestion}
															theme={{ colors: { text: '#000', primary: colors.blue } }}
															mode="outlined"
															label={'Solution'}
															value={quizz.solution}
															onChangeText={(text) => {
																let tempArrSkill = skills.slice(0, skills.length - 1);
																let temp: Skill = skills[index];
																if (temp.quizz) {
																	temp.quizz[indexQuestion].solution = text;
																}
																tempArrSkill = [...tempArrSkill, temp];
																setSkills(tempArrSkill);
															}}
														/>
														<TextInput
															style={styles.inputQuestion}
															theme={{ colors: { text: '#000', primary: colors.blue } }}
															mode="outlined"
															label={'Autre choix'}
															value={quizz.propositions[0]}
															onChangeText={(text) => {
																let tempArrSkill = skills.slice(0, skills.length - 1);
																let temp: Skill = skills[index];
																if (temp.quizz) {
																	temp.quizz[indexQuestion].propositions[0] = text;
																}
																tempArrSkill = [...tempArrSkill, temp];
																setSkills(tempArrSkill);
															}}
														/>
														<TextInput
															style={styles.inputQuestion}
															theme={{ colors: { text: '#000', primary: colors.blue } }}
															mode="outlined"
															label={'Autre choix'}
															value={quizz.propositions[1]}
															onChangeText={(text) => {
																let tempArrSkill = skills.slice(0, skills.length - 1);
																let temp: Skill = skills[index];
																if (temp.quizz) {
																	temp.quizz[indexQuestion].propositions[1] = text;
																}
																tempArrSkill = [...tempArrSkill, temp];
																setSkills(tempArrSkill);
															}}
														/>
														<TextInput
															style={styles.inputQuestion}
															theme={{ colors: { text: '#000', primary: colors.blue } }}
															mode="outlined"
															label={'Autre choix'}
															value={quizz.propositions[2]}
															onChangeText={(text) => {
																let tempArrSkill = skills.slice(0, skills.length - 1);
																let temp: Skill = skills[index];
																if (temp.quizz) {
																	temp.quizz[indexQuestion].propositions[2] = text;
																}
																tempArrSkill = [...tempArrSkill, temp];
																setSkills(tempArrSkill);
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
												<AntDesign name="pluscircleo" size={20} color="#000" />
											</TouchableOpacity>
										</View>
									) : null}
								</Animated.View>
							}
						/>
					);
				})}

				<ConnectedView
                    animatedStyle={{...animatedStyle}}
					top={false}
					arrowDown={false}
					children={
						<View>
							<TouchableOpacity
								style={{ alignSelf: 'center', width: '100%', height: 35 }}
								onPress={() => {
									let newArr = [...skills];
									const newObj: Skill = {
										nom: '',
										autoEvaluate: true,
										isSoftSkill: false,
										quizz: null,
									};
									newArr.push(newObj);
									setSkills(newArr);

									const newAnimation = new Animated.Value(0);
									setAnimation([...animation, newAnimation]);
									Animated.timing(newAnimation, {
										toValue: 1,
										duration: 400,
										useNativeDriver: true,
									}).start();
								}}
							>
								<View style={{ alignSelf: 'center' }}>
									<AntDesign name="plus" size={35} color="black" />
								</View>
							</TouchableOpacity>
						</View>
					}
				/>
			</ScrollView>
		</Animated.View>
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
		marginTop: 10,
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
		marginTop: 20,
	},
	inputQuestion: {
		marginVertical: 1,
	},
});

export default AddCourseScreen;
