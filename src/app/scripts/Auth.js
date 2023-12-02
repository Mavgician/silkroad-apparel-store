import { 
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, db } from '@/app/scripts/firebase'
import { collection, doc, setDoc } from "firebase/firestore";
import { docExists } from "./database-functions";

import { useContext, createContext, useEffect, useState } from "react";

const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

const AuthContext = createContext()

auth.useDeviceLanguage();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const GoogleSign_in = async (e) => {
    const googleAuth = signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
  
        if (! await docExists('user-test', user.uid)) {
          setDoc(doc(collection(db, 'user-test'), user.uid),
            {
              id: user.uid,
              email: user.email,
              contact: user.phoneNumber,
              fname: user.displayName,
              lname: user.displayName,
              role: 'standard user',
              cart: []
            }
          )
        }
  
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const creds = GoogleAuthProvider.credentialFromError(error);
        if (errorCode == 'auth/popup-closed-by-user') { }
        else {
          console.error(errorMessage);
        }
      });
    return googleAuth;
  }

  const FacebookSign_in = async (e) => {
    const facebookAuth = signInWithPopup(auth, facebookAuthProvider)
      .then(async (result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
  
        if (! await docExists('user-test', user.uid)) {
          setDoc(doc(collection(db, 'user-test'), user.uid),
            {
              id: user.uid,
              email: user.email,
              contact: user.phoneNumber,
              fname: user.displayName,
              lname: user.displayName,
              role: 'standard user',
              cart: []
            }
          )
        }
  
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const creds = FacebookAuthProvider.credentialFromError(error);
        if (errorCode == 'auth/popup-closed-by-user') { }
        else {
          console.error(errorMessage);
        }
      });
    return facebookAuth;
  }

  const Sign_Out = (e) => {
    signOut(auth).then((data) => {
      console.log(data);
    }).catch((err) => { })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
    
    return () => unsubscribe()
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, GoogleSign_in, FacebookSign_in, Sign_Out }}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}