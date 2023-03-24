export const defaultIconSize: string = "1.225rem";

export interface ISlider {
  slug: string;
  link: string;
  title: string;
  description: string;
}
// value slider pages home
export const bannerSliders: ISlider[] = [
  {
    slug: "asd-dsadsa",
    link: "/images/film1.jpg",
    title: " Nhất Niệm Vĩnh Hằng",
    description: "dsa sdasad",
  },
  {
    slug: "asd-dsadsa",
    link: "/images/film2.jpg",
    title: "Đấu Phá Thương Khung",
    description: "dsa sdasad",
  },
  {
    slug: "asd-dsadsa",
    link: "/images/film3.jpg",
    title: "Yêu thần ký",
    description: "dsa sdasad",
  },
];

class PathLink {
  seeFilmDetail = "xem-thong-tin";
  seeFilm = "xem-phim";
  seeProfile = "tai-khoan";
}
export default new PathLink();
