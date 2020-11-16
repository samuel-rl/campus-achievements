import * as firebase from 'firebase';
import 'firebase/firestore';
import { Alert } from 'react-native';

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

	//constructeur qui initialise la connexion avec notre config
	constructor() {
		firebase.initializeApp(firebaseConfig);
		this.student = false;
	}

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


	/**
	 * fonction de creation d'utilisateur:
	 * @param {*} mail 
	 * @param {*} password 
	 * @param {*} nom 
	 * @param {*} prenom 
	 * @param {*} avatar 
	 * @param {*} isStudent 
	 * @param {*} annee 
	 * @param {*} filliere 
	 */
	createUser = async (mail, password, nom, prenom, avatar, isStudent, annee, filliere) => {
		console.log('createuser...');
		return new Promise(async (res, rej) => {
			let remoteUri = null;
			try {
				//creation du compte sur firebase
				await firebase.auth().createUserWithEmailAndPassword(mail, password);

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
				});

				//si l'avatar est pas null, on upload la photo et on la rajoute dans ses informations
				if (avatar) {
					remoteUri = await this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);
					db.set({ avatar: remoteUri }, { merge: true });
				}

				//on le rajoute dans la base de donnée
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

	addCourse = async (nom, skills) => {
		console.log('addCourse...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('cours');
				db.doc().set({
					enseignants: [this.uid],
					nom: nom,
					skills: skills,
				});

				res(ok);
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
								items: doc.data().Matieres,
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

	getPromos = async () => {
		console.log('getPromos...');
		let response = [];
		let db = this.firestore.collection('promos');
		db.get().then(querySnapshot => {
			let docs = querySnapshot.docs;
			for (let doc of docs) {
				const selectedEvent = {
					name: doc.id,
					items: doc.data().Matieres,
				};
				response.push(selectedEvent);
			}
			console.log(response);
		});
		return response;
	};

	getIsStudent = async () => {
		console.log('getIsStudent...');
		return new Promise(async (res, rej) => {
			try {
				let db = this.firestore.collection('users').doc(this.uid);
				db.get().then(querySnapshot => {
					console.log(querySnapshot.data());
					this.student = querySnapshot.data().etudiant;
					res(true);
				});
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
		let db = this.firestore.collection('users').doc(this.uid);
		db.update({ token: token });
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
		console.log('Change prénom ...' + prénom);
		let db = this.firestore.collection('users').doc(this.uid);
		db.update({ prenom: prénom });
	};
	/**
     * Allows the user to change his name in the database
     * @param {*} nom
     */
	changeNom = nom => {
		console.log('change nom ...' + nom);
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
	getAllReward = async () => {
		console.log('getAllReward...');
		return new Promise(async (res, rej) => {
			let response = [];
			const db = this.firestore.collection('rewards');
			await db.get().then(querySnapshot => {
				let docs = querySnapshot.docs;
				for (let doc of docs) {
					const event = {
						nom: doc.data().nom,
						description: doc.data().description,
						ratio: doc.data().ratio, //NEW - this radio should be calculated
					};
					response.push(event);
				}
			});
			res(response);
		});
	};

	/* ******************************
                 getter
    ****************************** */

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
