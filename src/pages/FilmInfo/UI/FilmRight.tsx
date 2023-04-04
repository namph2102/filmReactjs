import { Rating } from "@mui/material";
import React from "react";
import { BiCalendar, BiTime, BiWifi0 } from "react-icons/bi";
import { Link } from "react-router-dom";

import { Ifilm } from "../../../Redux/FilmSlice";
import star from "../../../assets/star.png";
import PathLink, { defaultIconSize } from "../../../contants";
import KindFilm from "../component/KindFilm";
const FilmRight: React.FC<{ film: Ifilm }> = ({ film }) => {
  const handleSubmitStar = (
    event: React.SyntheticEvent,
    value: number | null
  ): void => {
    console.log(value);
  };
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
          <img width="40" src={star} alt="" />{" "}
          <span className="font-semibold text-4xl pt-2 ml-2">
            {film.star}
            <sub className="text-sm ml-1 font-normal">
              {" "}
              / 5 <span className="text-xs font-light">(312 lượt)</span>
            </sub>
          </span>
          <span className="relative">
            <Rating
              name="half-rating"
              className="ml-2 mt-4 "
              defaultValue={film.star}
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
            />{" "}
            <span className="flex animate-spin absolute">
              <BiWifi0 fontSize={defaultIconSize} />
              <BiWifi0 fontSize={defaultIconSize} />
            </span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FilmRight;
