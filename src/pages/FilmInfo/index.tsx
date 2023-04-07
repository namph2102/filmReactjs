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
const FilmLeft = React.lazy(() => import("./UI/FilmLeft"));
const FilmRight = React.lazy(() => import("./UI/FilmRight"));
const FilmDescription = React.lazy(() => import("./UI/FilmDescription"));
const EpisodeContainer = React.lazy(() => import("./UI/Episode"));

const FilmInfo = () => {
  const isShow = useSelector((state: RootState) => state.commemt.isComment);
  const dispatch: AppDispatch = useDispatch();
  let { slug } = useParams();
  const [film, setFilm] = useState<Ifilm | any>();
  if (film) {
    document.title = film.name.toUpperCase();
  }

  useEffect(() => {
    setFilm(() => {});
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
  }, [slug]);

  return (
    <>
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
