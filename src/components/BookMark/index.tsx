import React from "react";
import "./bookmark.scss";
import { BiTrash } from "react-icons/bi";
const BookMark = () => {
  console.log("renrender book mar 2k");

  return (
    <>
      <div className="header-bookmark_drop">
        <div className="bookmark_drop-container">
          <div className="bookmark_drop-head flex items-center justify-between bg-menu">
            <h6 className="title_special">BOOKMARKS</h6>
            <button className="flex py-1 px-2 rounded-lg hover:bg-cyan-700 text-text bg-cyan-600 text-xs">
              <BiTrash size="0.8rem" /> Remove all
            </button>
          </div>
          <div className="bookmark_drop-container  bg-menu">
            <ul className="bookmark_drop-list_film">
              <li>
                <a href="" className="bookmark-film flex-bettween-center-wrap">
                  <img
                    className="bookmark-film_avata"
                    src="/images/thumsfilm.jpg"
                    alt=""
                  />
                  <div style={{ flex: "1" }} className="h-full">
                    <h6 className="bookmark-film_title">Quý cô cademy</h6>
                    <p className="bookmark-film_time">13/03/2023</p>
                  </div>
                  <button className="btn_bookmark-close">x</button>
                </a>
              </li>
              <li>
                <a href="" className="bookmark-film flex-bettween-center-wrap">
                  <img
                    className="bookmark-film_avata"
                    src="/images/thumsfilm.jpg"
                    alt=""
                  />
                  <div style={{ flex: "1" }} className="h-full">
                    <h6 className="bookmark-film_title">Quý cô cademy</h6>
                    <p className="bookmark-film_time">13/03/2023</p>
                  </div>
                  <button className="btn_bookmark-close">x</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookMark;
