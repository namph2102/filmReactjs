import React from "react";
import { IUser } from "../../Redux/UserSlice";
import { Avatar, Tooltip } from "@mui/material";
import { componentsProps, componentsPropsCommemt } from "../../untils";

const AccountAvata: React.FC<{
  user: IUser;
  message?: string;
  width?: number;
}> = ({ user, message = "", width = 40 }) => {
  return (
    <div
      className={`relative rounded-full ${
        user.permission == "vip" && "border-2 border-yellow-600"
      } ${user.permission == "admin" && "border-2 border-blue-600"}`}
    >
      <Tooltip title={message} arrow>
        <Avatar
          alt={user.fullname}
          src={user.avata}
          style={{
            width: width,
            height: width,
            cursor: "pointer",
          }}
        />
      </Tooltip>
      {user.permission !== "member" && (
        <div className="absolute top-0 -right-2 ">
          <Tooltip
            componentsProps={
              user.permission == "vip"
                ? componentsPropsCommemt
                : componentsProps
            }
            title={
              user.permission.toUpperCase() + ` ${user.vip ? user.vip : ""}`
            }
            arrow
            placement="top"
          >
            <img
              src={
                user.permission == "admin"
                  ? "/images/admin.png"
                  : `/images/vip/vip${user.vip}.png`
              }
              width={width / 2}
              height={width / 2}
              alt=""
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default AccountAvata;
