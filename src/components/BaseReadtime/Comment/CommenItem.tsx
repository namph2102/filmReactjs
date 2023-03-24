import React, { useState } from "react";
import { Tooltip, Avatar } from "@mui/material";
import { BiTime, BiDislike, BiLike } from "react-icons/bi";
import { RiReplyLine } from "react-icons/ri";
import styles from "./Comment.module.scss";
import UserComment from "./UserComment";
const CommenItem = () => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  return (
    <>
      <li className="flex gap-2 mb-2">
        <div className={styles["comment-info"]}>
          <Avatar src="https://hhninja.xyz/assets/upload/srywnadtFlJgDEq1674505557.jpeg" />
        </div>
        <div className="left-comment relative">
          <p className="text-base font-semibold flex items-center flex-wrap">
            <span className={styles.usechat_name}>
              {" "}
              Nhất Niệm Thành Ma dsa sad sdsadsaddsa sda sad dsa
            </span>
            <BiTime className="ml-2 mr-1 font-semibold" />
            <span className="text-small">12 giờ trước</span>
            <ul className={styles["user-icon"]}>
              <Tooltip title="Phượng hoàng lửa" placement="top" arrow>
                <img
                  src="https://hhninja.xyz/assets/upload/GNteyJeOLYJfuYf1666106400.png"
                  alt=""
                />
              </Tooltip>

              <Tooltip title="Phượng hoàng lửa" placement="top" arrow>
                <img
                  src="https://hhninja.xyz/assets/upload/GNteyJeOLYJfuYf1666106400.png"
                  alt=""
                />
              </Tooltip>
            </ul>
          </p>
          <p className={`text-slate-400  ${styles.comment}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. dsas dsa
            saddsasdadsa adsa sdasdasdasdasdasdasdaasd Sapiente, i dsadsa
          </p>
          <p className="flex gap-2 items-center my-2">
            <BiLike size="1.25rem" cursor="pointer" />
            <span>1</span>
            <BiDislike size="1.25rem" cursor="pointer" />
            <RiReplyLine
              className="rotate-180"
              size="1.25rem"
              cursor="pointer"
            />
            <span
              className="cursor-pointer"
              onClick={() => setIsOpenReply(!isOpenReply)}
            >
              Phản hồi
            </span>
          </p>
        </div>
      </li>
      {isOpenReply && (
        <li>
          <UserComment />
        </li>
      )}
    </>
  );
};

export default CommenItem;
