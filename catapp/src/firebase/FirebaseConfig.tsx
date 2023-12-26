  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo375ug2yjOqHk1KDhlvpdZK37iLGNY0U",
  authDomain: "cats-ad771.firebaseapp.com",
  projectId: "cats-ad771",
  storageBucket: "cats-ad771.appspot.com",
  messagingSenderId: "130918795899",
  appId: "1:130918795899:web:f77ce0b75e15593b5f70de",
  measurementId: "G-KMELW10G4D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

auth.languageCode = 'en'

export const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
