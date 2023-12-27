import { useEffect, useState } from "react";
import {auth, googleProvider } from "./FirebaseConfig"
import { signInWithPopup } from "firebase/auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

export function SignIn  ()  {
    const [value, setValue] = useState<string | null>("");
    const [user, setUser] = useState();

    const handleClick = () => {
        signInWithPopup(auth, googleProvider).then((data:any) => {
            setValue(data.user.email)
            setUser(data)
            localStorage.setItem("email" , data.user.email)
        })
    }

    const logout = () => {
        localStorage.clear
    }


    return user
    
};


