import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { RiArrowDownSFill, RiPlayCircleLine } from "react-icons/ri";

import { Ifilm } from "../../../Redux/FilmSlice";

import Bookmark from "../component/Bookmark";
const FilmLeft: React.FC<{ film: Ifilm }> = ({ film }) => {
  const leftContainer = useRef<HTMLElement>(null);
  const handleScrolltoEpisode = () => {
    if (leftContainer.current && film.kind == "series") {
      window.scrollTo({
        top:
          window.scrollY +
          leftContainer.current.getBoundingClientRect().y +
          (window.innerWidth <= 1024 ? 700 : 200),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fiml_info--thumb relative flex justify-center">
      <figure ref={leftContainer} className="relative w-56 lg:w-full">
        <Link
          to={`${
            film.kind == "series"
              ? `${PathLink.seeFilm + film.slug}-tap-${film.episode_current}`
              : `${PathLink.seeFilm + film.slug}-full`
          }`}
        >
          <img
            src={film.thumb_url}
            className="rounded shadow-sm object-cover shadow-blue-800 w-full min-h-[300px] h-full opacity-90"
            alt={film.name}
          />
        </Link>
        <div
          className={`btn_detail absolute left-0 bottom-2 flex ${
            film.kind == "series" ? "justify-between" : "justify-center"
          } lg:w-full w-56 px-1`}
        >
          {film.kind == "series" && (
            <button
              onClick={handleScrolltoEpisode}
              className="flex gap-0.5 p-2 rounded"
            >
              Tập Phim <RiArrowDownSFill size={defaultIconSize} />
            </button>
          )}
          <Link
            to={`${
              film.kind == "series"
                ? `${PathLink.seeFilm + film.slug}-tap-${film.episode_current}`
                : `${PathLink.seeFilm + film.slug}-full`
            } `}
          >
            <button className="flex gap-0.5 p-2 rounded">
              <RiPlayCircleLine size={defaultIconSize} /> Xem Phim
            </button>
          </Link>
        </div>
        <Bookmark film={film} />
      </figure>
    </div>
  );
};

export default FilmLeft;
