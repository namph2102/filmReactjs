import React, { memo, useState, useEffect, useRef } from "react";
import { TpropComment, defaultIconSize } from "../../../contants";
import { Avatar, Tooltip } from "@mui/material";
import HandleTimeDiff from "../../../untils/HandleTime";
import {
  BiCaretDown,
  BiCaretUp,
  BiChat,
  BiEditAlt,
  BiInfoCircle,
  BiTime,
  BiTrash,
} from "react-icons/bi";
import SublistIcon from "./ImageContainer";
import clsx from "clsx";
import "./Comment.scss";
const PermissionAttacked = React.lazy(
  () => import("./component/PermissonAttached")
);
const HandleLiekCommemt = React.lazy(() => import("./component/HandleLike"));
import { RiReplyLine } from "react-icons/ri";
import ToastMessage from "../../../untils/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/Store";
import { GetSubcommentComment } from "../../../Redux/CommentSlice";
import PathLink from "../../../contants";
import axios from "axios";
const UserComment = React.lazy(() => import("./UserComment"));
const CommenItem: React.FC<{
  comment: TpropComment;
  idFilm: string;
  reply?: string;
}> = ({ comment, idFilm, reply = "" }) => {
  const dispatch: AppDispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account.user);
  const [openReply, setOpenReplay] = useState<boolean>(false);
  const lengthSub = comment.subcomment.length;
  const [listSubCommemt, setListSubCommemt] = useState<TpropComment[]>([]);
  const BoxchatElement = useRef<HTMLElement | any>(null);
  const commentElement = useRef<HTMLElement | any>(null);
  const [seeResponseSubComment, setSeeResponseSubComment] =
    useState<boolean>(false);
  const getNewCommemt = (listSubCommemt: any) => {
    setListSubCommemt(listSubCommemt);
    setOpenReplay(false);
    setSeeResponseSubComment(true);
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
      setListSubCommemt(data);
    });
  }, []);
  const handleUserDelete = async () => {
    if (!localStorage.getItem(PathLink.nameToken)) return;

    const res = await axios.post(PathLink.domain + "comments/user/delete", {
      method: "post",
      data: {
        idcommemt: comment._id,
        idUser: comment.user_comment._id,
        username: comment.user_comment.username,
      },
      headers: {
        Authorization: "Bearer " + account.accessToken,
      },
    });
    BoxchatElement.current && BoxchatElement.current.classList.add("hidden");
    if (res.data.status === 200) {
      ToastMessage(res.data.message).success();
    } else ToastMessage(res.data.message).warning();
  };
  const handleEditFisrt = (e: any) => {
    console.log(e.target.innerHTML);
  };
  return (
    <li ref={BoxchatElement} className="pb-2 commemt_parent w-full block">
      <div className="flex gap-4  relative">
        <div>
          <PermissionAttacked account={comment.user_comment} />
        </div>
        <div className="comment_info">
          <div className="info_title flex gap-0.5 items-center">
            <span>{comment.user_comment.fullname}</span>
            <BiTime className="ml-2 mr-1 font-semibold" />
            <span className="text-small">
              {HandleTimeDiff(comment.updated_at)}{" "}
            </span>
            {comment.user_comment.icons.length > 0 && (
              <SublistIcon listIcons={comment.user_comment.icons} />
            )}
          </div>
          {reply && (
            <div className="flex items-center italic my-1 border-l-neutral-500 border-l-[2px] pl-1">
              <BiChat /> <span className="mx-2">Trả lời</span>
              <span className="text-blue-500 capitalize cursor-pointer">
                {reply}
              </span>
            </div>
          )}
          <p
            contentEditable={false}
            suppressContentEditableWarning={true}
            onBlur={handleEditFisrt}
            ref={commentElement}
            className={`info_comment bottom-none focus-within:outline-blue-700  focus-within:outline-[1px] permission_${comment.user_comment.permission}`}
          >
            {comment.comment}
          </p>
          <p className="flex gap-2 mb-1 mt-2">
            <HandleLiekCommemt
              total_like={comment.total_like}
              id_comment={comment._id}
            />
            <RiReplyLine
              className="rotate-180 ml-1"
              size="1.25rem"
              cursor="pointer"
            />
            <span
              className="cursor-pointer"
              onClick={() => {
                if (!account._id)
                  ToastMessage("Bạn chưa đăng nhập kìa !").info();
                account._id && setOpenReplay(!openReply);
              }}
            >
              Phản hồi
            </span>
            <span className="ml-10 hover:text-blue-400">
              {lengthSub > 0 && (
                <button
                  className="flex items-center"
                  onClick={() =>
                    setSeeResponseSubComment(!seeResponseSubComment)
                  }
                >
                  <span className="mr-1">
                    {!seeResponseSubComment
                      ? `Xem ${lengthSub} phản hồi`
                      : `Ẩn ${lengthSub} Phản Hồi`}
                  </span>
                  {!seeResponseSubComment ? <BiCaretDown /> : <BiCaretUp />}
                </button>
              )}
            </span>
          </p>
        </div>
        <div className="absolute top-0 right-1">
          {comment.user_comment._id === account._id && (
            <p className="user_edit  flex flex-col w-4 items-center justify-center mt-2">
              <Tooltip title="Edit" arrow placement="left">
                <button
                  onClick={() => {
                    commentElement.current.contentEditable = true;
                    commentElement.current.focus();
                  }}
                >
                  <BiEditAlt size={defaultIconSize} />
                </button>
              </Tooltip>
              <Tooltip
                title="Delete"
                onClick={handleUserDelete}
                className="my-2"
                arrow
                placement="left"
              >
                <button>
                  <BiTrash size={defaultIconSize} />
                </button>
              </Tooltip>
              <Tooltip title="View Infomation" arrow placement="left">
                <button>
                  <BiInfoCircle size={defaultIconSize} />
                </button>
              </Tooltip>
            </p>
          )}
        </div>
      </div>

      <div className="w-full ml-10 mt-2 ">
        {account._id && (
          <div
            className={`lg:w-1/2 w-ful sm:w-3/4  reply_animation ${clsx({
              active: openReply,
            })}`}
          >
            <UserComment
              id_film={idFilm}
              getNewCommemt={getNewCommemt}
              subcomment={comment._id}
            />
          </div>
        )}
      </div>
      <div className="subcommemt w-full pl-12">
        <ul
          className={`subcomment_container ${clsx({
            active: seeResponseSubComment,
          })}`}
        >
          {listSubCommemt.length > 0 &&
            listSubCommemt.map((subcomment: TpropComment, index) => (
              <CommenItem
                key={subcomment._id}
                comment={subcomment}
                idFilm={idFilm}
                reply={comment.user_comment.fullname}
              />
            ))}
        </ul>
      </div>
    </li>
  );
};
export default memo(CommenItem);
