import { useSelector } from "react-redux";
import MainFilmContainer from "../../components/MainFilmContainer";
import { RootState } from "../../Redux/Store";
import { Ifilm } from "../../Redux/FilmSlice";
import imgaeLoading from "../../assets/loading.png";
import Banner from "./Banner";
const Home = () => {
  const filmSlice = useSelector((state: RootState) => state.film);
  const films: Ifilm[] = filmSlice.fimls || [];

  return (
    <>
      <Banner />
      {filmSlice.isLoading && (
        <div className="wrapper-loading my-5">
          <img
            src={imgaeLoading}
            className="animate-spin inline-block"
            width="80"
            height="80"
            alt=""
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
