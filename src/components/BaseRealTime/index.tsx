import React, { Suspense } from "react";
import { commemtReadTime } from "../../App";
import RotateLoadding from "../Loadding/RotateLoadding";

const UIBaseReadTime = React.lazy(() => import("./UIBaseReadTime"));
const Comment = React.lazy(() => import("./Comment"));
const CommemtRealtime: React.FC<{ idFilm: number }> = ({ idFilm = 0 }) => {
  commemtReadTime(idFilm);
  console.log("render der CommemtRealtime");

  return (
    <>
      <Suspense fallback={<RotateLoadding />}>
        <UIBaseReadTime />
        <article>
          <Comment idFilm={idFilm} />
        </article>
      </Suspense>
    </>
  );
};

export default CommemtRealtime;
