import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

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
const provider = new GoogleAuthProvider();
export { auth, signInWithPopup, provider, signOut };
