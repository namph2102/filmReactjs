import {
  BiCaretDown,
  BiCheckCircle,
  BiTime,
  BiCalendar,
  BiFilm,
  BiWindowOpen,
} from "react-icons/bi";
const defaultIconSize: string = "1.225rem";
interface IsubMenu {
  slug: string;
  name: string;
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
    submenu: [
      {
        slug: "trinh-tham",
        name: "Trinh Thám",
      },
      {
        slug: "hanh-dong",
        name: "Hành Động",
      },
      {
        slug: "phieu-luu",
        name: "Phiêu Lưu ",
      },
      {
        slug: "trung-sinh",
        name: "Trùng Sinh",
      },
      {
        slug: "tien-hiep1",
        name: "Tiên Hiệp 1",
      },
      {
        slug: "tien-hiep2",
        name: "Tiên Hiệp 2",
      },
      {
        slug: "tien-hiep3",
        name: "Tiên Hiệp 3",
      },
      {
        slug: "tien-hiep4",
        name: "Tiên Hiệp 4",
      },
      {
        slug: "tien-hiep5",
        name: "Tiên Hiệp 5",
      },
    ],
  },
  {
    path: "quoc-gia",
    title: "Quốc Gia",
    iconElement: <BiCaretDown fontSize={defaultIconSize} className="mr-1" />,
    iconLeft: true,
    submenu: [
      {
        slug: "trung-quoc",
        name: "Trung Quốc",
      },
      {
        slug: "han-quoc",
        name: "Hàn Quốc",
      },
    ],
  },
  {
    path: "phim-le",
    title: "Phim Lẻ",
    iconElement: <BiFilm fontSize={defaultIconSize} className="mr-1.5" />,
  },
  {
    path: "dang-chieu",
    title: "Đang chiếu",
    iconElement: <BiWindowOpen fontSize={defaultIconSize} className="mr-1.5" />,
  },
  {
    path: "lich-chieu",
    title: "Lịch chiếu",
    iconElement: <BiCalendar fontSize={defaultIconSize} className="mr-1.5" />,
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
