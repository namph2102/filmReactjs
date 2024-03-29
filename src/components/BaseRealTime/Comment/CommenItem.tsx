import React, { memo, useState, useEffect, useRef } from "react";
import { TpropComment, defaultIconSize } from "../../../contants";
import { Tooltip } from "@mui/material";
import HandleTimeDiff from "../../../untils/HandleTime";
import {
  BiBlock,
  BiCaretDown,
  BiCaretUp,
  BiChat,
  BiCheck,
  BiEditAlt,
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
import {
  GetSubcommentComment,
  renRendercomment,
} from "../../../Redux/CommentSlice";
import PathLink from "../../../contants";
import axios from "axios";
import { Link } from "react-router-dom";
import { socket } from "./CommentContainer";
import { componentsProps } from "../../../untils";

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
  const [isBlock, setIsBlock] = useState<boolean>(comment.user_comment.blocked);
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
  }, [comment.subcomment.length]);

  const handleUserDelete = async () => {
    if (!account.accessToken) return;

    const res = await axios.post(PathLink.domain + "comments/user/delete", {
      method: "post",
      data: {
        idcommemt: comment._id,
        permission: account.permission,
        idUser: comment.user_comment._id,
        username: comment.user_comment.username,
      },
      headers: {
        Authorization: "Bearer " + account.accessToken,
      },
    });

    if (res.data.status === 200) {
      ToastMessage(res.data.message).success();
      socket.emit("xoa-noi-dung-binh-luan", comment._id);
      BoxchatElement.current &&
        BoxchatElement.current.classList.add("deleteChildrent");
    } else ToastMessage(res.data.message).warning();
  };
  const handleBlockUser = async (isBlock = true) => {
    if (account.permission !== "admin") {
      ToastMessage("Bạn không có quyền này !").warning();
      return;
    }
    if (account._id === comment.user_comment._id) {
      ToastMessage("Bạn không thể block chính mình !").warning();
      return;
    }
    axios
      .post(PathLink.domain + "user/block", {
        method: "post",
        data: {
          username: comment.user_comment.username,
          _id: comment.user_comment._id,
          blocked: isBlock,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          ToastMessage(res.data?.message).success();
          setIsBlock((isBlock) => !isBlock);
        }
      });
  };
  const handleEditFisrt = async (e: any) => {
    if (!account.accessToken) return;

    if (e.target.innerHTML !== comment.comment) {
      let newCommemt: string = e.target.innerHTML
        .trim()
        .replaceAll("&nbsp;", " ");
      newCommemt = newCommemt.replace(/ {2}/g, " ");
      if (newCommemt.length > account.chatLength) {
        ToastMessage(
          `Bạn không được chat quá ${account.chatLength} ký tự !`
        ).warning();
        return;
      }
      const response = await axios.put(
        PathLink.domain + "comments/user/update",
        {
          method: "put",
          data: {
            idcommemt: comment._id,
            comment: newCommemt,
            idUser: comment.user_comment._id,
            username: comment.user_comment.username,
            permission: account.permission,
          },
          headers: {
            Authorization: "Bearer " + account.accessToken,
          },
        }
      );
      if (response.data.status === 200) {
        dispatch(renRendercomment(comment._id));
        ToastMessage(response.data.message).success();
      } else ToastMessage(response.data.message).warning();
    }
  };

  return (
    <li ref={BoxchatElement} className="pb-2 commemt_parent w-full block">
      <div className="flex gap-4  relative">
        <Link to={PathLink.seeProfile + `#${comment.user_comment._id}`}>
          <PermissionAttacked account={comment.user_comment} />
        </Link>

        <div className="comment_info">
          <div className="info_title flex gap-0.5 items-center">
            <span className="capitalize">
              {comment.user_comment.fullname || comment.user_comment.username}
            </span>
            <BiTime
              title={HandleTimeDiff(comment.updatedAt)}
              className="ml-2 mr-1 font-semibold animate-spin md:text-base text-xl cursor-pointer"
            />
            <span className="text-small hidden md:flex">
              {comment.is_edit && (
                <span className="mx-1 flex items-center">
                  Đã chỉnh sửa
                  <BiCheck size={defaultIconSize} />
                </span>
              )}{" "}
              {HandleTimeDiff(comment.updatedAt)}
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
            dangerouslySetInnerHTML={{ __html: comment.comment }}
            className={`info_comment bottom-none focus-within:outline-blue-700  focus-within:outline-[1px] permission_${comment.user_comment.permission}`}
          ></p>
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
                account._id
                  ? setOpenReplay(!openReply)
                  : ToastMessage("Bạn chưa đăng nhập kìa !").info();
              }}
            >
              Phản hồi
            </span>

            {lengthSub > 0 && (
              <span className="ml-10 hover:text-blue-400">
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
              </span>
            )}
          </p>
        </div>
        <div className="absolute top-0 right-1 bottom-0 flex">
          {(comment.user_comment._id === account._id ||
            account.permission == "admin") && (
            <p className="user_edit flex flex-col w-4  items-center justify-center mt-2">
              <Tooltip title="Sửa bình luận" arrow placement="left">
                <button
                  onClick={() => {
                    commentElement.current.contentEditable = true;
                    commentElement.current.focus();
                    ToastMessage(
                      "Click ra ngoài để được lưu nhen ❤️❤️ !"
                    ).info();
                  }}
                >
                  <BiEditAlt size={defaultIconSize} />
                </button>
              </Tooltip>
              <Tooltip
                title="Xóa bình luận"
                onClick={handleUserDelete}
                className="my-2"
                arrow
                placement="left"
              >
                <button>
                  <BiTrash size={defaultIconSize} />
                </button>
              </Tooltip>
              {account.permission == "admin" &&
                comment.user_comment._id !== account._id && (
                  <Tooltip
                    title={isBlock ? "Mở Block" : "Block"}
                    arrow
                    placement="left"
                  >
                    <button onClick={() => handleBlockUser(!isBlock)}>
                      <BiBlock size={defaultIconSize} />
                    </button>
                  </Tooltip>
                )}
            </p>
          )}
        </div>
      </div>

      <div className="w-full ml-2 sm:ml-10 mt-2 ">
        {account._id && (
          <div
            className={`lg:w-1/2 w-ful sm:w-3/4  reply_animation ${clsx({
              active: openReply,
            })}`}
          >
            <UserComment
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
                key={`${subcomment._id}-${index}`}
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
