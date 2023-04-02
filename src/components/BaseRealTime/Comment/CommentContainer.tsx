import React, { memo, Suspense, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GetListComments, updateLimit } from "../../../Redux/CommentSlice";
import { TpropComment } from "../../../contants";

import RotateLoadding from "../../Loadding/RotateLoadding";
import { AppDispatch, RootState } from "../../../Redux/Store";
import ToastMessage from "../../../untils/ToastMessage";
const CommenItem = React.lazy(() => import("./CommenItem"));
const CommentContainer = () => {
  const CommemtSlice: any = useSelector((state: RootState) => state.commemt);
  const commemts = CommemtSlice.listMainComment;
  const totalComment = CommemtSlice.count;
  const idFilm = CommemtSlice.idFilm;
  const limitCommemt: number = CommemtSlice.limit;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleEventComment = () => {
      dispatch(GetListComments({ idFilm, limit: limitCommemt }));
    };
    window.addEventListener(`commemts-id:${idFilm}`, handleEventComment);
    return () => {
      window.removeEventListener(`commemts-id:${idFilm}`, handleEventComment);
    };
  }, [limitCommemt]);
  const loadingMoreCommemt = () => {
    dispatch(updateLimit());
    ToastMessage("Tải thêm bình luận thành công!").success();
  };

  return (
    <>
      <ul className={`text-text w-full 0 mb-2 px-2 relative`}>
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
