import { Avatar } from "@mui/material";
import React from "react";
import "../Comment.scss";
import { Tooltip } from "@mui/material";
import { IUserComment } from "../../../../contants";
import { componentsProps, componentsPropsCommemt } from "../../../../untils";
const PermissionAttacked: React.FC<{ account: IUserComment }> = ({
  account,
}) => {
  return (
    <div className="relative">
      <Avatar src={account.avata} />
      <span className="subavata">
        {account.permission === "admin" ? (
          <Tooltip
            componentsProps={componentsProps}
            title="Admin"
            placement="top"
            arrow
          >
            <img src="/images/admin.png" alt="" />
          </Tooltip>
        ) : (
          account.permission === "vip" &&
          account.vip && (
            <Tooltip
              componentsProps={componentsPropsCommemt}
              title={`Vip ${account.vip}`}
              placement="top"
              arrow
            >
              <img src={`/images/vip/vip${account.vip}.png`} alt="" />
            </Tooltip>
          )
        )}
      </span>
    </div>
  );
};

export default PermissionAttacked;
