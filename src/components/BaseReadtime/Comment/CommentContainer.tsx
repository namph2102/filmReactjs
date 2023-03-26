import axios from "axios";
import React, { memo, useState, useEffect } from "react";
import CommenItem from "./CommenItem";
import PathLink, { TpropComment } from "../../../contants";

import ToastMessage from "../../../untils/ToastMessage";
import LoaddingFiml from "../../Loadding";
const CommentContainer = () => {
  const [commemts, setcoments] = useState<TpropComment[]>([]);
  const [time, setTime] = useState<number>(0);
  console.log("re-render container");

  useEffect(() => {
    let idtiemout: any;
    (async () => {
      try {
        idtiemout = setTimeout(async () => {
          const res = await axios.get(PathLink.domain + "api/comments");
          setcoments(res.data.data);

          setTime(time + 1);
        }, 2000);
      } catch (err) {
        ToastMessage("😭 Chúng tôi rất tiếc vì lỗi này :(");
      }
    })();
    return () => {
      clearTimeout(idtiemout);
    };
  }, [time]);

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
