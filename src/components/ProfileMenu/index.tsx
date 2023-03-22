import React, { memo } from "react";
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
const Profile: React.FC<{ children: any }> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button onClick={handleClick}>{children}</button>
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
          <Avatar /> Profile
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
        <MenuItem onClick={handleClose}>
          <RiLogoutBoxRLine className="mr-2.5" size="1.3rem" />
          Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(Profile);
