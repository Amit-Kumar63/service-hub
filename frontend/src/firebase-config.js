// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7JgOtHKYvtJJ-RGU2z_Be7bImWU1f4mE",
    authDomain: "service-hub-e4931.firebaseapp.com",
    projectId: "service-hub-e4931",
    storageBucket: "service-hub-e4931.firebasestorage.app",
    messagingSenderId: "301583371925",
    appId: "1:301583371925:web:e06779afe620caa2fb159c",
    measurementId: "G-8XCKKBHYZW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en';
export default auth
