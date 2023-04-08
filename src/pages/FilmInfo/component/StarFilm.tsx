import React, { useState, useEffect } from "react";
import starImage from "../../../assets/star.png";
import { RootState } from "../../../Redux/Store";
import { useSelector } from "react-redux";
import { Ifilm } from "../../../Redux/FilmSlice";
import PathLink, { defaultIconSize } from "../../../contants";
import axios from "axios";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import RatingUI from "./RatingUI";

const StarFilm: React.FC<{ film: Ifilm }> = ({ film }) => {
  const [isLoadding, setIsLoaading] = useState<boolean>(true);
  const [avarage, setAvarage] = useState<number>(5);
  const account: any = useSelector((state: RootState) => state.account.user);
  const [totalStar, setTotalStar] = useState<number>(0);
  const [star, setStar] = useState<number>(0);
  const [isExtend, setExtended] = useState<boolean>(false);
  useEffect(() => {
    axios
      .post(PathLink.domain + "star/average", {
        method: "post",
        data: { idFilm: film._id, idUser: account._id },
        idUser: account._id,
      })
      .then((response) => {
        if (response.data.status === 200) {
          const { average, star, isExtended } = response.data;
          setAvarage(average);
          setExtended(isExtended);
          setStar(star);
          setTotalStar(film.star);
        }
      })
      .catch((response) => {
        const { average } = response.data;
        setExtended(false);
        setAvarage(avarage);
      })
      .finally(() => {
        setIsLoaading(false);
      });
  }, [film._id]);
  const handleSubmitStar: any = (
    event: React.SyntheticEvent,
    value: number | string
  ): any => {
    if (!value) setStar(star);
    if (value && value != star) {
      setIsLoaading(true);
      if (!isExtend) {
        axios
          .post(PathLink.domain + "star/add", {
            method: "post",
            message: "thêm star mới ",
            data: {
              idFilm: film._id,
              star: value,
              useID: account._id,
            },
          })
          .then((response) => {
            setAvarage(response.data.average);
            setExtended(true);
            setTotalStar(totalStar + 1);
            setStar(Number(value));
          })
          .finally(() => setIsLoaading(false));
      } else {
        axios
          .post(PathLink.domain + "star/update", {
            method: "post",
            message: "Chỉnh sửa số star",
            data: {
              idFilm: film._id,
              star: value,
              useID: account._id,
            },
          })
          .then((response) => {
            setAvarage(response.data.average);
            setStar(Number(value));
          })
          .finally(() => setIsLoaading(false));
      }
    }
  };
  // console.log("avarage", avarage, "isExtend", isExtend, "star", star);
  return (
    <>
      <img width="40" src={starImage} alt="" />{" "}
      <span className="font-semibold text-4xl pt-2 ml-2">
        {String(avarage).length > 4 ? avarage.toFixed(2) : avarage}
        <sub className="text-sm ml-1 font-normal">
          {" "}
          / 5 <span className="text-xs font-light">({totalStar} lượt)</span>
        </sub>
      </span>
      <span className="relative flex flex-col items-center ml-2 gap-y-1">
        {!isLoadding && (
          <RatingUI
            handleSubmitStar={handleSubmitStar}
            id={account._id}
            star={star}
          />
        )}
        {isLoadding && (
          <span className="absolute flex top-0 left-2">
            <HiOutlineCubeTransparent
              className="animate-spin"
              size={defaultIconSize}
            />
            <span className="mx-1"></span>
            <HiOutlineCubeTransparent
              className="animate-spin"
              size={defaultIconSize}
            />
          </span>
        )}
        {!account._id && (
          <span style={{ fontSize: "0.6rem" }}>
            {" "}
            Lưu ý: Đăng nhập để bình chọn
          </span>
        )}
      </span>
    </>
  );
};

export default StarFilm;
