import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

const { 
  VITE_Firebase_API_KEY,
  VITE_Firebase_AUTH_DOMAIN,
  VITE_Firebase_PROJECT_ID,
  VITE_Firebase_STORAGE_BUCKET,
  VITE_Firebase_MESSAGING_SENDER_ID,
  VITE_Firebase_APP_ID,
  VITE_Firebase_MEASUREMENT_ID
} = import.meta.env;

const firebaseConfig = {
    apiKey: VITE_Firebase_API_KEY,
    authDomain: VITE_Firebase_AUTH_DOMAIN,
    projectId: VITE_Firebase_PROJECT_ID,
    storageBucket: VITE_Firebase_STORAGE_BUCKET,
    messagingSenderId: VITE_Firebase_MESSAGING_SENDER_ID,
    appId: VITE_Firebase_APP_ID,
    measurementId: VITE_Firebase_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
export { auth, signInWithPopup, provider, signOut };
