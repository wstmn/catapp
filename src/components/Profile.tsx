import { useEffect, useState, FC } from "react";
import { User, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "../googleSignIn/FirebaseConfig";
import { storeUserDataInFirestore, storeUserName } from "../googleSignIn/FirestoreUtils";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { ProfileSection } from "./ProfileSection";

export interface UserData {
  id: string,
  email: string,
  username: string,
  photoURL: string,
  bio: string
}

export interface posts {
  postid: string,
  uid: string,
  title: string,
  body: string
}

const Profile: FC = () => {

  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<UserData>();
  const [usernameInput, setUsernameInput] = useState<string>("");

  const [bioInput, setBioInput] = useState<string>("");

  const [userPosts, setUserPosts] = useState<posts[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    console.log(userPosts)
    // Handle redirect result
    getRedirectResult(auth).then((result) => {
      if (result) {
        const userData: UserData = {
          id: result.user.uid,
          email: result.user.email || '',
          username: "wasteman", // You can change this as needed
          photoURL: result.user.photoURL || "",
          bio: ''
        };
        setEmail(userData.email);
        setUser(userData);
        localStorage.setItem("email", userData.email);
        storeUserDataInFirestore(userData);
      }
    }).catch((error) => {
      console.error("Error processing redirect result:", error);
    });
  }, [user]);

  const handleClick = async () => {
    // Only initiates the sign-in process
    signInWithRedirect(auth, googleProvider).catch((error) => {
      console.error("Error signing in with Google:", error);
    });
  };

  const logout = () => {
    localStorage.removeItem("email");
    setUser(undefined);
    setEmail("");
  };

  const imgUrl = user?.photoURL;


  return (
    <div className="bg-gray-800">
      <div className="bg-gray-900">
        <div className='bg-gray-900 dark:bg-gray-900 border-gray-500 sticky top-0 z-10 ml-24 border-b-2 '>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <div className="flex items-center">
              {imgUrl ? (
                <img src={imgUrl} className="w-32 h-32 mr-4 rounded-full" alt="Cat Icon" />
              ) : (
                <img src={'./src/assets/catIcon.png'} className="w-32 h-32 mr-4" alt="Cat Icon" />
              )}
              <div>
                <h1 className="text-2xl font-bold mb-2 text-gray-100">{user ? user.username : "no user"}</h1>
                <p className="text-sm text-gray-300">{user?.bio}</p>
                {/* Add more user information as needed */}
              </div>
              <p className=" mt-8">
                <input className="ml-6 mb-10  rounded bg-gray-800 text-gray-200" onChange={(e) => { setUsernameInput(e.target.value); console.log(e.target.value) }} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-3" onClick={() => {
                  if (user) {
                    setUser({ ...user, username: usernameInput });
                  } console.log(user)
                  storeUserName(usernameInput, user?.id)
                }}>Set
                </button>
                <input className="ml-6 mb-10  rounded bg-gray-800 text-gray-200" onChange={(e) => { setBioInput(e.target.value); console.log(e.target.value) }} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-3" onClick={() => {
                  if (user) {
                    setUser({ ...user, bio: bioInput });
                  } console.log(user)
                }}>Set
                </button>
              </p>
            </div>
            <div className="flex items-center">
              <div className="flex">
                {email ? email && <ArrowLeftStartOnRectangleIcon
                  className="w-12 h-12 text-white rounded-xl text-w cursor-pointer"
                  onClick={logout} />
                  :
                  <img src="./src/assets/google_logo.png"
                    className="cursor-pointer w-42 h-12 p-1 bg-rose-50 hover:bg-rose-200 duration-300 rounded-xl text-black"
                    onClick={handleClick} alt="Google Logo" />
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      {user && <ProfileSection email={email} user={user} posts={userPosts} setPosts={setUserPosts} />}
      <div className="bg-gray-500 dark:bg-gray-700 p-4 mt-8">
        <p className="text-white ml-24 font-thin"><small>© 2023 Catbase. All cats welcome.</small></p>
      </div>
    </div>
  );
};

export default Profile;
