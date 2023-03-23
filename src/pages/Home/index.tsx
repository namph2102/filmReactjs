import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainFilmContainer from "../../components/MainFilmContainer";
import { AppDispatch, RootState } from "../../Redux/Store";
import { uploadFimls, Ifilm } from "../../Redux/FilmSlice";
import axios from "axios";
import Aside from "./Aside";
import Banner from "./Banner";
const Home = () => {
  const filmsStore = useSelector((state: RootState) => state.film);
  const films: Ifilm[] = filmsStore.fimls || [];
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const feacthData = async () => {
      return await axios.get("http://localhost:3000/api/v2");
    };
    feacthData()
      .then((res) => dispatch(uploadFimls({ fimls: res.data.data })))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <section className="container mx-auto">
      <main className="flex flex-wrap bg-content py-4 px-2">
        <article className="wrapper-container basis-full lg:basis-2/3">
          <Banner />
          <MainFilmContainer
            title="phim mới cập nhập"
            seemore
            listFilms={films}
          />
        </article>
        <aside className="wrapper-aside basis-full lg:basis-1/3 bg-red-600">
          <Aside />
        </aside>
      </main>
    </section>
  );
};

export default Home;
