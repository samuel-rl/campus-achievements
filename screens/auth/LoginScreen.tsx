import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid, Platform, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import Fire from '../../config/Fire';

import Error from '../../components/auth/Error';
import Heading from '../../components/auth/Heading';
import FilledButton from '../../components/auth/FilledButton';
import Input from '../../components/auth/Input';
import TextButton from '../../components/auth/TextButton';

import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

import faker from 'faker';
import initialRewards from '../../config/rewards';
import { BasicUserInfos, Course, Skill } from '../../config/constantType';
import { IMessage } from 'react-native-gifted-chat';

const LoginScreen = ({ navigation }: any) => {
	const [password, setPassword] = useState('');
	const [mail, setMail] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<null | string | undefined>(null);
	const [loadingBDD, setLoadingBDD] = useState<boolean>(false);

	useEffect(() => {
		// registerForPushNotificationsAsync();
	});

	async function registerForPushNotificationsAsync() {
		console.log('registerForPushNotificationsAsync...');
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
		} else {
			alert('Must use physical device for Push Notifications');
		}

		setToken(token);

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		return token;
	}

	//fonction appeler lorsque il clique sur s'inscrire
	const connect = () => {
		//On réinitialise l'error
		setError('');
		//On lance le loader
		setLoading(true);
		Fire.shared
			.connect(mail, password)
			.then(async () => {
				//si l'inscription est réussi :
				await Fire.shared.updateToken(token);

				//On affiche un Toast
				ToastAndroid.show('Connexion réussi', 5000);
				//on change de stack
				navigation.reset({
					index: 0,
					routes: [{ name: 'AppStack' }],
				});
			})
			.catch((err) => {
				//si on à une erreur :
				//on met l'erreur dans le state
				setError(err.toString());
				//on remet le loader a false
				setLoading(false);
			});
    };
    
    const addTobdd = async () => {
		setLoadingBDD(true);
		let arrOfCourse: Course[] = [];
		for (var i = 0; i < 40; i++) {
			var x = faker.random.uuid();
			let db = Fire.shared.firestore.collection('users').doc(x);
			const randomStud = Math.floor(Math.random() * Math.floor(10));
			const student = randomStud < 7 ? 1 : 0;

			var ava = 'https://source.unsplash.com/random/200x200?sig=' + (i + 1);

			const user = {
				nom: faker.name.lastName(),
				prenom: faker.name.firstName(),
				token: '',
				email: faker.internet.email(),
				avatar: ava,
				etudiant: student == 1 ? true : false,
				annee: student == 1 ? 'M1' : null,
				filiere: student == 1 ? 'GEO' : null,
				rewards: initialRewards,
			};
			const userAdd: BasicUserInfos = {
				uid: x,
				avatar: user.avatar,
				displayName: user.prenom + ' ' + user.nom,
				token: '',
			};

			await db.set(user);

			if (student == 0) {
				const joinCourseAsTeacher = Math.floor(Math.random() * Math.floor(2));

				if (joinCourseAsTeacher == 1) {
					const nbCourseToJoin = Math.floor(Math.random() * Math.floor(arrOfCourse.length / 10));
                    
                    var arr:number[] = [];
                    while (arr.length < nbCourseToJoin) {
                        var r = Math.floor(Math.random() * arrOfCourse.length) + 1;
                        if (arr.indexOf(r) === -1) arr.push(r);
                    }

                    arr.map(async (arrobj) => {
                        let course = arrOfCourse[arrobj];
                        let dbCours = Fire.shared.firestore.collection('cours').doc(course.uid);
    
                        await dbCours.update({
                            enseignants: Fire.shared.firebase.firestore.FieldValue.arrayUnion(userAdd),
                        });
                        await db.update({
                            coursEnseignant: Fire.shared.firebase.firestore.FieldValue.arrayUnion(course),
                        });
    
                        let nbMessage = Math.floor(Math.random() * Math.floor(5));
    
                        for (var m = 0; m < nbMessage; ++m) {
                            const message: IMessage = {
                                _id: faker.random.uuid(),
                                createdAt: faker.date.past(),
                                text: faker.hacker.phrase(),
                                user: {
                                    _id: x,
                                    avatar: ava,
                                    name: userAdd.displayName ? userAdd.displayName : ' ',
                                },
                            };
                            await dbCours.update({
                                messages: Fire.shared.firebase.firestore.FieldValue.arrayUnion(message),
                            });
                        }
                    });

				}

				const nbCourseCreate = Math.floor(Math.random() * Math.floor(5));
				for (var j = 0; j < nbCourseCreate; ++j) {
					const nbSkill = Math.floor(Math.random() * Math.floor(8));
					var skills: Skill[] = [];
					for (var k = 0; k < nbSkill; ++k) {
						let sk: Skill = {
							autoEvaluate: true,
							isSoftSkill: true,
							nom: faker.company.catchPhraseNoun(),
							quizz: [],
						};
						skills.push(sk);
					}

					const course: any = {
						color: faker.commerce.color(),
						enseignants: [userAdd],
						etudiants: [],
						nom: faker.commerce.productName(),
						skills: skills,
						messages: [],
					};

					var newCourseRef = Fire.shared.firestore.collection('cours').doc();
					var id = newCourseRef.id;
					newCourseRef.set(course);
					course.uid = id;
					await db.update({
						coursEnseignant: Fire.shared.firebase.firestore.FieldValue.arrayUnion(course),
					});
					arrOfCourse.push(course);
				}
			} else {
				const nbCourseEnter = Math.floor(Math.random() * Math.floor(arrOfCourse.length / 2));

				var arr:number[] = [];
				while (arr.length < nbCourseEnter) {
					var r = Math.floor(Math.random() * arrOfCourse.length) + 1;
					if (arr.indexOf(r) === -1) arr.push(r);
				}

				arr.map(async (arrobj) => {
					let course = arrOfCourse[arrobj];
					let dbCours = Fire.shared.firestore.collection('cours').doc(course.uid);

					await dbCours.update({
						etudiants: Fire.shared.firebase.firestore.FieldValue.arrayUnion(userAdd),
					});
					await db.update({
						cours: Fire.shared.firebase.firestore.FieldValue.arrayUnion(course),
					});

					let nbMessage = Math.floor(Math.random() * Math.floor(5));

					for (var m = 0; m < nbMessage; ++m) {
						const message: IMessage = {
							_id: faker.random.uuid(),
							createdAt: faker.date.past(),
							text: faker.hacker.phrase(),
							user: {
								_id: x,
								avatar: ava,
								name: userAdd.displayName ? userAdd.displayName : ' ',
							},
						};
						await dbCours.update({
							messages: Fire.shared.firebase.firestore.FieldValue.arrayUnion(message),
						});
					}
				});
			}
		}
		setLoadingBDD(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={{ position: 'absolute', top: 30, right: 0 }} onPress={() => {addTobdd()}}>
				{loadingBDD ? <ActivityIndicator /> : <Feather name="globe" size={24} color="black" />}
			</TouchableOpacity>
			<Heading style={styles.title}>CONNEXION</Heading>
			<Error error={error} />
			<Input
				style={styles.input}
				placeholder={'Mail'}
				keyboardType={'email-address'}
				value={mail}
				onChangeText={setMail}
			/>
			<Input
				style={styles.input}
				placeholder={'Mot de Passe'}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={'Me connecter'}
				style={styles.loginButton}
				onPress={() => {
					connect();
				}}
				loading={loading}
			/>
			<TextButton
				title="Pas encore inscrit ?"
				onPress={() => {
					navigation.navigate('Register');
				}}
			/>
			<TextButton
				title="Mot de passe oublié ?"
				onPress={() => {
					console.log("mot de passe oublié log");
					navigation.navigate('ForgottenPassword');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	title: {
		marginBottom: 20,
	},
	input: {
		marginVertical: 8,
	},
	loginButton: {
		marginVertical: 32,
	},

});

export default LoginScreen;
