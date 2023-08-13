import React, { memo, useEffect, useRef } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { RiSendPlaneLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Comment.scss";
import ToastMessage from "../../../untils/ToastMessage";
import { useDispatch } from "react-redux";
import { PostAddComemt } from "../../../Redux/CommentSlice";
import { IApiSendDataComment } from "../../../Redux/CommentSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import moment from "moment";
import AccountAvata from "../../Header/AccountAvata";
import PathLink from "../../../contants";

import { Link } from "react-router-dom";
import { socket } from "./CommentContainer";

const UserComment: React.FC<{
  subcomment?: string;
  getNewCommemt?: any;
}> = ({ subcomment = "", getNewCommemt }) => {
  const btn_submit = useRef<HTMLButtonElement | null>(null);
  const myAccount = useSelector((state: RootState) => state.account.user);
  const id_film = useSelector((state: RootState) => state.commemt.idFilm);
  let maxlength = myAccount?.chatLength || 40;
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .required("Trường này không dược bỏ trống !")
        .min(2, "Ít nhất 2 ký tự bạn nhé 😚😚 !")
        .max(maxlength, `Bạn chỉ được bình luận với ${maxlength} ký tự!`),
    }),

    onSubmit: (values) => {
      const blocked = myAccount.blocked;
      if (blocked) {
        ToastMessage("Tài khoản của bạn đã bị khóa").warning();
        return;
      }

      const comment: string = values.comment
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
      if (myAccount.permission !== "admin") {
        const timeNextChatting =
          myAccount.permission == "vip" ? 20 - myAccount.vip * 2 : 30;
        const timechating: number = Number(
          sessionStorage.getItem("timeCommemt") || null
        );
        if (timechating) {
          const timeWatings = Math.ceil(moment().diff(timechating, "seconds"));
          console.log(timeWatings, timeNextChatting);
          if (timeWatings < timeNextChatting) {
            ToastMessage(
              `Chờ sau ${
                timeNextChatting - timeWatings
              } s để bình luận tiếp nhen`
            ).warning({ autoClose: 3000 });
            return;
          }
        }
      }
      addComment(comment);
      formik.resetForm();
    },
  });

  const disPatch: any = useDispatch();
  const handleBlur = () => {
    if (!formik.values.comment.trim()) return;
    const blocked = myAccount.blocked;
    if (blocked) {
      ToastMessage("Tài khoản đã bị khóa !").warning();
      formik.resetForm();
      return;
    }
    if (formik.errors.comment) {
      ToastMessage(formik.errors.comment, "😚").warning({
        autoClose: 2000,
      });
    }
  };
  async function addComment(comment: string) {
    const apiComment: IApiSendDataComment = {
      subcomment: subcomment,
      id_user: myAccount._id,
      comment: comment,
      id_film: id_film,
    };

    let message = {};
    await disPatch(PostAddComemt(apiComment))
      .then((res: any) => {
        ToastMessage("Bình luận thành công! ").success();
        sessionStorage.setItem("timeCommemt", moment() + "");
        message = res.payload.data;
        if (message) {
          getNewCommemt(message);
        }
      })
      .catch(() => {});
    // người dùng bình luận trong nhóm phim
    socket.emit("nguoi-dung-binh-luan", JSON.stringify(message));
  }
  useEffect(() => {
    const handleAddCommentEnter = (e: any) => {
      if (e.key == "Enter") {
        btn_submit && btn_submit.current?.click();
      }
    };
    document.addEventListener("keydown", handleAddCommentEnter);
    return () => {
      document.removeEventListener("keydown", handleAddCommentEnter);
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} method="post">
      {!myAccount.username && (
        <p className="text-center text-base pt-5 font-semibold text-yellow-600">
          ---&gt; Bạn chưa có đăng nhập nha 😢😢😢
        </p>
      )}
      <div
        className={`user-comment flex gap-2 ${
          !myAccount.username && "hidden"
        } animae_reply`}
      >
        <Link to={PathLink.seeProfile}>
          <Tooltip
            className="cursor-pointer"
            title="Xem Hồ sơ"
            arrow
            placement="bottom"
          >
            <div className=" mr-2 hidden sm:block">
              {myAccount.username && (
                <AccountAvata user={myAccount} width={50} />
              )}
            </div>
          </Tooltip>
        </Link>
        <textarea
          placeholder="Tham gia bình luận ..."
          name="comment"
          className="w-full outline-none p-2 bg-input focus-within:outline-2  outline-slate-700 text-base rounded-md mr-3"
          rows={2}
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={handleBlur}
        ></textarea>
      </div>
      <div
        className={`flex justify-end m-3 ${!myAccount.username && "hidden"} `}
      >
        <button
          ref={btn_submit}
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-sm text-text py-2 rounded-md px-6  lg:w-20 w-1/4 justify-center flex items-center"
        >
          <RiSendPlaneLine className="inline-block mr-1" /> Gửi
        </button>
      </div>
    </form>
  );
};

export default memo(UserComment);
