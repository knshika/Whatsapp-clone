import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAb7CH7naheTsZ009Xi4hqpkDcexrw4cqw",
  authDomain: "whatsapp-clone-454a7.firebaseapp.com",
  projectId: "whatsapp-clone-454a7",
  storageBucket: "whatsapp-clone-454a7.appspot.com",
  messagingSenderId: "521964776825",
  appId: "1:521964776825:web:afd667d709287a8e36d3a8",
  measurementId: "G-30DG2EYCKS",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
