
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase_init";


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = ()=>{
        setLoading(true);
       return signInWithPopup(auth, provider);
    }

    const logOutUser =()=>{
        return signOut(auth)
    }

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth, (currentUser)=>{
        console.log("From observer", currentUser);
        setUser(currentUser);
        setLoading(false);
    })

    return ()=>{
        return unsubscribe()
    }
  },[])
    const authInfo = {
        user,
        loading,
        loginWithGoogle,
        logOutUser,
       
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;