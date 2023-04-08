import React, { useEffect, useLayoutEffect, useState } from "react";
import "./bookmark.scss";
import { BiTrash } from "react-icons/bi";
import { TBookmark } from "../../Redux/BookmarkSlice";
import BookmarkItem from "./BookmarkItem";

const BookMark: React.FC<{
  listBookmarks: TBookmark[];
  isOppenBookmark: boolean;
}> = ({ listBookmarks, isOppenBookmark }) => {
  return (
    <>
      <div
        className={`header-bookmark_drop ${
          isOppenBookmark ? "height_effect" : "height_auto"
        }`}
      >
        <div className="bookmark_drop-container">
          <div className="bookmark_drop-head flex items-center justify-between bg-menu">
            <h6 className="title_special">BOOKMARKS</h6>
            <button className="flex py-1 px-2 rounded-lg hover:bg-cyan-700 text-text bg-cyan-600 text-xs">
              <BiTrash size="0.8rem" /> Remove all
            </button>
          </div>
          <div className="bookmark_drop-container  bg-menu">
            <ul className="bookmark_drop-list_film">
              {listBookmarks?.length > 0 &&
                listBookmarks.map((film) => (
                  <BookmarkItem key={film.name} film={film} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookMark;
