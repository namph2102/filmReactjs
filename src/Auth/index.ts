import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { configFireBase } from "../contants";
import ToastMessage from "../untils/ToastMessage";
const app = !getApps().length ? initializeApp(configFireBase) : getApp();
export const dbFirebase = getFirestore();
export const storageFirebase = getStorage(app);
class Authentication {
  authenticationFirebase = getAuth(app);
  signFacebook(responsiveLoggin: (re: any) => void) {
    const provider = new FacebookAuthProvider();

    signInWithPopup(this.authenticationFirebase, provider)
      .then(({ user }) => responsiveLoggin(user))
      .catch(() => {});
  }
  signGoogle(responsiveLoggin: (re: any) => void) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.authenticationFirebase, provider)
      .then(({ user }) => responsiveLoggin(user))
      .catch(() => {});
  }

  handleLogout() {
    signOut(getAuth())
      .then(() => {
        ToastMessage("Bạn đăng xuất thành công").success();
        window.localStorage.removeItem("accessToken");
      })
      .catch((err) => {
        console.log(err.message);
        ToastMessage("Bạn chưa đăng nhập").info();
      });
  }
}

export default new Authentication();
