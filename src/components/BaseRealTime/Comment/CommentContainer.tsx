import React, { memo, Suspense, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GetListComments, updateLimit } from "../../../Redux/CommentSlice";
import { TpropComment } from "../../../contants";

import RotateLoadding from "../../Loadding/RotateLoadding";
import { AppDispatch, RootState } from "../../../Redux/Store";
import ToastMessage from "../../../untils/ToastMessage";
const CommenItem = React.lazy(() => import("./CommenItem"));
const CommentContainer = () => {
  const CommemtSlice = useSelector((state: RootState) => state.commemt);
  const commemts = CommemtSlice.listMainComment;
  const totalComment = CommemtSlice.count;
  const idFilm = CommemtSlice.idFilm;
  const limitCommemt: number = CommemtSlice.limit;
  const dispatch: AppDispatch = useDispatch();
  const CommemtContainer = useRef<HTMLElement | any>(null);
  useEffect(() => {
    const idInterval = setInterval(() => {
      // dispatch(
      //   GetListComments({
      //     idFilm,
      //     limit: limitCommemt,
      //     totalComment: CommemtSlice.totalHeader | 0,
      //   })
      // );
    }, 2000);
    return () => {
      clearInterval(idInterval);
    };
  }, [limitCommemt, idFilm, CommemtSlice.totalHeader]);
  const loadingMoreCommemt = () => {
    dispatch(updateLimit());
    ToastMessage("Tải thêm bình luận thành công!").success();
    const idTiemout = setTimeout(() => {
      CommemtContainer.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      clearTimeout(idTiemout);
    }, 1000);
  };
  return (
    <>
      <ul
        ref={CommemtContainer}
        className={`text-text w-full 0 mb-2 px-2 relative`}
      >
        {commemts.length > 0 ? (
          commemts.map((comment: TpropComment) => (
            <Suspense key={comment._id} fallback={<RotateLoadding />}>
              <CommenItem key={comment._id} idFilm={idFilm} comment={comment} />
            </Suspense>
          ))
        ) : (
          <p>Chưa có bình bình luận ...</p>
        )}
      </ul>
      {limitCommemt < totalComment && (
        <div className="text-center">
          <button
            onClick={loadingMoreCommemt}
            className="bg-teal-600 hover:bg-teal-700 text-sm text-text py-2 rounded-md px-6"
          >
            Tải thêm bình luận ...
          </button>
        </div>
      )}
    </>
  );
};

export default memo(CommentContainer);
