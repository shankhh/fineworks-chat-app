import firebase from "firebase/app"

import "firebase/auth";

const auth = firebase.initializeApp({
    apiKey: "AIzaSyD-GiLZ6ynKNkiLIgJvNx7wR_Bi7_EcTVk",
    authDomain: "chat-app-94362.firebaseapp.com",
    projectId: "chat-app-94362",
    storageBucket: "chat-app-94362.appspot.com",
    messagingSenderId: "389779593304",
    appId: "1:389779593304:web:a4f3a86a23e165f958d22d"
}).auth(); 

// const firebaseConfig = firebase.initializeApp({
//     apiKey: "AIzaSyD-GiLZ6ynKNkiLIgJvNx7wR_Bi7_EcTVk",
//     authDomain: "chat-app-94362.firebaseapp.com",
//     projectId: "chat-app-94362",
//     storageBucket: "chat-app-94362.appspot.com",
//     messagingSenderId: "389779593304",
//     appId: "1:389779593304:web:a4f3a86a23e165f958d22d"
// }).auth(); 

// const auth = firebaseConfig.auth();
// const db = firebaseConfig.firestore() ;

export { auth }
