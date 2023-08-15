import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainFilmContainer from "../../components/MainFilmContainer";
import { AppDispatch, RootState } from "../../Redux/Store";
import { Ifilm } from "../../Redux/FilmSlice";
import imgaeLoading from "../../assets/loading.png";
import { Helmet } from "react-helmet-async";
import seoPage from "../../untils/seo";
import { updateIdFim, updateStatusShowComment } from "../../Redux/CommentSlice";
const Banner = React.lazy(() => import("./Banner"));

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [filmSlice] = useSelector((state: RootState | any) => [
    state.film,
    state.commemt,
  ]);
  useEffect(() => {
    dispatch(updateIdFim({ idFilm: "0" }));
    return () => {
      dispatch(updateStatusShowComment({ isShow: false }));
    };
  }, []);
  const films: Ifilm[] = filmSlice.filmsHome || [];
  return (
    <>
      <Helmet>
        <title>{seoPage.titleHome}</title>
        <meta name="description" content={seoPage.desHome} />
        <meta property="og:image" content={seoPage.posterHome} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoPage.titleHome} />
        <meta property="og:description" content={seoPage.desHome} />
      </Helmet>
      <Suspense
        fallback={
          <p className="wrapper-container basis-full h-96 bg-main border-zinc-100 lg:basis-2/3 lg:pt-4 "></p>
        }
      >
        <Banner />
      </Suspense>
      {filmSlice.isLoading && (
        <div className="wrapper-loading my-5">
          <img
            src={imgaeLoading}
            className="animate-spin inline-block"
            width="80"
            height="80"
          />
          <span className="text-lg text-primary font-medium ml-4">
            Loading ....{" "}
          </span>
        </div>
      )}
      {!filmSlice.isLoading && (
        <MainFilmContainer
          title="phim mới cập nhập"
          seemore
          listFilms={films}
        />
      )}
    </>
  );
};

export default Home;
