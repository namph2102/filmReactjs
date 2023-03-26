export const defaultIconSize: string = "1.225rem";

export interface ISlider {
  slug: string;
  link: string;
  title: string;
  subname: string;
}
export interface IUserComment {
  id_user: number;
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
  id_comment: number;
  id_film: number;
  total_like: number;
  comment: string;
  updated_at: number;
  created_at: number;
  subcomment: number[];
  user_comment: IUserComment;
}
// tset data
export const myAccount: IUserComment = {
  id_user: 5,
  fullname: "moses hills",
  avata: "https://picsum.photos/200/300?random=4",
  vip: 7,
  icons: [
    {
      title: "phương hoàn lửa",
      link: "https://movibes.online/icon/6367a4304c496-18.png",
    },
    {
      title: "Kim giác thú",
      link: "https://movibes.online/icon/6367a3e0a753e-17.png",
    },
    {
      title: "Võ ngân",
      link: "https://movibes.online/icon/63804df3a51f2-Jp2v9L5y5FIKBZM1663945733.png",
    },
  ],
  permission: "admin",
  token: "b0880133-5181-47d6-a543-c7a134ee5a23",
};

class PathLink {
  seeFilmDetail = "xem-thong-tin";
  seeFilm = "xem-phim";
  seeProfile = "tai-khoan";
  domain = "http://localhost:3000/";
}

export default new PathLink();
