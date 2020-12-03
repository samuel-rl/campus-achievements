import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';
import initialRewards from './rewards';

//config pris sur Firebase
var firebaseConfig = {
	apiKey: 'AIzaSyC3D8lS7xO1cjw9csov-TRah9XtIWjDuB0',
	authDomain: 'campus-achievements.firebaseapp.com',
	databaseURL: 'https://campus-achievements.firebaseio.com',
	projectId: 'campus-achievements',
	storageBucket: 'campus-achievements.appspot.com',
	messagingSenderId: '206721630249',
	appId: '1:206721630249:web:e5fece1948fc5939995c38',
};

//class qui va gérer les échanges avec firebase
//Je peux avoir accèes à l'instance de Fire en faisant :
//   importation   =>   import Fire from '../../config/Fire';
//   appel   =>   Fire.shared.LE-NOM-DE-LA-METHODE()
//           =>   FIRE.shared.GETTER
class Fire {
	student = null;
	connectedToInternet = false;
	token = null;

	//constructeur qui initialise la connexion avec notre config
	constructor() {
		firebase.initializeApp(firebaseConfig);
		this.student = false;
	}

	/**
	 * Function allowing us to change password of an user
	 * @param {} email the mail of the person which we want to change the password
	 */
	passwordReset = email => firebase.auth().sendPasswordResetEmail(email);

	//function de connexion de compte sur Firebase avec email et mot de passe
	connect = async (mail, password) => {
		console.log('connect...');
		//retourne une promesse
		return new Promise(async (res, rej) => {
			await firebase
				.auth()
				.signInWithEmailAndPassword(mail, password)
				//si ça se passe bien on retourne 'l'etat' de l'utilisateur ?
				.then(x => {
					res(x);
				})
				//sinon on renvoie l'erreur
				.catch(err => {
					rej(err);
				});
		});
	};

	//function qui va uploader la photo
	uploadPhotoAsync = async (uri, filename) => {
		console.log('uploadPhotoAsync...');
		return new Promise(async (res, rej) => {
			const response = await fetch(uri);
			const file = await response.blob();

			let upload = firebase.storage().ref(filename).put(file);

			upload.on(
				'state_changed',
				snapshot => {},
				err => {
					//on renvoie l'erreur si il y en a une
					rej(err);
				},
				async () => {
					const url = await upload.snapshot.ref.getDownloadURL();
					res(url);
				}
			);
		});
	};

	updatePhotoAsync = async uri => {
		const filename = `avatars/${this.uid}`;
		return new Promise(async (res, rej) => {
			const response = await fetch(uri);
			const file = await response.blob();

			let upload = firebase.storage().ref(filename).put(file);

			upload.on(
				'state_changed',
				snapshot => {},
				err => {
					rej(err);
				},
				async () => {
					const url = await upload.snapshot.ref.getDownloadURL();
					var user = firebase.auth().currentUser;
					user.updateProfile({
						photoURL: url,
					});
					res(url);
				}
			);
		});
	};

	//fonction de creation d'utilisateur:
	createUser = async (mail, password, nom, prenom, avatar, isStudent, annee, filliere) => {
		this.student = isStudent;
		return new Promise(async (res, rej) => {
			let remoteUri = null;
			try {
				//creation du compte sur firebase
				await firebase.auth().createUserWithEmailAndPassword(mail, password).then(res => {
					const user = firebase.auth().currentUser;
					user.updateProfile({
						displayName: prenom + ' ' + nom,
					});
				});

				//on rajoute dans la collection Users (l'ID sera son UID)
				let db = this.firestore.collection('users').doc(this.uid);

				//On met dans son document ses informations
				db.set({
					nom: nom,
					prenom: prenom,
					mail: mail,
					avatar: null,
					etudiant: isStudent,
					annee: annee,
					filliere: filliere,
					rewards: initialRewards,
				});

				var urls = [
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F1.png?alt=media&token=00e9fa2f-0eb7-4832-8de2-925142a953ed',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F2.png?alt=media&token=16d05215-4118-46c3-a016-2e9c90ab98d1',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F3.png?alt=media&token=a3149d59-49eb-4de9-b7df-e610df96e1e4',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F4.png?alt=media&token=10504956-d153-4321-950b-52d289536127',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F5.png?alt=media&token=d3dc2402-cb26-4516-93c6-b2327300c26f',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F1.png?alt=media&token=00e9fa2f-0eb7-4832-8de2-925142a953ed',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F7.png?alt=media&token=7f022791-ec69-4718-87c3-8a821e52492c',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F8.png?alt=media&token=eceab596-7b03-41f5-84a1-5676b075fc6a',
					'https://firebasestorage.googleapis.com/v0/b/campus-achievements.appspot.com/o/assets%2F9.png?alt=media&token=c7c3d7c7-e4f9-458b-a1a8-eadbc2761d23',
				];

				if (typeof avatar == 'string') {
					remoteUri = await this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);
					db.set({ avatar: remoteUri }, { merge: true });
					var user = firebase.auth().currentUser;
					user.updateProfile({
						photoURL: remoteUri,
					});
				} else {
					db.set({ avatar: urls[avatar - 1] }, { merge: true });
					var user = firebase.auth().currentUser;
					user.updateProfile({
						photoURL: urls[avatar - 1],
					});
				}
				firebase.database().ref().child(`Users/${this.uid}`).set({
					nom: nom,
					prenom: prenom,
					mail: mail,
					avatar: avatar,
				});
				res('inscription ok');
			} catch (error) {
				//on renvoie l'erreur si il y en a une
				console.log(error.code);
				console.log(error.message);
				console.log({ error });
				rej(error);
			}
		});
	};

	/* ******************************
                 add
    ****************************** */
	addCourse = async course => {
		console.log('addCourse...');
		return new Promise(async (res, rej) => {
			try {
                var newCourseRef = this.firestore.collection('cours').doc();
                
				var id = newCourseRef.id;
                await newCourseRef.set(course);
                await newCourseRef.update({
                    tokens: firebase.firestore.FieldValue.arrayUnion(this.token),
                });

				course.uid = id;

				let dbUser = this.firestore.collection('users').doc(this.uid);
				await dbUser.update({
                    coursEnseignant: firebase.firestore.FieldValue.arrayUnion(course),
                    
                });
				res(true);
			} catch (error) {
				rej(error);
			}
		});
	};

	/* ******************************
                 get
    ****************************** */

	getPromos = async () => {
		console.log('getPromos...');
		return new Promise(async (res, rej) => {
			try {
				let response = [];
				let i = 0;
				let db = this.firestore.collection('promos');
				db
					.get()
					.then(querySnapshot => {
						let docs = querySnapshot.docs;
						for (let doc of docs) {
							const selectedEvent = {
								name: doc.id,
								items: doc.data().matieres,
							};
							response.push(selectedEvent);
						}
					})
					.then(() => res(response));
			} catch (error) {
				rej(error);
			}
		});
	};

	getIsStudent = async () => {
		console.log('getIsStudent...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('users').doc(this.uid);
				db.get().then(querySnapshot => {
					this.student = querySnapshot.data().etudiant;
					res(true);
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	getAllCourses = async () => {
		console.log('getAllCourses...');
		return new Promise(async (res, rej) => {
			let courses = [];
			try {
				let db = this.firestore.collection('cours');
				await db.get().then(querySnapshot => {
					let docs = querySnapshot.docs;
					for (let doc of docs) {
						data = doc.data();
						data.uid = doc.id;
						courses.push(data);
					}
				});
				res(courses);
			} catch (error) {
				rej(error);
			}
		});
	};

	getCoursesByUID = async uidCourse => {
		console.log('getCoursesByUID...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('cours').doc(uidCourse);
				await db.get().then(querySnapshot => {
					const data = querySnapshot.data();
                    data.uid = querySnapshot.id;
                    data.messages.map(mess => {
                        mess.createdAt = new Date(mess.createdAt.seconds * 1000);
                    });
					res(data);
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	getMyInfos = async () => {
		console.log('getMyInfos...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('users').doc(this.uid);
				await db.get().then(querySnapshot => {
					const data = querySnapshot.data();
					res(data);
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	getMyCoursesInformationsByUID = async arrayUID => {
		console.log('getMyCoursesInformationsByUID...');
		return new Promise(async (res, rej) => {
			let courses = [];
			try {
				let db = this.firestore.collection('cours');
				await db.get().then(querySnapshot => {
					let docs = querySnapshot.docs;
					for (let doc of docs) {
						if (arrayUID.includes(doc.id)) {
							data = doc.data();
							data.uid = doc.id;
							data.messages.map(mess => {
                                mess.createdAt = new Date(mess.createdAt.seconds * 1000);
                            });
							courses.push(data);
						}
					}
				});
				res(courses);
			} catch (error) {
				rej(error);
			}
		});
	};

	//function qui déconnecte l'utilisateur
	signOut = () => {
		firebase.auth().signOut();
	};

	/* ******************************
                 update
    ****************************** */

	updateToken = async token => {
		console.log('updateToken...');
		this.token = token;
		let db = this.firestore.collection('users').doc(this.uid);
		db.update({ token: token });
	};

	updateSkillBySkillName = async (skillName, uidCourse) => {
		console.log('updateSkillBySkillName...');
		let dbCours = this.firestore.collection('cours').doc(uidCourse);
		await dbCours.get().then(async querySnapshot => {
			const data = querySnapshot.data();
			let skills = data.skills;
			skills.map(skill => {
				if (skill.nom == skillName) {
					skill.check.push(this.uid);
				}
			});
			await dbCours.set(
				{
					skills: skills,
				},
				{ merge: true }
			);
		});
	};

	enterInCourseStudent = async (userAdd, course) => {
		console.log('enterInCourseStudent');
		let dbCours = this.firestore.collection('cours').doc(course.uid);
		await dbCours.update({
            etudiants: firebase.firestore.FieldValue.arrayUnion(userAdd),
            tokens: firebase.firestore.FieldValue.arrayUnion(this.token),
		});
		let dbUser = this.firestore.collection('users').doc(this.uid);
		await dbUser.update({
			cours: firebase.firestore.FieldValue.arrayUnion(course),
		});
	};

	enterInCourseTeacher = async (userAdd, course) => {
		console.log('enterInCourseTeacher');
		let dbCours = this.firestore.collection('cours').doc(course.uid);
		await dbCours.update({
            enseignants: firebase.firestore.FieldValue.arrayUnion(userAdd),
            tokens: firebase.firestore.FieldValue.arrayUnion(this.token),
		});
		let dbUser = this.firestore.collection('users').doc(this.uid);
		await dbUser.update({
			coursEnseignant: firebase.firestore.FieldValue.arrayUnion(course),
		});
    };
    

    updateCourseByUID = async (course, uidCourse) => {
        console.log('updateCourseByUID');
        let dbCours = this.firestore.collection('cours').doc(uidCourse);
		await dbCours.set(course)
    }

	/* ******************************
                 messages
    ****************************** */

	sendMessage = async (message, uidCourse) => {
		console.log('sendMessage...');
		let dbCours = this.firestore.collection('cours').doc(uidCourse);
		dbCours.update({
			messages: firebase.firestore.FieldValue.arrayUnion(message),
		});
	};

	/**
     * Allow the user to change his mail adress, in the same time in the data base and also for the
     * authentication
     * @param {*} currentPassword
     * @param {*} mail
     */
	changeEmail = (currentPassword, mail) => {
		console.log('change mail ...');

		this.reauthenticate(currentPassword)
			.then(() => {
				var user = firebase.auth().currentUser;
				user
					.updateEmail(mail)
					.then(() => {
						//--- putting the mail in the database
						let db = this.firestore.collection('users').doc(this.uid);
						db.update({ mail: mail });
						//---
						Alert.alert('Adresse mail modifiée');
					})
					.catch(error => {
						Alert.alert(error.message);
					});
			})
			.catch(error => {
				Alert.alert(error.message);
			});
	};

	/**
     * Allows the user to change his first name in the database
     * @param {string} prénom
     */
	changePrenom = prénom => {
		console.log('Change prénom ...');
		let db = this.firestore.collection('users').doc(this.uid);
		db.update({ prenom: prénom });
	};
	/**
     * Allows the user to change his name in the database
     * @param {*} nom
     */
	changeNom = nom => {
		console.log('change nom ...');
		let db = this.firestore.collection('users').doc(this.uid);
		db.update({ nom: nom });
	};

	/**
     * We need to reauthenticate the user when he does something sensitive, like
     * choosing a new password or login
     * @param {*} currentPassword
     */
	reauthenticate = currentPassword => {
		var user = firebase.auth().currentUser;
		var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
		return user.reauthenticateWithCredential(cred);
	};

	/**
     * Allows the user to change his password for authentification
     * @param {*} currentPassword
     * @param {*} password
     */
	changePassword = (currentPassword, password) => {
		this.reauthenticate(currentPassword)
			.then(() => {
				var user = firebase.auth().currentUser;
				user
					.updatePassword(password)
					.then(() => {
						Alert.alert('Mot de passe modifié');
					})
					.catch(error => {
						Alert.alert(error.message);
					});
			})
			.catch(error => {
				Alert.alert(error.message);
			});
	};

	/* ******************************
                delete
    ****************************** */

	deleteUser = async () => {
		return new Promise(async (res, rej) => {
			this.user
				.delete()
				.then(() => {
					res(true);
				})
				.catch(error => {
					rej(error);
				});
		});
	};

	/* ******************************
                 rewards
    ****************************** */
	getMyRewards = async () => {
		console.log('getMyRewards...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('users').doc(this.uid);
				db.get().then(querySnapshot => {
					res(querySnapshot.data().rewards);
				});
			} catch (error) {
				rej(error);
			}
		});
	};

	/* ******************************
                 getter
    ****************************** */

	get displayName() {
		return (firebase.auth().currentUser || {}).displayName;
	}

	get email() {
		return (firebase.auth().currentUser || {}).email;
	}

	get photoURL() {
		return (firebase.auth().currentUser || {}).photoURL;
	}

	get user() {
		return firebase.auth.currentUser() || null;
	}

	get firestore() {
		return firebase.firestore();
	}

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get firebase() {
		return firebase;
	}
}

//instance de la class Fire :
Fire.shared = new Fire();

//j'exporte cette class
export default Fire;
