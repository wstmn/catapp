import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

 const firebaseConfiguration = {
   apiKey: "AIzaSyCo375ug2yjOqHk1KDhlvpdZK37iLGNY0U",
   authDomain: "cats-ad771.firebaseapp.com",
   projectId: "cats-ad771",
   storageBucket: "cats-ad771.appspot.com",
   messagingSenderId: "130918795899",
   appId: "1:130918795899:web:f77ce0b75e15593b5f70de",
   measurementId: "G-KMELW10G4D"
 };
 
 const app = firebase.initializeApp(firebaseConfiguration);

 export const auth = getAuth(app)

 export const googleProvider = new GoogleAuthProvider();


 

