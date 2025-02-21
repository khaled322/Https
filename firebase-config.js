// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCQRblRXdM9vHYk_vitoMaDihD-YlXwzc",
    authDomain: "login-5ab63.firebaseapp.com",
    projectId: "login-5ab63",
    storageBucket: "login-5ab63.firebasestorage.app",
    messagingSenderId: "114075832736",
    appId: "1:114075832736:web:ea26dba6a7250417c594c5",
    measurementId: "G-W61905Q2Q1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider, onAuthStateChanged, sendPasswordResetEmail };
