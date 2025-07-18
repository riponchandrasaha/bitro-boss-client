// src/Providers/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
  /*   FacebookProvider, */
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
  /*   const FBSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, FacebookProvider);
    };
 */
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = ({ displayName, photoURL }) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log("Current User:", currentUser);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
       /*  FBSignIn, */
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
