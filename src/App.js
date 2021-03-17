import styled from 'styled-components'
import firebase from "firebase";
import { useState } from "react";


import LogIn from "./LogIn.js"
import Dashboard from "./Dashboard.js"


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function App() {

    const [loggedIn, setLoggedIn] = useState(false)

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
        console.log(loggedIn)
    })
   

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {loggedIn
            ? <Dashboard />
            : <LogIn />
            }
         </Route>
       </Switch>
      </Router>
    );
}

export default App;
