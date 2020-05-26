import firebase from "firebase/app";

let config = {
    apiKey: "AIzaSyCVOsLHW_DOxOr2U7K1WqbGBtCqOWnl_94",
    authDomain: "itesacheckouts.firebaseapp.com",
    databaseURL: "https://itesacheckouts.firebaseio.com",
    projectId: "itesacheckouts",
    storageBucket: "itesacheckouts.appspot.com",
    messagingSenderId: "283712013896",
    appId: "1:283712013896:web:a06e7591294024ed503a7d",
    measurementId: "G-8T9H3CJ01K"
};
firebase.initializeApp(config);

export default firebase;
