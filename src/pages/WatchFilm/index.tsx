import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./video.module.scss";
import clsx from "clsx";
import SeoFacebook from "./seoFacebook";
import { BiChevronsLeft, BiChevronsRight, BiLike } from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import { RiAlertFill, RiEyeFill, RiVirusFill } from "react-icons/ri";
import { HandleView } from "../../untils/HandleView";
const WatchFilm = () => {
  const slug = "sequi-nobis-qui-cum.";
  const video_wrapper = useRef<HTMLElement | any>(null);
  const [videoWitdh, setVideoWitdh] = useState<number>(350);
  useEffect(() => {
    setVideoWitdh(video_wrapper.current.getBoundingClientRect().width);
  }, []);
  return (
    <section>
      <div ref={video_wrapper} className="video_wrapper text-text">
        <div>
          <iframe
            width={videoWitdh + "px"}
            height={videoWitdh / 1.75 + "px"}
            allowFullScreen
            src="https://1080.hdphimonline.com/share/cbbda0778454f639ae7182a4ec209142"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
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
        <div className="seoo_facebook flex gap-2 my-2 text-xs">
          <button className="flex gap-1 py-1 px-2 bg-blue-700  rounded-lg items-center">
            <BiLike fontStyle={defaultIconSize} /> Thích 199
          </button>
          <button className=" py-1 px-2 bg-blue-700  rounded-lg">
            Chia sẻ
          </button>
        </div>
        <p className="text-center text-gray-400 mt-3">
          Thông Báo, hiện tại 3 tuyến cáp quang biển của các nhà mạng bị lỗi,khi
          xem phim buổi tối sẽ bị nhà mạng bóp đường truyền Dấn Đến Lag…Nên hãy
          xem phim vào ban ngày
        </p>
      </div>
    </section>
  );
};

export default WatchFilm;
