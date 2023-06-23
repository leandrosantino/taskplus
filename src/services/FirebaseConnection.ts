import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCpkn8S14RmTV7-Q--hlTj5kXj2VWWhrVQ",
  authDomain: "taskplus-390718.firebaseapp.com",
  projectId: "taskplus-390718",
  storageBucket: "taskplus-390718.appspot.com",
  messagingSenderId: "220022548703",
  appId: "1:220022548703:web:32cca1e0a59f0d43d1a16a"
};


const firebaseApp = initializeApp(firebaseConfig);


export const db = getFirestore(firebaseApp)
