import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { FC, useEffect, useState } from "react";
import { SignIn } from "../googleSignIn/SignIn";
import { User, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../googleSignIn/FirebaseConfig";



const Profile: FC = () => {
  const [email, setEmail] = useState<string | null>("");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (localStorage.getItem('emmail') != null) {
      setEmail(localStorage.getItem('email'))
    }
  }, [])


  const handleClick = () => {
    signInWithPopup(auth, googleProvider).then((data: any) => {
      setEmail(data.user.email)
      setUser(data.user)
      console.log(data.user)
      localStorage.setItem("email", data.user.email)
    })
  }

  const logout = () => {
    localStorage.clear
    console.log("logout")
    setUser(undefined)
    setEmail("")
  }

  const imgUrl = user?.photoURL

  return (<div>
    <div>
      <div className='bg-gray-500 dark:bg-gray-700 border-gray-200 sticky top-0 z-10'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div className="flex items-center">
            {imgUrl ? <img src={imgUrl} className="w-20 h-20 mr-4 rounded-full" alt="Cat Icon" /> : <img src={'./src/assets/catIcon.png'} className="w-20 h-20 mr-4" alt="Cat Icon" />}
            <div>
              <h1 className="text-2xl font-bold mb-2 text-white">Wasteman</h1>
              <p className="text-sm text-gray-300">Cat owner</p>
              {/* Add more user information as needed */}
            </div>
          </div>
          <SignIn />
          <div className="flex items-center">
            {/* Add your ArrowLeftStartOnRectangleIcon component here */}
            <div className="flex">
              {email && <button className="p-4" onClick={handleClick}> </button>}
              {!email && <img src="./src/assets/google_logo.png" className="curser-pointer w-42 h-12 p-1 bg-rose-50 hover:bg-rose-200 duration-300   rounded-xl text-black" onClick={handleClick}></img>}
              {email && <ArrowLeftStartOnRectangleIcon className="w-12 h-12 text-white rounded-xl text-w cursor-pointer" onClick={logout} />}

            </div>

          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
    {email && (
      <div className="mx-auto p-4 ml-24">
        {/* Your profile section content goes here */}
        <h2 className="text-2xl font-bold mb-2">Profile Section</h2>
        <p>Email: {email}</p>
        {/* Add more profile information as needed */}
      </div>
    )}
  </div>
  );
};

export default Profile;
