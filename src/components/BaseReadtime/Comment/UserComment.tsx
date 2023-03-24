import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { RiSendPlaneLine } from "react-icons/ri";
import styles from "./Comment.module.scss";
const UserComment = () => {
  return (
    <>
      <div className={`user-comment flex gap-2 ${styles.animae_reply}`}>
        <Avatar src="https://hhninja.xyz/assets/upload/srywnadtFlJgDEq1674505557.jpeg" />
        <textarea
          placeholder="Tham gia bình luận ..."
          className="w-full outline-none p-2 bg-input focus-within:outline-2  outline-slate-700 text-base rounded-md mr-3"
          rows={2}
        ></textarea>
      </div>
      <div className={`flex justify-end m-3 ${styles.animae_reply}`}>
        <button className="bg-teal-700 hover:bg-teal-600 text-sm text-text py-2 rounded-md px-4 flex items-center">
          <RiSendPlaneLine className="inline-block mr-1" /> Gửi
        </button>
      </div>
    </>
  );
};

export default memo(UserComment);
