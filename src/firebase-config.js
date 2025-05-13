// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYwGfnaxGjc5jtwyGE7XIaZZRu40CR4vs",
  authDomain: "ia-comunidades.firebaseapp.com",
  projectId: "ia-comunidades",
  storageBucket: "ia-comunidades.firebasestorage.app",
  messagingSenderId: "671452549134",
  appId: "1:671452549134:web:152f12034d0a3d0a8a6c5f",
  measurementId: "G-L3ND5K5P3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  where,
  query,
  collection,
  getDocs,
  setPersistence,
  browserSessionPersistence,
  firebaseConfig
};