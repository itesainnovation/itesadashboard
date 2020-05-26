import React, {useEffect, useState} from 'react';
import './App.css';
import {TheApp} from "./TheApp/TheApp";
import firebase from "./utils/firebase";
import 'firebase/firestore'
import 'firebase/auth'

function App() {
    const [login, setLogin] = useState(true);
    const [user, setUser] = useState({});
    useEffect(()=>{
        /*firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setLogin(true)
                let uid = user.uid;
                let db = firebase.firestore();

                db.collection('users').where('uid', '==', uid)
                    .onSnapshot(function (docs) {
                        docs.forEach(function (doc) {
                            let theUser = doc.data();
                            theUser.id = doc.id;
                            setUser(theUser);
                        })
                })
            } else {
                setLogin(false)
            }
        });*/
    },[])
  return (
    <div className="App">
        {login &&  <TheApp user={user}/>}
    </div>
  );
}

export default App;
