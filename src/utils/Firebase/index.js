import firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_KEY } from "../../constants"

const provider = new firebase.auth.GithubAuthProvider();

export const githubLogIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)

    .then(function (result) {
      const token = result.credential.accessToken;
      const user = result.user;

      console.log(token);
      console.log(user);
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}

export const githubLogOut = () => {
  firebase
    .auth()
    .signOut()

    .then(
      function () {
        console.log("Signout successful!");
      },
      function (error) {
        console.log("Signout failed");
      }
    );
};

firebase.initializeApp({
  apiKey: FIREBASE_KEY,
  authDomain: "b-e-v-776af.firebaseapp.com",
  projectId: "b-e-v-776af",
});

const db = firebase.firestore();

const users = new Map();

export const getUsers = () => {
  db.collection("companies")
    .doc("company1")
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.set(doc.data().username, doc.id);
        console.log(doc.data());
      });
    });
};

export const createUser = (username) => {
  db.collection("companies").doc("company1").collection("users").doc().set({
    username: username
  })
    .then(() => {
      console.log("Document successfully written!");
    })
    .then(() => {
      getUsers()
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
}

export const removeUser = (username) => {
  db.collection("companies").doc("company1").collection("users").doc(users.get(username)).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });

  getUsers()
}