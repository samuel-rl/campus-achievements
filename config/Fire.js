import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyC3D8lS7xO1cjw9csov-TRah9XtIWjDuB0",
    authDomain: "campus-achievements.firebaseapp.com",
    databaseURL: "https://campus-achievements.firebaseio.com",
    projectId: "campus-achievements",
    storageBucket: "campus-achievements.appspot.com",
    messagingSenderId: "206721630249",
    appId: "1:206721630249:web:e5fece1948fc5939995c38"
  };

class Fire {
	constructor() {
		firebase.initializeApp(firebaseConfig);
	}

	connect = async (mail, password) => {
        console.log("connect...")
		return new Promise(async (res, rej) => {
			await firebase
				.auth()
				.signInWithEmailAndPassword(mail, password)
				.then(x => {
					res(x);
				})
				.catch(x => rej(x));
		});
	};

	uploadPhotoAsync = async (uri, filename) => {
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
					res(url);
				}
			);
		});
	};

	createUser = async (mail, password, nom, prenom, avatar) => {
        console.log("createuser...")
		return new Promise(async (res, rej) => {
			let remoteUri = null;
			try {
				await firebase.auth().createUserWithEmailAndPassword(mail, password);

				let db = this.firestore.collection('users').doc(this.uid);

				db.set({
					nom: nom,
					prenom: prenom,
					mail: mail,
					avatar: null,
				});

				if (avatar) {
					remoteUri = await this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);
					db.set({ avatar: remoteUri }, { merge: true });
				}

				console.log(this.uid);

				firebase.database().ref().child(`Users/${this.uid}`).set({
					nom: nom,
					prenom: prenom,
					mail: mail,
					avatar: avatar,
                });
                res("inscription ok")
			} catch (error) {
				rej(error)
			}
		});
	};

	signOut = () => {
		firebase.auth().signOut();
	};

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

Fire.shared = new Fire();
export default Fire;
