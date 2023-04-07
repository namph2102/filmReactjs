import { Rating, Tooltip } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import { BiCalendar, BiTime, BiWifi0 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { Ifilm } from "../../../Redux/FilmSlice";
import starImage from "../../../assets/star.png";
import PathLink, { defaultIconSize } from "../../../contants";
import KindFilm from "../component/KindFilm";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
const FilmRight: React.FC<{ film: Ifilm }> = ({ film }) => {
  const account: any = useSelector((state: RootState) => state.account.user);
  const [star, setStar] = useState<number>(0);
  const [isExtend, setExtended] = useState<boolean>(false);
  const [avarage, setAvarage] = useState<number>(5);
  const [totalStar, setTotalStar] = useState<number>(film.star);
  const [isLoadding, setIsLoaading] = useState<boolean>(true);
  const handleSubmitStar: any = (
    event: React.SyntheticEvent,
    value: number | string
  ): any => {
    if (!value) setStar(star);
    if (value && value != star) {
      setIsLoaading(true);
      if (!isExtend) {
        axios
          .post(PathLink.domain + "star/add", {
            method: "post",
            message: "thêm star mới ",
            data: {
              idFilm: film._id,
              star: value,
              useID: account._id,
            },
          })
          .then((response) => {
            setAvarage(response.data.average);
            setExtended(true);
            setTotalStar(totalStar + 1);
            setStar(Number(value));
          })
          .finally(() => setIsLoaading(false));
      } else {
        axios
          .post(PathLink.domain + "star/update", {
            method: "post",
            message: "Chỉnh sửa số star",
            data: {
              idFilm: film._id,
              star: value,
              useID: account._id,
            },
          })
          .then((response) => {
            setAvarage(response.data.average);
            setStar(Number(value));
          })
          .finally(() => setIsLoaading(false));
      }
    }
  };
  console.log("avarage", avarage, "isExtend", isExtend, "star", star);
  useEffect(() => {
    axios
      .post(PathLink.domain + "star/average", {
        method: "post",
        data: { idFilm: film._id, idUser: account._id },
        idUser: account._id,
      })
      .then((response) => {
        if (response.data.status === 200) {
          const { average, star, isExtended } = response.data;
          setAvarage(average);
          setExtended(isExtended);
          setStar(star);
        }
      })
      .catch((response) => {
        const { average } = response.data;
        setExtended(false);
        setAvarage(avarage);
      })
      .finally(() => {
        setIsLoaading(false);
      });
  }, [film._id]);
  return (
    <div className="view_info  col-span-2 px-2">
      <div className="view_info-item">
        <p className="view_info-title">Tên Phim:</p>{" "}
        <h1 className="capitalize text-primary text-xl font-bold">
          {film.name}
        </h1>
      </div>
      <div className="view_info-item">
        <p className="view_info-title">Tên Khác:</p>{" "}
        <p className="capitalize text-gray-400">{film.origin_name}</p>
      </div>
      <div className="view_info-item">
        <p className="view_info-title"> Thể Loại:</p>
        <KindFilm kindlists={film.category} />
      </div>
      <div className="view_info-item">
        <p className="view_info-title">
          {film.kind == "feature" ? "Trọn bộ" : "Tập mới nhất"}:
        </p>{" "}
        <h1 className="capitalize">
          <Link to={PathLink.seeFilm + film.slug}>
            <button className="bg-blue-700 hover:bg-blue-600 py-2 rounded-xl px-4">
              {film.kind == "series"
                ? ` Tập ${
                    film.episode_current === film.eposode_total
                      ? `${film.episode_current} End`
                      : film.episode_current
                  }`
                : ` Full ${film.lang}`}
            </button>
          </Link>
        </h1>
      </div>
      <div className="view_info-item">
        <p className="view_info-title">Thông Tin Khác:</p>{" "}
        <p className="capitalize flex items-center font-thin text-gray-400">
          <BiCalendar size={defaultIconSize} />
          <span className="ml-0.5 mr-1"> {film.year}</span>
          <BiTime className="animate-spin ml-2" size={defaultIconSize} />{" "}
          <span className="ml-0.5 mr-1"> {film.time}</span>
        </p>
      </div>
      <div className="view_info-item">
        <p className="view_info-title">Đánh Giá:</p>{" "}
        <p className=" flex items-center">
          <img width="40" src={starImage} alt="" />{" "}
          <span className="font-semibold text-4xl pt-2 ml-2">
            {String(avarage).length > 4 ? avarage.toFixed(2) : avarage}
            <sub className="text-sm ml-1 font-normal">
              {" "}
              / 5 <span className="text-xs font-light">({totalStar} lượt)</span>
            </sub>
          </span>
          <span className="relative flex flex-col items-center ml-2 gap-y-1">
            {!isLoadding && (
              <Rating
                name="half-rating"
                readOnly={account._id ? false : true}
                className="ml-2 mt-4 "
                defaultValue={star}
                precision={0.5}
                onChange={handleSubmitStar}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ffc107",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#2196f3",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#ffc107",
                  },
                }}
              />
            )}
            {isLoadding && (
              <span className="absolute flex top-0 left-2">
                <HiOutlineCubeTransparent
                  className="animate-spin"
                  size={defaultIconSize}
                />
                <span className="mx-1"></span>
                <HiOutlineCubeTransparent
                  className="animate-spin"
                  size={defaultIconSize}
                />
              </span>
            )}
            {!account._id && (
              <span style={{ fontSize: "0.6rem" }}>
                {" "}
                Lưu ý: Đăng nhập để bình chọn
              </span>
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(FilmRight);
