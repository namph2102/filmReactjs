import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import MainFilmContainer from "../../components/MainFilmContainer";
import { RootState } from "../../Redux/Store";
import { Ifilm } from "../../Redux/FilmSlice";
import imgaeLoading from "../../assets/loading.png";
const Banner = React.lazy(() => import("./Banner"));
const Home = () => {
  const filmSlice = useSelector((state: RootState) => state.film);
  const films: Ifilm[] = filmSlice.filmsHome || [];
  return (
    <>
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
