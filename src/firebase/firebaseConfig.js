import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyBTqgyU-g6MDf_uSUlYOM_5vteMbVRCjq4",
  authDomain: "snake-game-5546e.firebaseapp.com",
  projectId: "snake-game-5546e",
  storageBucket: "snake-game-5546e.appspot.com",
  messagingSenderId: "414371442762",
  appId: "1:414371442762:web:6dbc002507cb4713f976b3",
  measurementId: "G-CBVJ085LWD",
};

let config = firebase.initializeApp(firebaseConfig);

export default config;
