import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Firebase.innit";
import { AuthContext } from "./AuthContext";

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
  };

  return <AuthContext value={Authinfo}>{children}</AuthContext>;
};

export default AuthProvider;
