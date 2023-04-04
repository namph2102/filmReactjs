import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../contants";
import { Ifilm } from "../../Redux/FilmSlice";
import ToastMessage from "../../untils/ToastMessage";
import bookmark from "../../assets/bookmark.png";
import bookmarked from "../../assets/bookmarked.png";
import { Tooltip } from "@mui/material";
import { componentsProps } from "../../untils";
import "./fiml.scss";
import {
  RiArrowDownSFill,
  RiArrowRightSFill,
  RiPlayCircleLine,
} from "react-icons/ri";
import { BiCalendar, BiTime, BiTimer } from "react-icons/bi";
const kindfilm: any = {
  series: "Phim bộ",
  feature: "Phim lẻ",
};
const FilmInfo = () => {
  let { slug } = useParams();
  const [film, setFilm] = useState<Ifilm>();
  console.log(film);
  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const responsive = await axios.post(PathLink.domain + "api/film", {
            method: "post",
            slug,
          });
          setFilm(responsive.data.film);
        } catch (err: any) {
          ToastMessage(err.response.data.message).info();
        }
      })();
    }
  }, [slug]);

  return (
    <>
      {film && (
        <section className="text-text film-detail">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 film_detail">
            <div className="fiml_info--thumb relative flex justify-center">
              <figure className="relative w-56 lg:w-full">
                <Link to={`/${PathLink.seeFilm + "/" + film.slug}`}>
                  <img
                    src={film.thumb_url}
                    className="rounded shadow-sm object-cover shadow-blue-800 w-full"
                    alt={film.name}
                  />
                </Link>
                <div className="btn_detail absolute left-0 bottom-0 flex justify-between lg:w-full w-56 px-1">
                  <button className="flex gap-0.5 py-1 px-2 rounded">
                    Tập Phim <RiArrowDownSFill size={defaultIconSize} />
                  </button>
                  <a href="http://">
                    <button className="flex gap-0.5 py-1 px-2 rounded">
                      <RiPlayCircleLine size={defaultIconSize} /> Xem Phim
                    </button>
                  </a>
                </div>
                <Tooltip
                  title="Thêm kho yêu thích"
                  className="cursor-pointer mr-3 absolute top-2 left-1 "
                  placement="right"
                  arrow
                  componentsProps={componentsProps}
                >
                  <img
                    src={bookmark}
                    width="40"
                    className="object-cover bookmark_effect"
                    alt=""
                  />
                </Tooltip>
              </figure>
            </div>
            <div className="view_info  col-span-2 px-2">
              <div className="view_info-item">
                <p className="view_info-title">Tên Phim:</p>{" "}
                <h1 className="capitalize text-primary text-xl font-bold">
                  {film.name}
                </h1>
              </div>
              <div className="view_info-item">
                <p className="view_info-title">Tên Khác:</p>{" "}
                <p className="capitalize text-gray-400">{film.origin_name}</p>
              </div>
              <div className="view_info-item">
                <p className="view_info-title"> Thể Loại:</p>
                <ul className="flex gap-2  flex-wrap">
                  <li>
                    <a href="http://">
                      <button className="bg-gray-600 p-3  text-xs font-light py-1.5 hover:text-primary hover:bg-gray-700 rounded-md">
                        Hành động
                      </button>
                    </a>
                  </li>
                  <li>
                    <a href="http://">
                      <button className="bg-gray-600 p-3  text-xs font-light py-1.5 hover:text-primary hover:bg-gray-700 rounded-md">
                        Hành động
                      </button>
                    </a>
                  </li>
                  <li>
                    <a href="http://">
                      <button className="bg-gray-600 p-3  text-xs font-light py-1.5 hover:text-primary hover:bg-gray-700 rounded-md">
                        Hành động
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="view_info-item">
                <p className="view_info-title">
                  {film.kind == "feature" ? "Trọn bộ" : "Tập mới nhất"}:
                </p>{" "}
                <h1 className="capitalize">
                  <a href="">
                    <button className="bg-blue-700 hover:bg-blue-600 py-2 rounded-xl px-2">
                      {film.kind == "series"
                        ? ` Tập ${film.episode_current}`
                        : ` Full ${film.lang}`}
                    </button>
                  </a>
                </h1>
              </div>
              <div className="view_info-item">
                <p className="view_info-title">Thông Tin Khác:</p>{" "}
                <p className="capitalize flex items-center font-thin text-gray-400">
                  <BiCalendar size={defaultIconSize} />
                  <span className="ml-0.5 mr-1"> {film.year}</span>
                  <BiTime
                    className="animate-spin ml-2"
                    size={defaultIconSize}
                  />{" "}
                  <span className="ml-0.5 mr-1"> {film.time}</span>
                </p>
              </div>
              <div className="view_info-item">
                <p className="view_info-title">Đánh Giá:</p>{" "}
                <h1 className="capitalize">{film.name}</h1>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FilmInfo;
