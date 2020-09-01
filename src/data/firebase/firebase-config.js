import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAeB4WbiWrezf0Ekz_33bJbzLDQiUFeDEU",
    authDomain: "trello-dd9ed.firebaseapp.com",
    databaseURL: "https://trello-dd9ed.firebaseio.com",
    projectId: "trello-dd9ed",
    storageBucket: "trello-dd9ed.appspot.com",
    messagingSenderId: "740971354812",
    appId: "1:740971354812:web:b8ad28f6a44343c12b4eb9",
    measurementId: "G-XTSQSVX4F3"
};

const app = firebase.initializeApp(firebaseConfig);

const firebaseAuth = app.auth();
const firebaseFirestore = app.firestore();
const firebaseStorage = app.storage();

export { firebase, firebaseAuth, firebaseFirestore, firebaseStorage };