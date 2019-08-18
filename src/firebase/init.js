import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDR5bkIHHUu2S_YBKcTixUuDPnwNWb95Ks",
    authDomain: "holla-blogs-udemy.firebaseapp.com",
    databaseURL: "https://holla-blogs-udemy.firebaseio.com",
    projectId: "holla-blogs-udemy",
    storageBucket: "holla-blogs-udemy.appspot.com",
    messagingSenderId: "271489355554",
    appId: "1:271489355554:web:5fd767bffa28e48b"
  };
  // Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore db
export default firebaseApp.firestore()