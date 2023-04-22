import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { componentsProps, componentsPropsCommemt } from "../../../untils";
import { Irankuser } from ".";
import SublistIcon from "../Comment/ImageContainer";
import { Link } from "react-router-dom";
import PankLink from "../../../contants";
import moment from "moment";
type Tprops = {
  user: Irankuser;
  top: number;
};
const UserRankItem: React.FC<Tprops> = ({ user, top }) => {
  return (
    <div className="list_rank flex items-center mb-4">
      <Link title="Xem hồ sơ" to={PankLink.seeProfile + "#" + user._id}>
        <img
          src={`${
            top < 6 ? `/images/ranktop${top}.png` : "/images/ranktop6.png"
          }`}
          className="w-20 "
          alt=""
        />
        <p className="text-center text-base font-bold text-primary">
          Top {top}
        </p>
      </Link>
      <div className="relative mr-4 ml-1">
        <Tooltip
          title="Xem hồ sơ"
          componentsProps={componentsProps}
          followCursor
          arrow
          placement="top"
        >
          <Link to={PankLink.seeProfile + "#" + user._id}>
            <img
              className="w-20 h-20 object-cover border-[3px] border-gray-500 border-solid"
              src={user.avata}
              alt="Avata"
            />
          </Link>
        </Tooltip>

        {user.permission == "admin" ? (
          <Tooltip
            title="Admin"
            arrow
            placement="top"
            componentsProps={componentsProps}
          >
            <img
              src="/images/admin.png"
              className="w-10 h-10 object-cover cursor-pointer absolute -top-3 -right-3"
              alt=""
            />
          </Tooltip>
        ) : user.permission == "vip" ? (
          <Tooltip
            title={user.vip == 10 ? "Đại gia Vip 10" : `Vip ${user.vip}`}
            arrow
            placement="top"
            componentsProps={componentsPropsCommemt}
          >
            <img
              src={`/images/vip/vip${user.vip}.png`}
              className="w-10 h-10 object-cover cursor-pointer absolute -top-3 -right-3"
              alt=""
            />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
      <div className="sm:text-sm text-xs font-semibold">
        <p>Tên: {user.fullname || user.username}</p>
        <p>Lực Chiến: {user.expLv.toLocaleString("en-vi")}</p>
        <p>Cảnh giới: {user.nameLevel.name}</p>
        <div className="flex items-center my-0.5">
          Chiến tích:{" "}
          {user.icons.length > 0 ? (
            <SublistIcon listIcons={user.icons} />
          ) : (
            "Không có"
          )}
        </div>
        <p>Ngày tham gia: {moment(user.createdAt).format("DD/MM/YYYY")}</p>
      </div>
    </div>
  );
};

export default UserRankItem;
