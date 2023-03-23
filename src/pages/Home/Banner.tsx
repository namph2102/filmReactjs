import React, { useState, useEffect } from "react";
import "./banner.scss";
import {
  BiChevronRight,
  BiChevronLeft,
  BiRadioCircleMarked,
} from "react-icons/bi";
import { defaultIconSize } from "../../contants";
import { bannerSliders } from "../../contants";
import BannerItem from "./BannerItem";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const InCreaseIndex = () => {
    if (currentIndex >= bannerSliders.length - 1) {
      return setCurrentIndex(0);
    }
    setCurrentIndex(currentIndex + 1);
  };
  const DecreaseIndex = () => {
    if (currentIndex <= 0) {
      return setCurrentIndex(bannerSliders.length - 1);
    }
    setCurrentIndex(currentIndex - 1);
  };
  useEffect(() => {
    const idTimout = setTimeout(InCreaseIndex, 2000);
    return () => {
      clearTimeout(idTimout);
    };
  }, [currentIndex]);
  return (
    <>
      <section className="banner_list-item">
        {bannerSliders.map((slider, index) => {
          // slider % translateX (-100%) 0 100%
          const translateX = (currentIndex - index) * -100 + "%";
          return <BannerItem key={index} {...slider} translateX={translateX} />;
        })}

        <div className="banner_direction">
          <button className="btn_left" onClick={DecreaseIndex}>
            <BiChevronLeft size={defaultIconSize} />
          </button>

          <button className="btn_right" onClick={InCreaseIndex}>
            <BiChevronRight size={defaultIconSize} />
          </button>
          <ul className="slider_dots gap-2">
            {bannerSliders.map((_, index) => (
              <BiRadioCircleMarked
                onClick={() => setCurrentIndex(index)}
                fill={index == currentIndex ? "#ffc107" : "#009688"}
                cursor="pointer"
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Banner;
