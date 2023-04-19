import React, { Suspense, useState } from "react";

import RotateLoadding from "../Loadding/RotateLoadding";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Tooltip } from "@mui/material";
import { TPageCurrent } from "./UIBaseReadTime";
import Intrust from "./Intrust";
import RankContainer from "./Rank";
const UIBaseReadTime = React.lazy(() => import("./UIBaseReadTime"));
const Comment = React.lazy(() => import("./Comment"));

const CommemtRealtime = () => {
  const isCommemt = useSelector((state: RootState) => state.commemt.isComment);
  const [pageCurrent, setPagecurrent] = useState<string>(TPageCurrent.comment);
  return (
    <>
      <article>
        {isCommemt && (
          <Suspense fallback={<RotateLoadding />}>
            <section>
              <h1 className="text-lg p-3 bg-content text-orange-400">
                Nhóm zalo thông báo phim
                <Tooltip title="Nhớ like, Share hoặc follow bạn nhé :))">
                  <a
                    className="text-base font-semibold hover:text-primary ml-2"
                    href="https://www.facebook.com/profile.php?id=100087004991368"
                    target="_blank"
                  >
                    Movies
                  </a>
                </Tooltip>
              </h1>
            </section>
            <UIBaseReadTime setPagecurrent={setPagecurrent} />

            <article className="min-h-[300px]">
              {pageCurrent == TPageCurrent.comment ? (
                <Comment />
              ) : pageCurrent == TPageCurrent.intrust ? (
                <Intrust />
              ) : (
                <RankContainer />
              )}
            </article>
          </Suspense>
        )}
      </article>
    </>
  );
};

export default CommemtRealtime;
