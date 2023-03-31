import React, { Suspense, useEffect } from "react";
import RotateLoadding from "../../Loadding/RotateLoadding";

import styles from "./Comment.module.scss";

const CommentContainer = React.lazy(() => import("./CommentContainer"));
const HeaderComment = React.lazy(() => import("./HeaderComment"));
const UserComment = React.lazy(() => import("./UserComment"));
const Comment: React.FC<{ idFilm: number }> = ({ idFilm = 0 }) => {
  return (
    <div className={`bg-content  ${styles["wapper"]}`}>
      <Suspense fallback={<RotateLoadding />}>
        <div className="px-4 pt-4">
          <UserComment />
        </div>
        <HeaderComment idFilm={idFilm} />
        <CommentContainer idFilm={idFilm} />
      </Suspense>
    </div>
  );
};

export default Comment;
