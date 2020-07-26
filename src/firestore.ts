import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyCPkjX2aubhnavjSTXu7hC-BEORARtm5R4',
	authDomain: 'portfolio-c5fe5.firebaseapp.com',
	databaseURL: 'https://portfolio-c5fe5.firebaseio.com',
	projectId: 'portfolio-c5fe5',
	storageBucket: 'portfolio-c5fe5.appspot.com',
	messagingSenderId: '373221959949',
	appId: '1:373221959949:web:4fd8e490619f789a2c2844'
};
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth;
