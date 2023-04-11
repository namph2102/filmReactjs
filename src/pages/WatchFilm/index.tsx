import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./video..scss";

import axios from "axios";
import { Helmet } from "react-helmet-async";
import { BiChevronsLeft, BiChevronsRight, BiLike } from "react-icons/bi";
import {
  RiAlertFill,
  RiLightbulbFill,
  RiLightbulbFlashFill,
  RiStackFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { FacebookShareButton } from "react-share";
import { updateIdFim, updateStatusShowComment } from "../../Redux/CommentSlice";
import { Ifilm } from "../../Redux/FilmSlice";
import { AppDispatch } from "../../Redux/Store";
import PathLink, { defaultIconSize } from "../../contants";
import { HandleView } from "../../untils/HandleView";
import ToastMessage from "../../untils/ToastMessage";
import EsopideList from "../FilmInfo/UI/EsopideList";
import FilmDescription from "../FilmInfo/UI/FilmDescription";
import VideoIfame from "../FilmInfo/UI/VideoIfame";
import VideoTag from "../FilmInfo/UI/VideoTag";
import Bookmark from "../FilmInfo/component/Bookmark";
import StarFilm from "../FilmInfo/component/StarFilm";

const WatchFilm = () => {
  const [film, setFilm] = useState<Ifilm>();
  const dispatch: AppDispatch = useDispatch();
  const [currentEsopide, setCurrentEsopide] = useState<number>(0);
  const [currentLink, setCurrentLink] = useState<string>("");
  const [severWatch, setSeverWatch] = useState<string>("m3u8");
  const [listEmbed, setListEmbeded] = useState([]);
  const [listM3u8, setListM3U8] = useState([]);
  const [isOpenLight, setIsOpenLight] = useState<Boolean>(true);
  const currentPage = "https://movibes.online/";
  const nextElment = useRef<HTMLButtonElement | any>(null);
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
      let filmDetail: { link: string; esopide: string } | any;
      if (severWatch == "embedded" && listEmbed.length > 0) {
        filmDetail = listEmbed.find(
          (item: { esopide: string; link: string }) =>
            item.esopide.toLowerCase() == `tập ${currentEsopide}`
        );
      } else if (severWatch == "m3u8" && listM3u8.length > 0) {
        filmDetail = listM3u8.find(
          (item: { esopide: string; link: string }) =>
            item.esopide.toLowerCase() == `tập ${currentEsopide}`
        );
      }

      if (filmDetail.link) {
        setCurrentLink(filmDetail.link);
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
    setCurrentEsopide(calcEsopide);

    if (window.location.href.includes("-tap-")) {
      const url = window.location.href;
      const newurl = url.slice(url.lastIndexOf("-tap-"), url.length);
      history.replaceState("", "", url.replace(newurl, "-tap-" + calcEsopide));
    }
  };
  useEffect(() => {
    dispatch(updateIdFim({ idFilm: film?._id }));
    return () => {
      dispatch(updateStatusShowComment({ isShow: false }));
    };
  }, [film]);
  return (
    <section className="relative">
      {!isOpenLight && <div className="ovelay-switch_light"></div>}
      <div className="video_wrapper text-text">
        {severWatch == "embedded" && <VideoIfame link={currentLink} />}
        {severWatch == "m3u8" && film && (
          <VideoTag
            film={film}
            link={currentLink}
            onChangeEsopide={hanleChangeEsopide}
          />
        )}
        <div className="video_controller-esopide z-30 absolute right-0">
          <div className="flex gap-1 mt-4 justify-end flex-wrap ">
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
            <button
              onClick={() => setIsOpenLight(!isOpenLight)}
              className="flex gap-0.5 bg-btn hover:bg-gray-900 items-center py-1 px-2 rounded-md"
            >
              {isOpenLight ? <RiLightbulbFlashFill /> : <RiLightbulbFill />}
              {isOpenLight ? "Tắt đèn" : "Bật đèn"}
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

        <div className="seoo_facebook flex gap-2 mt-14 text-xs px-4">
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
        <p className="text-center text-gray-400 mt-4 px-4">
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
        <div className="sever_embedded">
          <span className="bg-menu inline-flex items-center rounded-t-xl font-bold text-primary py-2 px-4">
            <RiStackFill size="1rem" />
            <span className="text-base ml-1"> VIP</span>
          </span>
          <div className="bg-menu p-4">
            {film && listEmbed.length > 0 && (
              <EsopideList
                currentEpisode={severWatch == "embedded" ? currentEsopide : 0}
                setCurrentEsopide={setCurrentEsopide}
                setSeverWatch={setSeverWatch}
                nameSever="embedded"
                film={film}
              />
            )}
          </div>
        </div>

        <div className="sever_m3u8">
          <span className="bg-menu inline-flex items-center rounded-t-xl font-bold text-primary py-2 px-4">
            <RiStackFill size="1rem" />
            <span className="text-base ml-1"> HLS</span>
          </span>
          <div className="bg-menu p-4">
            {film && listM3u8.length > 0 && (
              <EsopideList
                currentEpisode={severWatch == "m3u8" ? currentEsopide : 0}
                setCurrentEsopide={setCurrentEsopide}
                setSeverWatch={setSeverWatch}
                nameSever="m3u8"
                film={film}
              />
            )}
          </div>
        </div>
      </div>
      {film?.description && <FilmDescription film={film} />}
    </section>
  );
};

export default WatchFilm;
