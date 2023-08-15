import React, { useState, Suspense } from "react";
import { IApiFilm } from "../../Redux/ApiSlice";
import { useEffect } from "react";
const FimlsBoxAside = React.lazy(() => import("./FimlsBoxAside"));

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
      <Suspense fallback={<LoaddingFiml />}>
        <FimlsBoxAside title="Phim lẻ xem nhiều" listFilm={feature} />
        <FimlsBoxAside title="Phim bộ xem nhiều" listFilm={series} />
      </Suspense>
    </>
  );
};
const Aside = () => {
  const [films, setFilms] = useState<TProps>({ feature: [], series: [] });
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(PathLink.domain + "api/v3/kinds");
        if (res.status == 200) {
          setFilms(res.data.data);
        }
      } catch (err: any) {
        console.log(err.message);
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
