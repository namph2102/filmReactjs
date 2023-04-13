import React, { Suspense } from "react";

import RotateLoadding from "../Loadding/RotateLoadding";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const UIBaseReadTime = React.lazy(() => import("./UIBaseReadTime"));
const Comment = React.lazy(() => import("./Comment"));
const CommemtRealtime = () => {
  const isCommemt = useSelector((state: RootState) => state.commemt.isComment);
  return (
    <>
      {isCommemt && (
        <Suspense fallback={<RotateLoadding />}>
          <UIBaseReadTime />
          <article>
            <Comment />
          </article>
        </Suspense>
      )}
    </>
  );
};

export default CommemtRealtime;
