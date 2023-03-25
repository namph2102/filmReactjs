import axios from "axios";
import React, { memo, useState, useEffect } from "react";
import CommenItem from "./CommenItem";
import PathLink from "../../../contants";
import { TpropComment } from "./CommenItem";
import styles from "./Comment.module.scss";
import ToastMessage from "../../../untils/ToastMessage";
import LoaddingFiml from "../../Loadding";
const CommentContainer = () => {
  const [commemts, setcoments] = useState<TpropComment[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(PathLink.domain + "api/comments");
        console.log(res.data.data);

        setcoments(res.data.data);
      } catch (err) {
        ToastMessage("😭 Chúng tôi rất tiếc vì lỗi này :(");
      }
    })();
  }, []);
  return (
    <ul className={`text-text w-full 0 py-5 px-2 relative`}>
      {commemts.length > 0 ? (
        commemts.map((comment: TpropComment) => (
          <CommenItem key={comment.id_comment} comment={comment} />
        ))
      ) : (
        <LoaddingFiml height="h-40 bg-content" />
      )}
    </ul>
  );
};

export default memo(CommentContainer);
