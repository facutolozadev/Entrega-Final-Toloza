// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBk5O5-YcnNowb7JrzRHhvNDnfC5RGTsE",
  authDomain: "e-commerce-curso.firebaseapp.com",
  projectId: "e-commerce-curso",
  storageBucket: "e-commerce-curso.appspot.com",
  messagingSenderId: "109242127011",
  appId: "1:109242127011:web:dbfc9847be3688c8012516"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Get the reference of the database
export const db = getFirestore(app)