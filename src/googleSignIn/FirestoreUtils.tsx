
import { collection, getFirestore, updateDoc, doc, query, where, getDocs, setDoc } from "firebase/firestore";
import { app, db } from "./FirebaseConfig";

export const storeUserDataInFirestore = async (userData: UserData): Promise<void> => {

  try {
    // Reference to the "users" collection in Firestore
    const usersCollection = collection(db, "users");
    console.log(db, " :database")
    console.log(userData, " : userData")
    // Create a query to check if a user with the same ID already exists
    const q = query(usersCollection, where("id", "==", userData.id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if any documents are returned
    if (querySnapshot.empty) {
      // No user with the same ID exists, create a new document with the custom ID
      await setDoc(doc(db, "users/" + userData.id) , {
        email: userData.email,
        id: userData.id,
        photoURL: userData.photoURL,
        username: userData.username
      });

      console.log("User data stored in Firestore with custom ID: ", userData.id);
    } else {
      // User with the same ID already exists
      console.log("User already exists in Firestore with ID: ", userData.id);
    }
  } catch (error) {
    console.error("Error storing user data in Firestore: ", error);
  }
}


export const storeUserName = async (username:string, userId:any):Promise<void> => {
  const db = getFirestore(app);
    try {
      // Reference to a specific user in users collection
      const userRef = doc(db, "users", userId);

      
      await updateDoc(userRef, {
        username: username
      });
      console.log("Username stored in Firestore with ID: ", userRef.id);
    } catch (error) {
      console.error("Error storing user data in Firestore: ", error);
    }
  };

  export const storePostDataInFirestore = async (postData: posts[], useUserData): Promise<void> => {

    try {
      // Reference to the "users" collection in Firestore
      const postsCollection = collection(db, "posts");
      console.log(db, " :database")
      console.log(userData, " : userData")
      // Create a query to check if a user with the same ID already exists
      const q = query(usersCollection, where("id", "==", userData.id));
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      // Check if any documents are returned
      if (querySnapshot.empty) {
        // No user with the same ID exists, create a new document with the custom ID
        await setDoc(doc(db, "users/" + userData.id) , {
          email: userData.email,
          id: userData.id,
          photoURL: userData.photoURL,
          username: userData.username
        });
  
        console.log("User data stored in Firestore with custom ID: ", userData.id);
      } else {
        // User with the same ID already exists
        console.log("User already exists in Firestore with ID: ", userData.id);
      }
    } catch (error) {
      console.error("Error storing user data in Firestore: ", error);
    }
  }