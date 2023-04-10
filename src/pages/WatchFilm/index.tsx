import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./video..scss";
import "./video..scss";
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
import { FacebookShareButton } from "react-share";
import { Ifilm } from "../../Redux/FilmSlice";
import StarFilm from "../FilmInfo/component/StarFilm";
import Bookmark from "../FilmInfo/component/Bookmark";
import ToastMessage from "../../untils/ToastMessage";
import EsopideList from "../FilmInfo/UI/EsopideList";
const WatchFilm = () => {
  const [film, setFilm] = useState<Ifilm>();
  const [currentEsopide, setCurrentEsopide] = useState<number>(0);
  const [currentLink, setCurrentLink] = useState<string>("");
  const [severWatch, setSeverWatch] = useState<string>("embedded");
  const [listEmbed, setListEmbeded] = useState([]);
  const [listM3u8, setListM3U8] = useState([]);
  const currentPage = "https://movibes.online/";
  let { slug } = useParams();
  let newslug: string | any = "",
    esopide: string = "";
  if (slug?.includes("-tap-")) {
    newslug = slug.split("-tap-")[0];
    esopide = slug.split("-tap-")[1];
  } else {
    newslug = slug;
  }
  useLayoutEffect(() => {
    if (newslug) {
      axios
        .post(PathLink.domain + "filmdetail", {
          method: "POST",
          slug: newslug,
        })
        .then((response) => {
          try {
            const {
              findFilm,
              filmdetail: { idFilm, listEsopideEmbeded, listEsopideStream },
            } = response.data;
            setListEmbeded(listEsopideEmbeded);
            setListM3U8(listEsopideStream);
            setFilm(findFilm);
            setCurrentEsopide(Number(esopide));
          } catch {
            ToastMessage("Sorry! , Lỗi hệ thống chưa cập nhập").info();
          }
        });
    }
  }, []);
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 100,
    });
    if (currentEsopide > 0) {
      if (severWatch == "embedded" && listEmbed.length > 0) {
        const filmDetail: { link: string; esopide: string } | any =
          listEmbed.find(
            (item: { esopide: string; link: string }) =>
              item.esopide.toLowerCase() == `tập ${currentEsopide}`
          );
        if (filmDetail.link) {
          setCurrentLink(filmDetail.link);
        }
      } else if (severWatch == "m3u8" && listM3u8.length > 0) {
      }
    }
  }, [currentEsopide]);
  const hanleChangeEsopide = (value: number) => {
    let calcEsopide = currentEsopide + value;
    if (calcEsopide <= 0) {
      calcEsopide = film?.episode_current || 1;
    } else if (film && calcEsopide > film?.episode_current) {
      calcEsopide = 1;
    }
    ToastMessage(
      `Bạn đang xem tập ${calcEsopide} phim ${film?.name}`
    ).success();
    setCurrentEsopide(calcEsopide);
  };
  return (
    <section>
      <div className="video_wrapper text-text">
        {severWatch == "embedded" && <VideoIfame link={currentLink} />}
        <div className="video_controller-esopide">
          <div className="flex gap-1 mt-4 justify-end flex-wrap">
            <button
              onClick={() => hanleChangeEsopide(-1)}
              className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md"
            >
              <BiChevronsLeft /> Tập trước
            </button>
            <button
              onClick={() => hanleChangeEsopide(1)}
              className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md"
            >
              Tập tiếp theo <BiChevronsRight />
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              <RiVirusFill /> Tắt đèn
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              <RiAlertFill /> Báo lỗi
            </button>
            <button className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md">
              {HandleView(film?.view || 0)}
            </button>
          </div>
        </div>
        <Helmet>
          <title>Xem Phim tại Video TV</title>
          <meta name="description" content={film?.description} />
          <meta property="og:url" content={currentPage} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`Xem Phim ${film?.name}`} />
          <meta property="og:description" content={film?.description} />
          <meta property="og:image" content={film?.poster_url} />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
        </Helmet>

        <div className="seoo_facebook flex gap-2 my-2 text-xs">
          <button className="flex gap-1 py-1 px-3 bg-blue-700  rounded-lg items-center">
            <BiLike fontStyle={defaultIconSize} /> Thích 199
          </button>

          <FacebookShareButton
            url={currentPage}
            quote={`Xem phim ${film?.name}`}
            hashtag={`#phim${film?.name}`}
          >
            <span className=" py-1 px-3 bg-blue-700  rounded-lg">Chia sẻ</span>
          </FacebookShareButton>
        </div>
        <p className="text-center text-gray-400 mt-4">
          Thông Báo, hiện tại 3 tuyến cáp quang biển của các nhà mạng bị lỗi,khi
          xem phim buổi tối sẽ bị nhà mạng bóp đường truyền Dấn Đến Lag…Nên hãy
          xem phim vào ban ngày
        </p>
      </div>
      <div className="flex flex-wrap bg-main justify-between items-center py-4 mx-4 my-4 rounded-sm">
        <div className=" flex">
          <div>
            {film && <Bookmark className="bookmark_static" film={film} />}
          </div>
          <div>
            <h1 className="text-2xl capitalize text-primary">
              {film?.name} Tập {currentEsopide} full {film?.lang}
            </h1>
            <p className="text-base text-gray-400">{film?.slug}</p>
          </div>
        </div>
        <div className="flex justify-end  flex-1 min-w-[260px] relative">
          {film && <StarFilm film={film} />}
        </div>
      </div>
      <div className="sever">
        <div>
          <span>Sever 1</span>
          {film && (
            <EsopideList
              currentEpisode={currentEsopide}
              setCurrentEsopide={setCurrentEsopide}
              film={film}
            />
          )}
        </div>
      </div>
      {film?.description && <FilmDescription film={film} />}
    </section>
  );
};

export default WatchFilm;
