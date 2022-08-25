// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6yqI-b_6R1I0XMWySeD84f5NM7XovLQ",
  authDomain: "react-curso-8ebed.firebaseapp.com",
  projectId: "react-curso-8ebed",
  storageBucket: "react-curso-8ebed.appspot.com",
  messagingSenderId: "1025250576214",
  appId: "1:1025250576214:web:f56cc04a0e8db19c61f8f7"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
 
export const FirebaseAuth = getAuth(FirebaseApp); 
export const FirebaseDB  = getFirestore(FirebaseApp); 