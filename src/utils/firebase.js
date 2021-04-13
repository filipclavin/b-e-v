import { ArrowAutofitHeight } from "@styled-icons/fluentui-system-filled";
import firebase from "firebase";
import "firebase/firestore";
import { FIREBASE_KEY } from "../constants"

const users = new Map();
const provider = new firebase.auth.GithubAuthProvider();

export const githubLogIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)

    .then(function (res) {
      console.log(res);
      createUser(res.additionalUserInfo.username, res.user.uid)
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


export const getUsers = () => {
  db.collection("companies")
    .doc("company1")
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        users.set(doc.data().username, doc.id);
      });
    });
};

export const createUser = (username, uid) => {
  db.collection("companies").doc("company1").collection("users").doc(uid).set({
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

export const getCurrentUser = async () => {
  const uid = firebase.auth().currentUser.uid
  let username = 'hej'

  await db.collection("companies").doc("company1").collection("users").doc(uid).get()
    .then((doc) => {
      return doc.data().username
    })
    .then(usernamePromise => {
      username = usernamePromise
    })

  console.log(username);

  return username
}