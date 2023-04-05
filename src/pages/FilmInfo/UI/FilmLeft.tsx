import React, { useRef } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { RiArrowDownSFill, RiPlayCircleLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { componentsProps } from "../../../untils";
import bookmark from "../../../assets/bookmark.png";
import bookmarked from "../../../assets/bookmarked.png";
import { Ifilm } from "../../../Redux/FilmSlice";
const FilmLeft: React.FC<{ film: Ifilm }> = ({ film }) => {
  const leftContainer = useRef<HTMLElement>(null);
  const handleScrolltoEpisode = () => {
    if (leftContainer.current) {
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
        <Link to={`/${PathLink.seeFilm + "/" + film.slug}`}>
          <img
            src={film.thumb_url}
            className="rounded shadow-sm object-cover shadow-blue-800 w-full h-full opacity-90"
            alt={film.name}
          />
        </Link>
        <div className="btn_detail absolute left-0 bottom-2 flex justify-between lg:w-full w-56 px-1">
          <button
            onClick={handleScrolltoEpisode}
            className="flex gap-0.5 p-2 rounded"
          >
            Tập Phim <RiArrowDownSFill size={defaultIconSize} />
          </button>
          <Link to={PathLink.seeFilm + film.slug}>
            <button className="flex gap-0.5 p-2 rounded">
              <RiPlayCircleLine size={defaultIconSize} /> Xem Phim
            </button>
          </Link>
        </div>
        <Tooltip
          title="Thêm kho yêu thích"
          className="cursor-pointer mr-3 absolute top-2 left-1 "
          placement="right"
          arrow
          componentsProps={componentsProps}
        >
          <img
            src={bookmark}
            width="40"
            className="object-cover bookmark_effect"
            alt=""
          />
        </Tooltip>
      </figure>
    </div>
  );
};

export default FilmLeft;
