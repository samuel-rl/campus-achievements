import React, { createRef, useEffect, useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Animated,
	StatusBar,
	YellowBox,
	Modal,
	Dimensions,
	Button,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableHighlight,
} from 'react-native';
import { Course } from '../../config/constantType';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Students from '../../components/app/Course/Students';
import EnseignantsList from '../../components/app/Course/EnseignantsList';
import ListSkills from '../../components/app/Course/ListSkills';
import Discussion from '../../components/app/Course/Discussion';
import Fire from '../../config/Fire';
import Toast from 'react-native-toast-message';
import CustomToastCourse from '../../components/app/Course/components/CustomToastCourse';
export interface CourseScreenProps {}

const toastConfig = {
	un: (internalState) => <CustomToastCourse internalState={internalState} status={1}></CustomToastCourse>,
	deux: (internalState) => <CustomToastCourse internalState={internalState} status={2}></CustomToastCourse>,
	trois: (internalState) => <CustomToastCourse internalState={internalState} status={3}></CustomToastCourse>,
};

const { width, height } = Dimensions.get('window');

const CourseScreen = ({ navigation, route }) => {
	YellowBox.ignoreWarnings([
		'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
		'Animated.event now requires a second argument for options',
	]);
	const toast = createRef<any>();

	const [course, setCourse] = useState<Course>(route.params.item);
	const [scroll, setScroll] = useState<Animated.Value>(new Animated.Value(0));
	const [modalVisible, setModalVisible] = useState(false);

	const renderContent = (label) => (
		<View style={styles.content}>
			<Text>{label}</Text>
		</View>
	);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Fire.shared.getCoursesByUID(course.uid).then((c: Course) => {
				setCourse(c);
			});
		});
		return unsubscribe;
	}, [navigation]);

	const renderHeader = () => {
		const opacity = scroll.interpolate({
			inputRange: [0, 160, 210],
			outputRange: [0, 0.5, 1],
			extrapolate: 'clamp',
		});
		return (
			<View style={[styles.headerWrapper, { backgroundColor: course.color, justifyContent: 'space-between' }]}>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={{ marginHorizontal: 10 }}
						onPress={() => {
							navigation.navigate('Home');
						}}
					>
						<Feather name="arrow-left" size={25} color="#fff" />
					</TouchableOpacity>
					<Animated.View style={[{ opacity }]}>
						<Text style={styles.headerTitle}>{course.nom}</Text>
					</Animated.View>
				</View>
				<View style={{ marginHorizontal: 10 }}>
					<TouchableOpacity
						style={{ marginHorizontal: 10 }}
						onPress={() => {
							setModalVisible(true);
						}}
					>
						<Feather name="align-right" size={25} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderForeground = () => {
		const titleOpacity = scroll.interpolate({
			inputRange: [0, 106, 154],
			outputRange: [1, 0.5, 0],
			extrapolate: 'clamp',
		});

		return (
			<View style={styles.foreground}>
				<Animated.View style={{ opacity: titleOpacity }}>
					<Text style={styles.message}>{course.nom}</Text>
				</Animated.View>
			</View>
		);
	};

	const updateAutoEvaluateSkill = async (skillName: string) => {
		const rand = Math.floor(Math.random() * 3) + 1;
		let type: string;
		let titre: string;
		if (rand == 1) {
			type = 'un';
			titre = 'Quel boss';
		} else if (rand == 2) {
			type = 'deux';
			titre = 'Whoua !!';
		} else {
			type = 'trois';
			titre = 'En route vers le succès';
		}
		toast.current.show({
			type: type,
			position: 'bottom',
			text1: titre,
			text2: 'Tu as acquis "' + skillName + '"',
		});
		await Fire.shared.updateSkillBySkillName(skillName, course.uid);
	};

	const sendNotification = async (token: string, messageContent: string) => {
		const message = {
			to: token,
			sound: 'default',
			title: course.nom + ' - ' + Fire.shared.displayName,
			body: messageContent,
			data: { data: 'goes here' },
		};

		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
	};

	const sendNotificationsMessageToAll = async (message: string) => {
		course.tokens.map(async (token: string) => {
			if (token != Fire.shared.token) {
				sendNotification(token, message);
			}
		});
	};

	return (
		<>
			<StickyParallaxHeader
				rememberTabScrollPosition={false}
				foreground={renderForeground()}
				header={renderHeader()}
				parallaxHeight={200}
				headerSize={() => {}}
				headerHeight={50}
				onEndReached={() => {}}
				scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
				tabs={[
					{
						title: 'Cours',
						content: renderContent('Infos sur le cours'),
					},
					{
						title: 'Compétences',
						content: (
							<ListSkills
								updateAutoEvaluateSkill={(skillName: string) => updateAutoEvaluateSkill(skillName)}
								skills={course.skills}
								navigation={navigation}
								uidCourse={course.uid}
							/>
						),
					},
					{
						title: 'Discussion',
						content: (
							<Discussion
								messagesProps={course.messages}
								uidCourse={course.uid}
								onSendParent={(message: string) => sendNotificationsMessageToAll(message)}
							/>
						),
					},
					{
						title: 'Documents',
						content: renderContent('Documents'),
					},
					{
						title: 'Élèves',
						content: <Students students={course.etudiants} />,
					},
					{
						title: 'Enseignants',
						content: <EnseignantsList enseignants={course.enseignants} />,
					},
				]}
				tabTextStyle={styles.tabText}
				tabTextContainerStyle={styles.tabTextContainerStyle}
				tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
				tabsContainerBackgroundColor={course.color}
			/>
			<StatusBar barStyle="dark-content" backgroundColor={course.color} />
			<Modal
				transparent={true}
				animationType={'fade'}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableHighlight
					style={styles.backgroundModal}
					onPress={() => setModalVisible(false)}
					underlayColor={'transparent'}
				>
					<View />
				</TouchableHighlight>
				<View style={styles.outerContainerModal}>
					<View style={styles.containerModal}>
						<View style={styles.optionModal}>
							<Feather name="log-out" size={24} color="black" />
							<Text style={{textAlignVertical:"center", marginLeft: 15}}>Quitter le cours</Text>
						</View>
                        {
                        //<View style={styles.optionModalSeparator}/>
                        }
					</View>
				</View>
			</Modal>
			<Toast ref={toast} config={toastConfig} />
		</>
	);
};

const styles = StyleSheet.create({
	content: {
		marginTop: 50,
		justifyContent: 'center',
		alignContent: 'center',
	},
	foreground: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	message: {
		color: 'white',
		fontSize: 40,
		padding: 10,
	},
	headerWrapper: {
		alignItems: 'center',
		height: '100%',
		width: '100%',
		flexDirection: 'row',
	},
	headerTitle: {
		fontSize: 16,
		color: 'white',
	},
	tabTextContainerStyle: {
		backgroundColor: 'transparent',
		borderRadius: 18,
		marginHorizontal: 5,
		marginVertical: 5,
	},
	tabTextContainerActiveStyle: {
		backgroundColor: 'black',
	},
	tabText: {
		fontSize: 16,
		lineHeight: 20,
		paddingHorizontal: 12,
		paddingVertical: 8,
		color: 'white',
	},
	tabsWrapper: {
		paddingVertical: 12,
	},

	containerModal: {
		zIndex: 1,
		backgroundColor: 'white',
		width: 200,
		borderRadius: 5,
	},
	backgroundModal: {
		flex: 1,
	},
	outerContainerModal: {
		position: 'absolute',
		top: 50,
		right: 20,
		bottom: 0,
	},
	optionModal: {
        flexDirection: "row",
        padding: 10,
    },
    optionModalSeparator: {
        backgroundColor: '#edeef2',
        width: "100%",
        height: 1
    }
});

export default CourseScreen;
