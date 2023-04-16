import axios from "axios";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import PathLink from "../../contants";
import { Ifilm, updateView } from "../../Redux/FilmSlice";
import ToastMessage from "../../untils/ToastMessage";
import "./fiml.scss";
import RotateLoadding from "../../components/Loadding/RotateLoadding";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { Helmet } from "react-helmet-async";
const FilmLeft = React.lazy(() => import("./UI/FilmLeft"));
const FilmRight = React.lazy(() => import("./UI/FilmRight"));
const FilmDescription = React.lazy(() => import("./UI/FilmDescription"));
const EpisodeContainer: any = React.lazy(() => import("./UI/EpisodeContainer"));
import { updateIdFim, updateStatusShowComment } from "../../Redux/CommentSlice";
import FilmSameContainer from "../../components/FilmSame";
const FilmInfo = () => {
  const isShow = useSelector((state: RootState) => state.commemt.isComment);
  const dispatch: AppDispatch = useDispatch();
  let { slug } = useParams();
  const [film, setFilm] = useState<Ifilm>();
  useEffect(() => {
    if (slug) {
      (async () => {
        console.log("change", slug);
        try {
          const responsive = await axios.post(PathLink.domain + "api/film", {
            method: "post",
            slug,
          });
          console.log(responsive.data);
          setFilm(responsive.data.film);
        } catch (err: any) {
          ToastMessage("Lỗi gì đó").info();
        }
      })();
    }

    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, [slug]);

  useEffect(() => {
    dispatch(updateIdFim({ idFilm: film?._id }));

    return () => {
      dispatch(updateStatusShowComment({ isShow: false }));
    };
  }, [film]);

  return (
    <>
      {film && (
        <Helmet>
          <title>Xem phim {film.name} Tại VideoTV</title>
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
          <FilmSameContainer
            id={film._id}
            category={film.category}
            limit={10}
          />
        </section>
      )}
    </>
  );
};

export default FilmInfo;
