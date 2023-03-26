import React, { memo, useState, useEffect, useRef } from "react";
import {
  BiTime,
  BiDislike,
  BiLike,
  BiCaretDown,
  BiCaretUp,
  BiChat,
} from "react-icons/bi";
import { Tooltip } from "@mui/material";
import HandleTimeDiff from "../../../../untils/HandleTime";
import { RiReplyLine } from "react-icons/ri";
import styles from "../Comment.module.scss";
import { TpropComment } from "../../../../contants";
import AvataActtached from "../ImageAttach";
import { useDispatch } from "react-redux";
import { GetSubcommentComment } from "../../../../Redux/CommentSlice";
import PathLink from "../../../../contants";
import axios from "axios";
import { TdataLiscomments } from "../../../../LocalStorage";
import ToastMessage from "../../../../untils/ToastMessage";

type Tprops = {
  comment: TpropComment;
  reply?: string;
  onHandleOpenReply: (value: any) => any;
  handleSetListsunComent: any;
  isOpenReply: boolean;
  lengthParent?: number;
};
const LeftHeaderComment: React.FC<Tprops> = ({
  comment,
  reply = "",
  isOpenReply,
  onHandleOpenReply,
  handleSetListsunComent,
  lengthParent = 0,
}) => {
  const [isOpenSubComment, setIsopenSubcomment] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const [lengthSub, setLengthSub] = useState<number>(
    comment.subcomment.length || lengthParent
  );

  const firstloading: boolean = true;
  const handleSeeMoreComment = () => {
    if (isOpenSubComment) {
      handleSetListsunComent([]);
      onHandleOpenReply(!isOpenSubComment);
      setIsopenSubcomment(false);
      return;
    }
    setIsopenSubcomment(true);

    const id_parent = comment.id_comment;
    const subcomment: number[] = comment.subcomment;
    const data: any = {
      id_parent,
      subcomment,
    };
    dispatch(GetSubcommentComment(data)).then((data: any) => {
      handleSetListsunComent(data);
      if (length < data.length) {
        setLengthSub(data.length);
      }
    });
  };
  useEffect(() => {
    if (comment.subcomment.length <= 0) return;
    const data = {
      id_parent: comment.id_film,
      subcomment: comment.subcomment,
    } as {
      id_parent: number;
      subcomment: number[];
    };
    dispatch(GetSubcommentComment(data)).then((data: any) => {
      setLengthSub(data.length);
    });
  }, []);
  useEffect(() => {
    setLengthSub(lengthParent);
    if (!firstloading) {
      setIsopenSubcomment(true);
    }
  }, [lengthParent]);
  const [isLiked, setIsliked] = useState<any>(0);
  const handleUpdate = (value: number) => {
    (async () => {
      const data: TdataLiscomments = {
        id_comment: comment.id_comment,
        crease: value,
      };
      try {
        const res = await axios.post(PathLink.domain + "api/users/", {
          method: "POST",
          data: { id_comment: comment.id_comment, crease: value },
        });
      } catch (err) {
        ToastMessage("Lỗi đường truyền !", "😭").error();
      }
      setIsliked(value);
    })();
  };
  return (
    <>
      <li className="flex gap-2 mb-2">
        <AvataActtached comment={comment} />
        <div className="left-comment relative flex-1">
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
          {reply && (
            <div className="flex items-center italic ">
              <BiChat /> <span className="mx-2">Trả lời</span>
              <span className="text-blue-500 capitalize cursor-pointer">
                {reply}
              </span>
            </div>
          )}
          <p
            className={` text-${comment.user_comment.permission} bg-${comment.user_comment.permission}  ${styles.comment}`}
          >
            {comment.comment}
          </p>

          <p className="flex gap-2 items-center my-2">
            <BiLike
              size="1.25rem"
              cursor="pointer"
              className={`${isLiked == 1 && "text-primary"}`}
              onClick={() => {
                isLiked == 1 || handleUpdate(1);
              }}
            />
            <span
              className={`${
                (comment.total_like > 0 && "text-blue-500") ||
                (comment.total_like < 0 && "text-red-700")
              }`}
            >
              {Math.abs(comment.total_like)}
            </span>
            <BiDislike
              size="1.25rem"
              cursor="pointer"
              className={`${isLiked === -1 && "text-notlike"}`}
              onClick={() => {
                isLiked == -1 || handleUpdate(-1);
              }}
            />
            <RiReplyLine
              className="rotate-180"
              size="1.25rem"
              cursor="pointer"
            />
            <span
              className="cursor-pointer"
              onClick={() => onHandleOpenReply(!isOpenReply)}
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
    </>
  );
};

export default memo(LeftHeaderComment);
