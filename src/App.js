import firebase from "firebase";
import { useState, useEffect } from "react";
import Landing from "./Pages/Landing.js"
import Overview from "./Pages/Overview.js"

function App() {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
            /* console.log(loggedIn) */
        })
    }, [])

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
