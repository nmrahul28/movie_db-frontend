import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCqFIz_t3qKWSu9PrGoAzKba20hkZE2wKA",
    authDomain: "authenticationdb-dedca.firebaseapp.com",
    databaseURL: "https://authenticationdb-dedca.firebaseio.com",
    projectId: "authenticationdb-dedca",
    storageBucket: "authenticationdb-dedca.appspot.com",
    messagingSenderId: "1040848841076",
    appId: "1:1040848841076:web:f3ba59442852cc9b1aa421",
    measurementId: "G-SK4Q2P1TDN"
};
const fireAuth = firebase.initializeApp(firebaseConfig);
export default fireAuth;