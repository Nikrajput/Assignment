import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyCqPBOGuyXsZ0aFvgJbjnox8Gaos4jUmWU",
    authDomain: "assignment-c637d.firebaseapp.com",
    databaseURL: "https://assignment-c637d-default-rtdb.firebaseio.com",
    projectId: "assignment-c637d",
    storageBucket: "assignment-c637d.appspot.com",
    messagingSenderId: "261391711922",
    appId: "1:261391711922:web:1ded6ad53d4cff521453ab"
};
if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

const firebaseApp = initializeApp(config);

// ** Modulerized Firebase ** //
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

let user = auth.currentUser;


export {
  user,
  db,
  auth,
  firebaseApp as firebase,
  storage,
};
