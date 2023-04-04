import React, { memo, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

import ToastMessage from "../../../../untils/ToastMessage";
import { useDispatch } from "react-redux";
import { GetHandleLikeCopmment } from "../../../../Redux/CommentSlice";
import { likeLocal } from "../../../../untils/localStorage";

const HandleLiekCommemt: React.FC<{
  total_like: number;
  id_comment: string;
}> = ({ total_like, id_comment }) => {
  const [isLiked, setIsLiked] = useState<number>(
    likeLocal.getValues(id_comment)
  );
  const dispatch: any = useDispatch();
  const handleUpdate = (value: number) => {
    likeLocal.set(value, id_comment);

    dispatch(GetHandleLikeCopmment({ id_comment, crease: value }))
      .then(() => setIsLiked(value))
      .catch(ToastMessage("Lỗi đường truyền !", "😭").error);
  };
  return (
    <>
      <BiLike
        size="1.25rem"
        cursor="pointer"
        className={`${isLiked == 1 && total_like != 0 && "text-primary"}`}
        onClick={() => {
          (isLiked === 1 && total_like !== 0) || handleUpdate(1);
        }}
      />
      <span
        className={`${
          (total_like > 0 && "text-blue-500") ||
          (total_like < 0 && "text-red-700")
        }`}
      >
        {Math.abs(total_like)}
      </span>
      <BiDislike
        size="1.25rem"
        cursor="pointer"
        className={`${isLiked === -1 && total_like != 0 && "text-notlike"}`}
        onClick={() => {
          (isLiked === -1 && total_like !== 0) || handleUpdate(-1);
        }}
      />
    </>
  );
};

export default memo(HandleLiekCommemt);
