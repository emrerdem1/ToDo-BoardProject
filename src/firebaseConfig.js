import * as firebase from "firebase";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEvPnWiyEg9PQEEygE3q-oM2p1BRbElYA",
  authDomain: "atomboard-ca51a.firebaseapp.com",
  databaseURL: "https://atomboard-ca51a.firebaseio.com",
  projectId: "atomboard-ca51a",
  storageBucket: "atomboard-ca51a.appspot.com",
  messagingSenderId: "1087291316277",
  appId: "1:1087291316277:web:96681e9d504df4dfc4b97c",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
