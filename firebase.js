// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSAjusrh6VPSbLoCpfEW1nH0I8G4kTkn8",
  authDomain: "kanlearn-78774.firebaseapp.com",
  projectId: "kanlearn-78774",
  storageBucket: "kanlearn-78774.appspot.com",
  messagingSenderId: "863867803412",
  appId: "1:863867803412:web:e357f77b61ff40ec495401"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);