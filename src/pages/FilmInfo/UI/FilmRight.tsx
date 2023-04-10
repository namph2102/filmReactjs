import React, { memo } from "react";
import { BiCalendar, BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Ifilm } from "../../../Redux/FilmSlice";

import PathLink, { defaultIconSize } from "../../../contants";
import KindFilm from "../component/KindFilm";
import StarFilm from "../component/StarFilm";
const FilmRight: React.FC<{ film: Ifilm }> = ({ film }) => {
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
                      ? `${film.episode_current} END`
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
          <StarFilm film={film} />
        </p>
      </div>
    </div>
  );
};

export default memo(FilmRight);
