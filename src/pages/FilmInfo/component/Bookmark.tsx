import { Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { Ifilm } from "../../../Redux/FilmSlice";
import { bookmarkLocal } from "../../../untils/localStorage";
import {
  TBookmark,
  addBookmark,
  deleteBookmark,
} from "../../../Redux/BookmarkSlice";
import ToastMessage from "../../../untils/ToastMessage";
import { componentsProps } from "../../../untils";
import bookmark from "../../../assets/bookmark.png";
import bookmarked from "../../../assets/bookmarked.png";
const Bookmark: React.FC<{ film: Ifilm; className?: string }> = ({
  film,
  className,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [extended, setExtended] = useState<boolean>(false);
  const account = useSelector((state: RootState) => state.account.user);
  useEffect(() => {
    setExtended(
      bookmarkLocal.checkExtended({ value: film.name, keyCheck: "name" })
    );
  }, [film._id]);

  const handleUpdateBookmark = () => {
    if (extended) {
      bookmarkLocal.deleteValue({ value: film.name, keyCheck: "name" });
      dispatch(deleteBookmark(film.name, account.username));
      ToastMessage(`Xóa thành công phim ${film.name}`).success();
    } else {
      const item: TBookmark = {
        time: new Date(Date.now()).toUTCString(),
        avata: film.thumb_url,
        name: film.name,
        slug: film.slug,
      };
      dispatch(addBookmark(item, account.username));
      bookmarkLocal.set(item);
      ToastMessage(`Thêm thành công phim ${film.name}`).success();
    }
    setExtended(!extended);
  };
  return (
    <Tooltip
      title={(extended ? "Đã thêm vào" : "Thêm vào") + " kho yêu thích"}
      className={`cursor-pointer mr-3 absolute top-2 left-1 ${className}`}
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
  );
};

export default Bookmark;
