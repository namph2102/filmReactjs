import firebase from "firebase/compat/app";
export const defaultIconSize: string = "1.225rem";

export interface ISlider {
  slug: string;
  link: string;
  title: string;
  subname: string;
}
export interface TdataLiscomments {
  id_comment: number;
  crease: number;
}

export interface IUserComment {
  _id: string;
  username: string;
  fullname: string;
  icons: {
    title: string;
    link: string;
  }[];
  avata: string;
  permission: string;
  vip: number;
  token?: string;
  blocked: boolean;
}
export interface TpropComment {
  _id: string;
  id_film: number;
  total_like: number;
  comment: string;
  updatedAt: number;
  createdAt: number;
  subcomment: number[];
  user_comment: IUserComment;
  is_edit: Boolean;
}

class PathLink {
  home = "/trang-chu";
  categories = "/the-loai";
  contry = "/quoc-gia/";
  seeFilmDetail = "xem-thong-tin";
  seeFilm = "/xem-phim/";
  seeProfile = "tai-khoan";
  recharge = "nap-tien";
  changePassword = "doi-mat-khau";
  pagenotfound = "not-found";
  domain =
    "https://backendfilmreact-production.up.railway.app/" ||
    import.meta.env.DOMAIN_SERVER ||
    "https://videotv-ss.onrender.com/";
  nameToken = "_myToken";
  localusername = "username";
  seeCategories = "/the-loai-phim/";
}
export const configPaypal = {
  clientID:
    "AQPKJyF0O5Ari21cRYIeQXVfaNEvL7gn75CHu61JI8fiNcvdWu1K3Opu_N824PTn5d4MT4Soe5fvfUE4",
  secret:
    "EIBZ6vGSQJdz0ZE0OR8iaLifM3nNcSuAn4PMTwiFI12MY12z9pwy4JnJaZdVmGLTsO0e08P2dV_XVU_W",
};
// Configure Firebase.
export const configFireBase = {
  apiKey: "AIzaSyCUuogh8hEj9O4OraQsYE3eanaMUxs3TDA",
  authDomain: "test-c887e.firebaseapp.com",
  projectId: "test-c887e",
  storageBucket: "test-c887e.appspot.com",
  messagingSenderId: "128310947725",
  appId: "1:128310947725:web:0c61fde9baf1011b65d7c4",
  measurementId: "G-G05WT46T62",
};

export default new PathLink();
