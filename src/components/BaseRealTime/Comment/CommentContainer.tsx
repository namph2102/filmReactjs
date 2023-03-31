import React, { memo, Suspense, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { GetListComments } from "../../../Redux/CommentSlice";
import { TpropComment } from "../../../contants";
import LoaddingFiml from "../../Loadding";
import RotateLoadding from "../../Loadding/RotateLoadding";
const CommenItem = React.lazy(() => import("./CommenItem"));
const CommentContainer: React.FC<{ idFilm: number }> = ({ idFilm = 0 }) => {
  const [commemts, setComents] = useState<TpropComment[]>([]);
  const dispatch: any = useDispatch();
  useEffect(() => {
    const handleEventComment = () => {
      dispatch(GetListComments(idFilm)).then(
        (response: { comments: TpropComment[]; status: number }) => {
          if (commemts.length !== response.comments.length) {
            setComents(response.comments);
          }
        }
      );
    };
    window.addEventListener(`commemts-id:${idFilm}`, handleEventComment);
    return () => {
      window.removeEventListener(`commemts-id:${idFilm}`, handleEventComment);
    };
  }, []);

  return (
    <ul className={`text-text w-full 0 mb-2 px-2 relative`}>
      {commemts.length > 0 ? (
        commemts.map((comment: TpropComment) => (
          <Suspense key={comment.id_comment} fallback={<RotateLoadding />}>
            <CommenItem key={comment.id_comment} comment={comment} />
          </Suspense>
        ))
      ) : (
        <LoaddingFiml height="h-40 bg-content" />
      )}
    </ul>
  );
};

export default memo(CommentContainer);
