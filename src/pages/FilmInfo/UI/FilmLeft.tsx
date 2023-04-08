import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { RiArrowDownSFill, RiPlayCircleLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { componentsProps } from "../../../untils";
import bookmark from "../../../assets/bookmark.png";
import bookmarked from "../../../assets/bookmarked.png";
import { Ifilm } from "../../../Redux/FilmSlice";
import { bookmarkLocal } from "../../../untils/localStorage";
import moment from "moment-timezone";
import ToastMessage from "../../../untils/ToastMessage";
const FilmLeft: React.FC<{ film: Ifilm }> = ({ film }) => {
  const [extended, setExtended] = useState<boolean>(false);
  useEffect(() => {
    setExtended(bookmarkLocal.getValues(film._id) !== null);
  }, [film._id]);
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

  const handleUpdateBookmark = () => {
    if (extended) {
      bookmarkLocal.deleteValue({}, film._id);
      ToastMessage(`Xóa thành công phim ${film.name}`).success();
    } else {
      ToastMessage(`Thêm thành công phim ${film.name}`).success();
      bookmarkLocal.set(
        {
          time: new Date(Date.now()),
          avata: film.thumb_url,
          name: film.name,
          slug: film.slug,
        },
        film._id
      );
    }
    setExtended(!extended);
  };
  return (
    <div className="fiml_info--thumb relative flex justify-center">
      <figure ref={leftContainer} className="relative w-56 lg:w-full">
        <Link to={`${PathLink.seeFilm + film.slug}`}>
          <img
            src={film.thumb_url}
            className="rounded shadow-sm object-cover shadow-blue-800 w-full h-full opacity-90"
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
          <Link to={PathLink.seeFilm + film.slug}>
            <button className="flex gap-0.5 p-2 rounded">
              <RiPlayCircleLine size={defaultIconSize} /> Xem Phim
            </button>
          </Link>
        </div>
        <Tooltip
          title={(extended ? "Đã thêm vào" : "Thêm vào") + " kho yêu thích"}
          className="cursor-pointer mr-3 absolute top-2 left-1 "
          placement="right"
          onClick={handleUpdateBookmark}
          arrow
          componentsProps={componentsProps}
        >
          <img
            src={extended ? bookmarked : bookmark}
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
