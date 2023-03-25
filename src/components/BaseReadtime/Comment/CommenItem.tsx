import React, { useState, memo } from "react";
import { Tooltip, Avatar } from "@mui/material";
import { BiTime, BiDislike, BiLike } from "react-icons/bi";
import { RiReplyLine } from "react-icons/ri";
import styles from "./Comment.module.scss";
import UserComment from "./UserComment";
import SubcommentItem from "./subCommentItem";
import HandleTimeDiff from "../../../untils/HandleTime";
interface IUserComment {
  id_user: number;
  fullname: string;
  icons: {
    title: string;
    link: string;
  }[];
  avata: string;
  permission: string;
  vip: number;
}
export interface TpropComment {
  id_comment: number;
  id_matched: number;
  id_film: number;
  comment: string;
  updated_at: number;
  created_at: number;
  subcomment: any[] | any | "";
  user_comment: IUserComment;
}
const CommenItem: React.FC<{ comment: TpropComment }> = ({ comment }) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const listsunComent: TpropComment[] = comment.subcomment
    ? JSON.parse(comment.subcomment)
    : [];

  return (
    <>
      <li className="flex gap-2 mb-2">
        <div className="relative">
          <Avatar src={comment.user_comment.avata} />
          <span className={styles.subavata}>
            {comment.user_comment.permission === "admin" ? (
              <Tooltip title="Admin " placement="top" arrow>
                <img src="/images/admin.png" alt="" />
              </Tooltip>
            ) : (
              comment.user_comment.permission === "vip" &&
              comment.user_comment.vip > 0 && (
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
        <div className="left-comment relative">
          <div className="text-base font-semibold flex items-center flex-wrap">
            {/*vip  text-yellow-600 / admin */}
            <span
              className={`${styles.usechat_name} ${
                "capitalize text-" + comment.user_comment.permission
              }`}
            >
              {comment.user_comment.fullname}
            </span>
            <BiTime className="ml-2 mr-1 font-semibold" />
            <span className="text-small">
              {HandleTimeDiff(comment.updated_at)}{" "}
            </span>
            <div className={styles["user-icon"]}>
              {comment.user_comment.icons.map((icon, index) => (
                <Tooltip key={index} title={icon.title} placement="top" arrow>
                  <img src={icon.link} alt="" />
                </Tooltip>
              ))}
            </div>
          </div>
          <p
            className={` text-${comment.user_comment.permission} bg-${comment.user_comment.permission}  ${styles.comment}`}
          >
            {comment.comment}
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
        <li className="lg:w-1/2 md:8/12 w-11/12">
          <UserComment />
        </li>
      )}
      {listsunComent.length > 0 &&
        listsunComent.map((subcomment: TpropComment, index) => (
          <SubcommentItem
            key={index}
            reply={comment.user_comment.fullname}
            comment={subcomment}
          />
        ))}
    </>
  );
};

export default memo(CommenItem);
