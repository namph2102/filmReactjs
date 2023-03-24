export const defaultIconSize: string = "1.225rem";

export interface ISlider {
  slug: string;
  link: string;
  title: string;
  subname: string;
}

class PathLink {
  seeFilmDetail = "xem-thong-tin";
  seeFilm = "xem-phim";
  seeProfile = "tai-khoan";
  domain = "http://localhost:3000/";
}
export default new PathLink();
