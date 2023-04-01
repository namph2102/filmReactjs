import { Avatar } from "@mui/material";
import React from "react";
import styles from "../Comment.module.scss";
import { Tooltip } from "@mui/material";
import { TpropComment } from "../../../../contants";
const AvataActtached: React.FC<{ comment: TpropComment }> = ({ comment }) => {
  return (
    <div className="relative">
      <Avatar src={comment.user_comment.avata} />
      <span className={styles.subavata}>
        {comment.user_comment.permission === "admin" ? (
          <Tooltip title="Admin " placement="top" arrow>
            <img src="/images/admin.png" alt="" />
          </Tooltip>
        ) : (
          comment.user_comment.permission === "vip" &&
          comment.user_comment.vip && (
            <Tooltip title="Admin " placement="top" arrow>
              <img
                src={`/images/vip/vip${comment.user_comment.vip}.png`}
                alt=""
              />
            </Tooltip>
          )
        )}
      </span>
    </div>
  );
};

export default AvataActtached;
