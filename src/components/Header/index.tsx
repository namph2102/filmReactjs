import React, { useCallback, useState } from "react";
import logo from "../../assets/logo.png";
import "./header.scss";
import {
  BiSearch,
  BiBookmark,
  BiAnalyse,
  BiCaretDown,
  BiCheckCircle,
  BiTime,
  BiCalendar,
  BiFilm,
  BiWindowOpen,
  BiMenu,
  BiTrash,
} from "react-icons/bi";
import { Tooltip, Badge, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "../NavContainer";
import SearchContainer from "../Search";
export const defaultIconSize: string = "1.225rem";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const HandleClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  return (
    <header className="header  bg-main flex items-center flex-wrap">
      <div className="container sm:h-header mx-auto flex justify-between flex-wrap">
        <div className="logo basis-full sm:basis-1/4 lg:basis-3/12">
          <Tooltip title="Trở về trang chủ" followCursor>
            <Link to="/" className="sm:justify-start justify-center  flex">
              <img src={logo} className="w-logo" alt="Video TV" />
            </Link>
          </Tooltip>
        </div>

        <div className="search-container m-4 sm:m-0 basis-full sm:basis-2/3 lg:basis-1/2">
          <SearchContainer sizeIcon={defaultIconSize} />
        </div>

        <div className="header-bookmark p-0 m-0 hidden  items-center basis-3/12 lg:flex  flex-row-reverse">
          <Tooltip title="Phim yêu thích của bạn" arrow>
            <div className="popper-container bg-bookmark">
              <BiBookmark fontSize={defaultIconSize} />
              <p className="mx-2">Phim yêu thích</p>
              <span className="total-bookmark">1</span>
            </div>
          </Tooltip>
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
                    <a
                      href=""
                      className="bookmark-film flex-bettween-center-wrap"
                    >
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
                    <a
                      href=""
                      className="bookmark-film flex-bettween-center-wrap"
                    >
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
        </div>
      </div>
      {/* Navigation */}
      <div className="basis-full flex items-center bg-menu">
        <nav className="container sm:mx-auto w-full mx-3">
          <div className="flex justify-between items-center my-2 lg:hidden">
            <BiMenu size="3rem" cursor="pointer" onClick={HandleClick} />
            <div className="flex items-center">
              <Badge badgeContent={4}>
                <BiBookmark cursor="pointer" size="2rem" />
              </Badge>

              <div className="info-avata ml-5">
                <Tooltip title="Hồ sơ của bạn" arrow>
                  <Avatar
                    alt="Remy Sharp"
                    src="/images/avata.jpg"
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                  />
                </Tooltip>
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
