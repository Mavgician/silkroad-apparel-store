import { GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { auth, db } from '@/app/scripts/firebase'
import { collection, doc, setDoc } from "firebase/firestore";

const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

auth.useDeviceLanguage();

setPersistence(auth, browserLocalPersistence)

export const GoogleSign_in = async (e) => {
  const googleAuth = signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

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

export const FacebookSign_in = async (e) => {
  const facebookAuth = signInWithPopup(auth, facebookAuthProvider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

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

export const Sign_Out = (e) => {
  signOut(auth).then((data) => {
    console.log(data);
  }).catch((err) => {})
}