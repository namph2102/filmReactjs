import React, { useState, memo } from "react";
import { Tooltip, Avatar } from "@mui/material";
import {
  BiTime,
  BiDislike,
  BiLike,
  BiChat,
  BiCaretDown,
  BiCaretUp,
} from "react-icons/bi";
import { RiReplyLine } from "react-icons/ri";
import styles from "./Comment.module.scss";
import UserComment from "./UserComment";
import HandleTimeDiff from "../../../untils/HandleTime";
import CommenItem from "./CommenItem";
import clsx from "clsx";
import PathLink, { TpropComment } from "../../../contants";
import axios from "axios";
import ToastMessage from "../../../untils/ToastMessage";
const SubcommentItem: React.FC<{ comment: TpropComment; reply: string }> = ({
  comment,
  reply,
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [isOpenSubComment, setIsopenSubcomment] = useState<boolean>(false);
  const [listsunComent, setListsunComent] = useState<TpropComment[]>([]);
  const [lengthSub, setLengthSub] = useState<number>(
    comment.subcomment.length || 1
  );
  const handleSeeMoreComment = () => {
    if (isOpenSubComment) {
      setIsopenSubcomment(!isOpenSubComment);
      setListsunComent([]);
      return;
    }
    (async function () {
      try {
        const res = await axios.post(PathLink.domain + "api/comments", {
          method: "POST",
          data: {
            id_parent: comment.id_comment,
            subcomment: comment.subcomment,
          },
        });
        const newSubComments = res.data.data;
        if (newSubComments.length > 0) {
          setIsopenSubcomment(!isOpenSubComment);
          setListsunComent(newSubComments);
          setLengthSub(newSubComments.length);
        }
      } catch (err) {
        ToastMessage("Kết nối thất bại rồi", "😭").error();
      }
    })();
  };
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
              className={`capitalize ${styles.usechat_name} ${
                "text-" + comment.user_comment.permission
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

          <div className="flex items-center italic ">
            <BiChat /> <span className="mx-2">Trả lời</span>
            <span className="text-blue-500 capitalize cursor-pointer">
              {reply}
            </span>
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

            {comment.subcomment.length > 0 && (
              <Tooltip
                title={
                  isOpenSubComment
                    ? `Đang Xem ${lengthSub} phản hồi`
                    : `Đang Ẩn ${lengthSub} Phản Hồi`
                }
                arrow
                placement="right"
                onClick={handleSeeMoreComment}
              >
                <span className="ml-10 hover:text-blue-400">
                  <button className="flex items-center">
                    <span className="mr-1">
                      {!isOpenSubComment
                        ? `Xem ${lengthSub} phản hồi`
                        : `Ẩn ${lengthSub} Phản Hồi`}
                    </span>
                    {!isOpenSubComment ? <BiCaretDown /> : <BiCaretUp />}
                  </button>
                </span>
              </Tooltip>
            )}
          </p>
        </div>
      </li>

      <li
        className={`commemt_effect-form  ${clsx({
          [styles.btn_reply]: isOpenReply,
        })}`}
      >
        <UserComment
          id_film={comment.id_film}
          subcomment={comment.id_comment}
        />
      </li>
      <ul className="box_container ml-10 my-4">
        {listsunComent.length > 0 &&
          listsunComent.map((subcomment: TpropComment, index) => (
            <CommenItem
              key={index}
              reply={comment.user_comment.fullname}
              comment={subcomment}
            />
          ))}
      </ul>
    </>
  );
};

export default memo(SubcommentItem);
