import React, { memo, useMemo } from "react";
import { Avatar, Tooltip } from "@mui/material";
import { RiSendPlaneLine } from "react-icons/ri";
import { useFormik } from "formik";

import * as Yup from "yup";
import styles from "./Comment.module.scss";
import ToastMessage from "../../../untils/ToastMessage";
// user co1 login hay ko
const isLoggin = true;

import axios from "axios";
import { myAccount } from "../../../contants";
import { useDispatch } from "react-redux";
import { PostAddComemt } from "../../../Redux/CommentSlice";
import { IApiSendDataComment } from "../../../Redux/CommentSlice";
const UserComment: React.FC<{
  subcomment?: number;
  id_film?: number;
  getNewCommemt?: any;
}> = ({ subcomment = "", id_film = 0, getNewCommemt }) => {
  const formik: any = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required().min(5, "Ít nhất 5 ký tự"),
    }),

    onSubmit: (values) => {
      const comment: string = values.comment
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
      ToastMessage("Chờ xíu nhé !", "🚀").normal();
      addComment(comment);

      formik.handleReset();
    },
  });
  const disPatch: any = useDispatch();

  const handleBlur = () => {
    if (formik.errors.comment) {
      ToastMessage("Ít nhất 5 ký tự bạn nhé 😚😚 !", "😚").warning();
    }
  };
  function addComment(comment: string) {
    const apiComment: IApiSendDataComment = {
      subcomment: subcomment,
      id_user: myAccount.id_user,
      comment: comment,
      id_film: id_film,
    };

    disPatch(PostAddComemt(apiComment))
      .then((res: any) => {
        getNewCommemt(res.payload.data);
      })
      .catch(() => {});
  }

  return (
    <form onSubmit={formik.handleSubmit} method="post">
      {!isLoggin && (
        <p className="text-center text-base pt-5 font-semibold text-yellow-600">
          Đăng nhập để bình luận nhen!
        </p>
      )}
      <div
        className={`user-comment flex gap-2 ${!isLoggin && "hidden"} ${
          styles.animae_reply
        }`}
      >
        <Tooltip
          className="cursor-pointer"
          title={myAccount.fullname}
          arrow
          placement="bottom"
        >
          <Avatar src={myAccount.avata} />
        </Tooltip>
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
      <div className={`flex justify-end m-3 ${!isLoggin && "hidden"} `}>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-sm text-text py-2 rounded-md px-4 flex items-center"
        >
          <RiSendPlaneLine className="inline-block mr-1" /> Gửi
        </button>
      </div>
    </form>
  );
};

export default memo(UserComment);
