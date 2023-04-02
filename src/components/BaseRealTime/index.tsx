import React, { Suspense } from "react";
import { commemtReadTime } from "../../App";
import RotateLoadding from "../Loadding/RotateLoadding";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const UIBaseReadTime = React.lazy(() => import("./UIBaseReadTime"));
const Comment = React.lazy(() => import("./Comment"));
const CommemtRealtime = () => {
  const idFilm = useSelector((state: RootState) => state.commemt.idFilm);
  commemtReadTime(idFilm);
  console.log("render der CommemtRealtime");

  return (
    <>
      <Suspense fallback={<RotateLoadding />}>
        <UIBaseReadTime />
        <article>
          <Comment />
        </article>
      </Suspense>
    </>
  );
};

export default CommemtRealtime;
