import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase.innit";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  const registerUser = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await signOut(auth); // চাইলে শেষে logout

    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    return userCredential; // ✅ return দাও
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
 const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider); // ✅ direct return
};
  const updateUserProfile = (upDateDetails) => {
    return updateProfile(auth.currentUser, upDateDetails);
  };
  const logOut = () => {
    return signOut(auth)
      .then((result) => {
        console.log(result);
        setLoding(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const Authinfo = {
    registerUser,
    signInUser,
    user,
    loding,
    logOut,
    updateUserProfile,
    signInWithGoogle,
  };

  return <AuthContext value={Authinfo}>{children}</AuthContext>;
};

export default AuthProvider;
