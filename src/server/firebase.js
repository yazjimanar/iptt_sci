import * as firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdTN-1JmmZy44pEOEvoYisdeV0sPtQHOo",
  authDomain: "ipttapp-85a09.firebaseapp.com",
  projectId: "ipttapp-85a09",
  storageBucket: "ipttapp-85a09.appspot.com",
  messagingSenderId: "697028534455",
  appId: "1:697028534455:web:9e3c1033479968c939ed32",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
