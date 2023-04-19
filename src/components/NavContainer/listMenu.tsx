import {
  BiCaretDown,
  BiCheckCircle,
  BiTime,
  BiFilm,
  BiWindowOpen,
} from "react-icons/bi";
const defaultIconSize: string = "1.225rem";
interface IsubMenu {
  slug: string;
  _id: string;
  country?: string;
  category?: string;
}
export interface INav {
  path: string;
  title: string;
  iconElement?: JSX.Element | any;
  submenu?: IsubMenu[];
  iconLeft?: boolean;
}

const listMenuNav: INav[] = [
  {
    path: "trang-chu",
    title: "Trang chủ",
    iconElement: "",
  },
  {
    path: "the-loai",
    title: "Thể Loại",
    iconElement: <BiCaretDown fontSize={defaultIconSize} className="mr-1" />,
    iconLeft: true,
    submenu: [],
  },
  {
    path: "quoc-gia",
    title: "Quốc Gia",
    iconElement: <BiCaretDown fontSize={defaultIconSize} className="mr-1" />,
    iconLeft: true,
    submenu: [],
  },
  {
    path: "phim-le",
    title: "Phim Lẻ",
    iconElement: <BiFilm fontSize={defaultIconSize} className="mr-1.5" />,
  },
  {
    path: "phim-dang-chieu",
    title: "Đang chiếu",
    iconElement: <BiWindowOpen fontSize={defaultIconSize} className="mr-1.5" />,
  },
  {
    path: "phim-hoan-thanh",
    title: " Phim Hoàn Thành",
    iconElement: (
      <BiCheckCircle fontSize={defaultIconSize} className="mr-1.5" />
    ),
  },
  {
    path: "phim-sap-chieu",
    title: "Phim Sắp Chiếu",
    iconElement: <BiTime fontSize={defaultIconSize} className="mr-1.5" />,
  },
];
export default listMenuNav;
