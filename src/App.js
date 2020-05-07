import React, {useState} from 'react';
import './App.css';
import {TheApp} from "./TheApp/TheApp";

function App() {
    const [login, setLogin] = useState(true);
  return (
    <div className="App">
        {login &&  <TheApp/>}
    </div>
  );
}

export default App;
