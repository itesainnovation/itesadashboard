import firebase from "firebase/app";

let config = {
    apiKey: "AIzaSyAJ3PfFl_zNjBGKt0lXyvUqTxz-Z7aruM8",
    authDomain: "mktviral.firebaseapp.com",
    databaseURL: "https://mktviral.firebaseio.com",
    projectId: "mktviral",
    storageBucket: "mktviral.appspot.com",
    messagingSenderId: "879021023419",
    appId: "1:879021023419:web:6b22e3806cc7ac4b4f899e",
    measurementId: "G-HCWGQGMFQ7"
};
firebase.initializeApp(config);

export default firebase;
