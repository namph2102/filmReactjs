import React, { memo, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

import ToastMessage from "../../../../untils/ToastMessage";
import { useDispatch } from "react-redux";
import { GetHandleLikeCopmment } from "../../../../Redux/CommentSlice";
const LikeCommemt: React.FC<{ total_like: number; id_comment: string }> = ({
  total_like,
  id_comment,
}) => {
  const [isLiked, setIsLiked] = useState<number>(0);
  const dispatch: any = useDispatch();
  const handleUpdate = (value: number) => {
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

export default memo(LikeCommemt);
