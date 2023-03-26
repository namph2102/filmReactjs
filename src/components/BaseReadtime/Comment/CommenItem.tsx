import React, { useState, memo, useEffect } from "react";
import clsx from "clsx";
import styles from "./Comment.module.scss";
import UserComment from "./UserComment";

import PathLink, { TpropComment } from "../../../contants";

import LeftHeaderComment from "./layoutComment.tsx/LeftHeaderComment";

const CommenItem: React.FC<{ comment: TpropComment; reply?: string }> = ({
  comment,
  reply = "",
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const [listsunComent, setListsunComent] = useState<TpropComment[]>([]);
  const [lengthParent, setLengthParent] = useState<number>(1);
  const HandlegetNewCommemt = (listCommemtsub: TpropComment[]) => {
    setListsunComent([...listCommemtsub]);
    setLengthParent(listsunComent.length + 1);
    setIsOpenReply(false);
  };
  return (
    <>
      <LeftHeaderComment
        lengthParent={lengthParent}
        onHandleOpenReply={setIsOpenReply}
        reply={reply}
        isOpenReply={isOpenReply}
        comment={comment}
        handleSetListsunComent={setListsunComent}
      />

      <ul className="box_container ml-10 my-4">
        <li
          className={`commemt_effect-form  ${clsx({
            [styles.btn_reply]: isOpenReply,
          })}`}
        >
          <UserComment
            subcomment={comment.id_comment}
            id_film={comment.id_film}
            getNewCommemt={HandlegetNewCommemt}
          />
        </li>

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

export default memo(CommenItem);
