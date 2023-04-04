import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBBk5O5-YcnNowb7JrzRHhvNDnfC5RGTsE",
  authDomain: "e-commerce-curso.firebaseapp.com",
  projectId: "e-commerce-curso",
  storageBucket: "e-commerce-curso.appspot.com",
  messagingSenderId: "109242127011",
  appId: "1:109242127011:web:dbfc9847be3688c8012516"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)