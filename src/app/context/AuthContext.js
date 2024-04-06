import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const actionCodeSettings = {
    url: "localhost:3000",
    handleCodeInApp: true,
    iosBundleID: "com.example.ios",
    androidPackageName: "com.example.android",
    androidInstallApp: true,
    androidMinimumVersion: "12",
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("password reset email link sent");

      alert("password reset email link sent");
    });
  };

  const sendEmailLink = (email) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setITem("emailForSignIn", email);
      })
      .catch((error) => {
        const errorCode = error.Code;
        const errorMessage = error.Message;
        console.log(errorCode, errorMessage);
      });
  };
};
