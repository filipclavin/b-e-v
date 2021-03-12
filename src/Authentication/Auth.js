import firebase from '../config/firebaseconfig'

const socialAuth = (provider) => {
 
    firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
        return res.user;
    }).catch((error) => {
        return error;
    });

};

export default socialAuth;