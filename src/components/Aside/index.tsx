import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Ifilm } from "../../Redux/FilmSlice";

import FimlsBoxAside from "./FimlsBoxAside";
import LoaddingFiml from "../Loadding";
const RenderFimlsBoxAside: React.FC<{ films: Ifilm[] }> = ({
  films,
}): JSX.Element => {
  return (
    <>
      <FimlsBoxAside title="Phim lẻ xem nhiều" listFilm={films} kind="phimle" />
      <FimlsBoxAside title="Phim bộ xem nhiều" listFilm={films} kind="phimbo" />
    </>
  );
};
const Aside = () => {
  const filmSlice: any = useSelector<RootState>((state) => state.film);
  const films: Ifilm[] = filmSlice.fimls || [];
  return (
    <>
      {films.length > 0 ? (
        <RenderFimlsBoxAside films={films} />
      ) : (
        <LoaddingFiml />
      )}
    </>
  );
};

export default Aside;
