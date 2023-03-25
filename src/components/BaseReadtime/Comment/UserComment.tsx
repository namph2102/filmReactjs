import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { RiSendPlaneLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Comment.module.scss";
import ToastMessage from "../../../untils/ToastMessage";
const UserComment = () => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: (values) => {
      ToastMessage("Chờ xíu nhé !", "🚀").normal();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={`user-comment flex gap-2 ${styles.animae_reply}`}>
        <Avatar src="https://hhninja.xyz/assets/upload/srywnadtFlJgDEq1674505557.jpeg" />
        <textarea
          placeholder="Tham gia bình luận ..."
          name="comment"
          className="w-full outline-none p-2 bg-input focus-within:outline-2  outline-slate-700 text-base rounded-md mr-3"
          rows={2}
          value={formik.values.comment}
          onChange={formik.handleChange}
        ></textarea>
      </div>
      <div className={`flex justify-end m-3 ${styles.animae_reply}`}>
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
