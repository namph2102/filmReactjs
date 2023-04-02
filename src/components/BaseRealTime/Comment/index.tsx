import React, { Suspense, useEffect } from "react";
import RotateLoadding from "../../Loadding/RotateLoadding";

import "./Comment.scss";

const CommentContainer = React.lazy(() => import("./CommentContainer"));
const HeaderComment = React.lazy(() => import("./HeaderComment"));
const UserComment = React.lazy(() => import("./UserComment"));
const Comment = () => {
  return (
    <div className="bg-content wapper">
      <Suspense fallback={<RotateLoadding />}>
        <div className="px-4 pt-4">
          <UserComment />
        </div>
        <HeaderComment />
        <CommentContainer />
      </Suspense>
    </div>
  );
};

export default Comment;
