import React, { memo, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  RiContactsBookLine,
  RiMoreLine,
  RiLogoutBoxRLine,
  RiCoinsLine,
} from "react-icons/ri";
import "./profile.scss";
import RegisterMovie from "../../Auth/page/RegisterMovie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { BiCoinStack } from "react-icons/bi";
import { acctachkedAccount, removeUser } from "../../Redux/UserSlice";
import PathLink from "../../contants";
import ToastMessage from "../../untils/ToastMessage";
import LoginMovie from "../../Auth/page/LoginMovie";
const Profile: React.FC<{ children: any }> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenLoginForm, setIsOpenLoginForm] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.account.user);
  const open = Boolean(anchorEl);
  const usernameLocal = localStorage.getItem("username") ?? "";
  console.log(usernameLocal);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user.username) {
      setAnchorEl(event.currentTarget);
    } else {
      setIsOpenLoginForm(true);
    }
  };
  const handleClose = () => {
    if (user.username) {
      setAnchorEl(null);
    } else {
      setIsOpenLoginForm(false);
    }
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem(PathLink.nameToken);
    dispatch(removeUser({ setNull: {} }));
    ToastMessage("Đăng xuất thành công !").success();
  };
  useEffect(() => {
    dispatch(acctachkedAccount());
  }, []);
  return (
    <section>
      <div className={`${!isOpenLoginForm && "hidden"}`}>
        <LoginMovie onHandleClose={setIsOpenLoginForm} />
        {/* fomr register <RegisterMovie onHandleClose={setIsOpenLoginForm} /> */}
      </div>{" "}
      <button onClick={handleClick}>{children}</button>
      {user.username && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#17242e",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar src={user.avata} />
            <div className="flex flex-col">
              <span> {user.username}</span>
              <span className="flex">
                <BiCoinStack size="1.3rem" />{" "}
                <span className="ml-1"> {user.coin}</span>
              </span>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <RiCoinsLine className="mr-2.5" size="1.3rem" /> Nạp tiền
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RiContactsBookLine className="mr-2.5" size="1.3rem" />
            Thông tin
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RiMoreLine className="mr-2.5" size="1.3rem" />
            Thay đổi
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <RiLogoutBoxRLine className="mr-2.5" size="1.3rem" />
            Đăng xuất
          </MenuItem>
        </Menu>
      )}
    </section>
  );
};

export default memo(Profile);
