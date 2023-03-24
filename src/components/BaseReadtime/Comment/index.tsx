import { Avatar, Button, Tooltip } from "@mui/material";
import React from "react";

import styles from "./Comment.module.scss";

import CommentContainer from "./CommentContainer";
import HeaderComment from "./HeaderComment";
import UserComment from "./UserComment";
const Comment = () => {
  return (
    <div className={`bg-content  ${styles["wapper"]}`}>
      <UserComment />
      <HeaderComment />
      <CommentContainer />
    </div>
  );
};

export default Comment;
