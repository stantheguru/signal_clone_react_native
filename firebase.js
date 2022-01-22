import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAcehLFhLwsPCCrYiyZ_n7yLCD0BEkh6Gg",
    authDomain: "signal-clone-af0a9.firebaseapp.com",
    projectId: "signal-clone-af0a9",
    storageBucket: "signal-clone-af0a9.appspot.com",
    messagingSenderId: "830637516380",
    appId: "1:830637516380:web:9c57ef3a0d1f9676c8e899"
  };

  let app;

  if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
  } else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();
  export { db, auth };