import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./video.module.scss";
import clsx from "clsx";
import { BiChevronsLeft, BiChevronsRight, BiLike } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import { RiAlertFill, RiEyeFill, RiVirusFill } from "react-icons/ri";
import { HandleView } from "../../untils/HandleView";
import { Helmet } from "react-helmet-async";
import Film from "../../components/MainFilmContainer/Film";
import FilmDescription from "../FilmInfo/UI/FilmDescription";
import PathLink from "../../contants";
import VideoIfame from "../FilmInfo/UI/VideoIfame";
import axios from "axios";
const WatchFilm = () => {
  const slug = "sequi-nobis-qui-cum.";

  useEffect(() => {
    axios
      .post(PathLink.domain + "filmdetail", {
        method: "POST",
        slug,
      })
      .then((response) => {
        console.log(response.data);
      });
  }, []);
  return (
    <section>
      <div className="video_wrapper text-text">
        <VideoIfame />
        <div className="video_controller-esopide">
          <div className="flex gap-1 mt-4 justify-end flex-wrap">
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              <BiChevronsLeft /> Tập trước
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              Tập tiếp theo <BiChevronsRight />
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              <RiVirusFill /> Tắt đèn
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              <RiAlertFill /> Báo lỗi
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              {HandleView(5000)}
            </button>
          </div>
        </div>
        <Helmet>
          <title>Phim hay</title>
        </Helmet>

        <div className="seoo_facebook flex gap-2 my-2 text-xs">
          <button className="flex gap-1 py-1 px-3 bg-blue-700  rounded-lg items-center">
            <BiLike fontStyle={defaultIconSize} /> Thích 199
          </button>
          <button className=" py-1 px-3 bg-blue-700  rounded-lg">
            Chia sẻ
          </button>
        </div>
        <p className="text-center text-gray-400 mt-4">
          Thông Báo, hiện tại 3 tuyến cáp quang biển của các nhà mạng bị lỗi,khi
          xem phim buổi tối sẽ bị nhà mạng bóp đường truyền Dấn Đến Lag…Nên hãy
          xem phim vào ban ngày
        </p>
      </div>
      {/* <FilmDescription  /> */}
    </section>
  );
};

export default WatchFilm;
