import axios from "axios";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import PathLink from "../../contants";
import { Ifilm } from "../../Redux/FilmSlice";
import ToastMessage from "../../untils/ToastMessage";
import "./fiml.scss";
import RotateLoadding from "../../components/Loadding/RotateLoadding";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { updateStatusShowComment } from "../../Redux/CommentSlice";
import { Helmet } from "react-helmet-async";
const FilmLeft = React.lazy(() => import("./UI/FilmLeft"));
const FilmRight = React.lazy(() => import("./UI/FilmRight"));
const FilmDescription = React.lazy(() => import("./UI/FilmDescription"));
const EpisodeContainer: any = React.lazy(() => import("./UI/Episode"));

const FilmInfo = () => {
  const isShow = useSelector((state: RootState) => state.commemt.isComment);
  const dispatch: AppDispatch = useDispatch();
  document.title = "Phim hay tuyển chọn";
  let { slug } = useParams();
  const [film, setFilm] = useState<Ifilm>();
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
          ToastMessage("Lỗi gì đó").info();
        }
      })();
    }

    if (isShow) {
      dispatch(updateStatusShowComment({ isShow: false }));
    }
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [slug]);

  return (
    <>
      {film && (
        <Helmet>
          <title> {film.name} Tại VideoTV</title>
          <meta name="description" content={film.description} />
          <meta name="keywords" content={film.name} />
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={film.name} />
          <meta property="og:description" content={film.description} />
          <meta property="og:image" content={film.poster_url} />
        </Helmet>
      )}
      {film && (
        <section className="text-text film-detail">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 film_detail">
            <Suspense fallback={<RotateLoadding message="Chờ xíu nhé..." />}>
              <FilmLeft film={film} />
              <FilmRight film={film} />
            </Suspense>
          </div>
          <Suspense fallback={<RotateLoadding message="Chờ xíu nhé..." />}>
            {film.kind == "series" && <EpisodeContainer film={film} />}
            <FilmDescription film={film} />
          </Suspense>
        </section>
      )}
    </>
  );
};

export default FilmInfo;
