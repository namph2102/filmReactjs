import React, { memo } from "react";
import CommenItem from "./CommenItem";
import styles from "./Comment.module.scss";
const CommentContainer = () => {
  return (
    <ul className={`text-text w-full  py-5 px-2 `}>
      <CommenItem />
    </ul>
  );
};

export default memo(CommentContainer);
