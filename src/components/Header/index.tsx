import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./header.scss";
import { BiBookmark, BiMenu } from "react-icons/bi";
import { Tooltip, Badge } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Menu from "../NavContainer";
import SearchContainer from "../Search";
import BookMark from "../BookMark";
import { RenderDesktopProfile, RenderProfile } from "./BookMarkDestop";
import { useDispatch, useSelector } from "react-redux";
import { getListBookmarks, updateLisBookmark } from "../../Redux/BookmarkSlice";
import { AppDispatch, RootState } from "../../Redux/Store";
import { bookmarkLocal } from "../../untils/localStorage";
const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOppenBookmark, setOppenBookmark] = useState<boolean>(true);
  const listBookmarks = useSelector(
    (state: RootState) => state.bookmark.listfilm
  );
  const account = useSelector((state: RootState) => state.account.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getListBookmarks());
  }, []);
  const HandleClick = () => {
    setOppenBookmark(true);
    setIsOpenMenu(!isOpenMenu);
  };
  const handleBookMark = () => {
    console.log(isOpenMenu);
    isOpenMenu && setIsOpenMenu(false);
    setOppenBookmark(!isOppenBookmark);
  };
  useEffect(() => {
    const handleRemoveModel = () => {
      if (isOpenMenu) {
        setIsOpenMenu(!isOpenMenu);
      }
      if (!isOppenBookmark) {
        setOppenBookmark(true);
      }
    };
    document.addEventListener("click", handleRemoveModel);
    return () => {
      document.removeEventListener("click", handleRemoveModel);
    };
  }, [isOpenMenu, isOppenBookmark]);
  const location = useLocation();
  useEffect(() => {
    if (isOpenMenu) {
      setIsOpenMenu(!isOpenMenu);
    }
  }, [location.pathname]);
  return (
    <header className="header bg-main flex items-center flex-wrap sticky">
      <div className="container sm:h-header mx-auto flex justify-between flex-wrap items-center">
        <div className="logo basis-full sm:basis-1/4 lg:basis-3/12">
          <Tooltip title="Trở về trang chủ" followCursor>
            <Link to="/" className="sm:justify-start justify-center  flex">
              <img src={logo} className="w-logo" alt="Video TV" />
            </Link>
          </Tooltip>
        </div>

        <div className="search-container m-4 sm:m-0 basis-full sm:basis-2/3 lg:basis-5/12 xl:basis-1/2">
          <SearchContainer />
        </div>

        <div className="header-bookmark p-0 m-0 items-center hidden basis-3/12 lg:flex justify-end">
          <RenderDesktopProfile
            bookmarklength={listBookmarks?.length}
            onhandleBookMark={handleBookMark}
            isOppenBookmark={isOppenBookmark}
            listBookmarks={listBookmarks}
          />
        </div>
      </div>
      {/* Navigation */}
      <div className="basis-full flex items-center bg-menu">
        <nav
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="container relative sm:mx-auto w-full mx-3"
        >
          <div className="flex justify-between items-center my-2 lg:hidden">
            <BiMenu size="3rem" cursor="pointer" onClick={HandleClick} />
            <div className="flex items-center">
              <div>
                <Badge
                  onClick={handleBookMark}
                  badgeContent={listBookmarks?.length}
                >
                  <BiBookmark cursor="pointer" size="2rem" />
                </Badge>
                <div className="height_effect">
                  <div className="lg:hidden block ">
                    <BookMark
                      isOppenBookmark={isOppenBookmark}
                      listBookmarks={listBookmarks}
                    />
                  </div>
                </div>
              </div>

              <div className="info-avata ml-5">
                <RenderProfile />
              </div>
            </div>
          </div>

          <Menu isOpenMenu={isOpenMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
