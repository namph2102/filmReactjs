import React from "react";
import { Link } from "react-router-dom";
import PathLink from "../../contants";
import moment from "moment";
import { TBookmark } from "../../Redux/BookmarkSlice";
const BookmarkItem: React.FC<{ film: TBookmark }> = ({ film }) => {
  return (
    <li>
      <Link
        to={PathLink.seeFilmDetail}
        className="bookmark-film flex-bettween-center-wrap"
      >
        <img className="bookmark-film_avata" src={film.avata} alt="" />
        <div style={{ flex: "1" }} className="h-full">
          <h6 className="bookmark-film_title">{film.name}</h6>
          <p className="bookmark-film_time">
            {moment(film.time).format("H:m:s - DD/MM/YYYY")}
          </p>
        </div>
        <button className="btn_bookmark-close">x</button>
      </Link>
    </li>
  );
};

export default BookmarkItem;
