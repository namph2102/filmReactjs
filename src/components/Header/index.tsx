import React, { useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import "./header.scss";
import { BiBookmark, BiMenu } from "react-icons/bi";
import { Tooltip, Badge, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Menu from "../NavContainer";
import SearchContainer from "../Search";
import BookMark from "../BookMark";
import Profile from "../ProfileMenu";
export const defaultIconSize: string = "1.225rem";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOppenBookmark, setOppenBookmark] = useState<boolean>(false);
  const screenLG = useMemo<number>(
    () => window.innerWidth,
    [window.innerWidth]
  );
  const HandleClick = () => {
    isOppenBookmark && setOppenBookmark(false);
    setIsOpenMenu(!isOpenMenu);
  };
  const handleBookMark = () => {
    isOpenMenu && setIsOpenMenu(false);
    setOppenBookmark(!isOppenBookmark);
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

        <div className="header-bookmark p-0 m-0 hidden   items-center basis-3/12 lg:flex  flex-row-reverse">
          <Tooltip
            onClick={handleBookMark}
            title="Phim yêu thích của bạn"
            arrow
          >
            <div className="popper-container bg-bookmark">
              <BiBookmark fontSize={defaultIconSize} />
              <p className="mx-2">Phim yêu thích</p>
              <span className="total-bookmark">1</span>
            </div>
          </Tooltip>
          {screenLG >= 1024 && isOppenBookmark && <BookMark />}
        </div>
      </div>
      {/* Navigation */}
      <div className="basis-full flex items-center bg-menu">
        <nav className="container relative sm:mx-auto w-full mx-3">
          <div className="flex justify-between items-center my-2 lg:hidden">
            <BiMenu size="3rem" cursor="pointer" onClick={HandleClick} />
            <div className="flex items-center">
              <div>
                <Badge onClick={handleBookMark} badgeContent={4}>
                  <BiBookmark cursor="pointer" size="2rem" />
                </Badge>
                {screenLG < 1024 && isOppenBookmark && <BookMark />}
              </div>

              <div className="info-avata ml-5">
                <Profile>
                  <Tooltip title="Hồ sơ của bạn" arrow>
                    <Avatar
                      alt="Remy Sharp"
                      src="/images/avata.jpg"
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                </Profile>
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
