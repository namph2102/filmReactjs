import React, { memo } from "react";
import "./bookmark.scss";
import { BiTrash } from "react-icons/bi";
import { TBookmark, deleAllBookmark } from "../../Redux/BookmarkSlice";
import BookmarkItem from "./BookmarkItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import ToastMessage from "../../untils/ToastMessage";
const BookMark: React.FC<{
  listBookmarks: TBookmark[];
  isOppenBookmark: boolean;
}> = ({ listBookmarks, isOppenBookmark }) => {
  const account = useSelector((state: RootState) => state.account.user);
  const dispatch: AppDispatch = useDispatch();
  const handlleRemoveall = () => {
    if (listBookmarks?.length > 0) {
      dispatch(deleAllBookmark(account.username));
      ToastMessage("Xóa thành công").info();
    } else {
      ToastMessage("Bạn chưa có phim yêu thích nào").info();
    }
  };

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
            <button
              onClick={handlleRemoveall}
              className="flex py-1 px-2 rounded-lg hover:bg-cyan-700 text-text bg-cyan-600 text-xs"
            >
              <BiTrash size="0.8rem" /> Remove all
            </button>
          </div>
          <div className="bookmark_drop-container  bg-menu">
            <ul className="bookmark_drop-list_film">
              {listBookmarks?.length < 1 && (
                <li className="my-2 px-2 text-text text-sm">
                  Chưa có phim nào được thêm ❤️❤️❤️
                </li>
              )}
              {listBookmarks?.length >= 1 &&
                listBookmarks.map((film) => (
                  <BookmarkItem key={film.time} film={film} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(BookMark);
