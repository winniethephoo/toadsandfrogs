import firebase from 'firebase'
import 'firebase/firestore'
//const serviceAccount = require('~/serviceAccountKey.json')
var firebaseConfig = {
    apiKey: "AIzaSyDJXS1UPxkHqECr5Cv2POHVeK3j_KjlD_4",
    authDomain: "fukusyuproject.firebaseapp.com",
    databaseURL: "https://fukusyuproject.firebaseio.com",
    projectId: "fukusyuproject",
    storageBucket: "fukusyuproject.appspot.com",
    messagingSenderId: "270000031581",
    appId: "1:270000031581:web:04c2413bf173ab5e464ab4"
  };
firebase.initializeApp(firebaseConfig)
export default firebase;
