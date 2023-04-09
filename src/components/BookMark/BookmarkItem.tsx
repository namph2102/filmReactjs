import React from "react";
import { Link } from "react-router-dom";
import PathLink from "../../contants";
import moment from "moment";
import { TBookmark, deleteBookmark } from "../../Redux/BookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
const BookmarkItem: React.FC<{ film: TBookmark }> = ({ film }) => {
  const dispacth: AppDispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account.user);
  const handleDelete = () => {
    dispacth(deleteBookmark(film.name, account.username));
  };
  return (
    <li className="relative">
      <Link
        to={PathLink.seeFilmDetail}
        className="bookmark-film flex-bettween-center-wrap"
      >
        <img className="bookmark-film_avata" src={film.avata} alt="" />
        <div style={{ flex: "1" }} className="h-full">
          <h6 className="bookmark-film_title capitalize ">
            <span className="overfllow_eclipse block"> {film.name}</span>
          </h6>
          <p className="bookmark-film_time">
            {moment(film.time).format("HH:mm:ss - DD/MM/YYYY")}
          </p>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="btn_bookmark-close absolute top-1/2 translate-y-[-50%] right-1"
      >
        x
      </button>
    </li>
  );
};

export default BookmarkItem;
