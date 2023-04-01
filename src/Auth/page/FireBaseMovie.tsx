import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginWithFireBase } from "../../Redux/UserSlice";
import { AppDispatch, RootState } from "../../Redux/Store";
import PathLink from "../../contants";
import ToastMessage from "../../untils/ToastMessage";
import { configFireBase } from "../../contants";

firebase.initializeApp(configFireBase);
const UIConfigFireBase = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};
function LoginForm({
  onHandleClose,
}: {
  onHandleClose: (isOpen: boolean) => void;
}) {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const dispatch: AppDispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.account);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user: any) => {
        setIsSignedIn(!!user);
        if (!user) {
          return;
        }
        if (user.providerData[0]?.uid) {
          onHandleClose(false);
          const { displayName, email, phoneNumber, photoURL, uid } =
            user.providerData[0];
          const acccount = {
            username: email,
            fullname: displayName,
            phone: phoneNumber || 0,
            avata: photoURL,
            uid,
          };
          dispatch(loginWithFireBase(acccount)).then((res: any) => {
            ToastMessage(res.message).success();
            localStorage.setItem("loginwithfirebase", "1");
          });
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <>
      {!isSignedIn && (
        <StyledFirebaseAuth
          uiConfig={UIConfigFireBase}
          firebaseAuth={firebase.auth()}
        />
      )}
    </>
  );
}

export default LoginForm;
