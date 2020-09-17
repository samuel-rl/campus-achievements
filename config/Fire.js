import firebase from 'firebase';
import 'firebase/firestore';

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
	//constructeur qui initialise la connexion avec notre config
	constructor() {
		firebase.initializeApp(firebaseConfig);
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
				.catch(x => rej(x));
		});
	};

    //function qui va uploader la photo
	uploadPhotoAsync = async (uri, filename) => {
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

    //fonction de creation d'utilisateur:
	createUser = async (mail, password, nom, prenom, avatar) => {
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
				rej(error);
			}
		});
	};

    //function qui déconnecte l'utilisateur 
	signOut = () => {
		firebase.auth().signOut();
	};

    /* ******************************
                 getter
    ****************************** */
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
