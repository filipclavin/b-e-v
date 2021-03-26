import styled from 'styled-components'
import firebase from "firebase";
import { useState } from "react";


import Landing from "./Pages/Landing.js"
import Overview from "./Pages/Overview.js"


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {

    const [loggedIn, setLoggedIn] = useState(false)

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        console.log(loggedIn)
    })


    return (
        <>
            {loggedIn
                ? <Overview />
                : <Landing />
            }
        </>
    );
}

export default App;
