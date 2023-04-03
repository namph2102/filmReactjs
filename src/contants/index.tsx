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
}
export interface TpropComment {
  _id: string;
  id_film: number;
  total_like: number;
  comment: string;
  updated_at: number;
  created_at: number;
  subcomment: number[];
  user_comment: IUserComment;
  is_edit: Boolean;
}

class PathLink {
  seeFilmDetail = "xem-thong-tin";
  seeFilm = "xem-phim";
  seeProfile = "tai-khoan";
  domain = "http://localhost:3000/";
  nameToken = "_myToken";
}
// Configure Firebase.
export const configFireBase = {
  apiKey: "AIzaSyDyJGXl7H7Z8X-c1kkQIyrWC9gGi9uw_rk",
  authDomain: "movies-41f04.firebaseapp.com",
  // ...
};

export default new PathLink();
