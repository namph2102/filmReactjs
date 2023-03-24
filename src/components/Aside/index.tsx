import { useState } from "react";
import { IApiFilm } from "../../Redux/ApiSlice";
import { useEffect } from "react";
import FimlsBoxAside from "./FimlsBoxAside";
import PathLink from "../../contants";
import LoaddingFiml from "../Loadding";
import axios from "axios";
type TProps = {
  feature: IApiFilm[];
  series: IApiFilm[];
};
const RenderFimlsBoxAside: React.FC<TProps> = ({
  feature,
  series,
}): JSX.Element => {
  return (
    <>
      <FimlsBoxAside title="Phim lẻ xem nhiều" listFilm={feature} />
      <FimlsBoxAside title="Phim bộ xem nhiều" listFilm={series} />
    </>
  );
};
const Aside = () => {
  const [films, setFilms] = useState<TProps>({ feature: [], series: [] });
  useEffect(() => {
    (async function () {
      const res = await axios.get(PathLink.domain + "api/v3/kinds");
      if (res.status == 200) {
        setFilms(res.data.data);
      }
    })();
  }, []);
  return (
    <>
      {films.feature?.length > 0 ? (
        <RenderFimlsBoxAside feature={films.feature} series={films.series} />
      ) : (
        <LoaddingFiml />
      )}
    </>
  );
};

export default Aside;
