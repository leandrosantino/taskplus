import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY as string,
  authDomain: "taskplus-f5189.firebaseapp.com",
  projectId: "taskplus-f5189",
  storageBucket: "taskplus-f5189.appspot.com",
  messagingSenderId: "450238795329",
  appId: process.env.FIREBASE_APP as string
};


const firebaseApp = initializeApp(firebaseConfig);


export const db = getFirestore(firebaseApp)
