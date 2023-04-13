import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Country from "../pages/Country";
import PathLink from "../contants";
import FilmInfo from "../pages/FilmInfo";
import WatchFilm from "../pages/WatchFilm";
const Routers = () => {
  return (
    <Routes>
      <Route path={PathLink.home} element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path={PathLink.contry + ":slug"} element={<Country />} />
      <Route path={`${PathLink.seeFilm}:slug`} element={<WatchFilm />} />
      <Route
        path={`${PathLink.seeFilm}:slug-tap-:esopide`}
        element={<WatchFilm />}
      />

      <Route
        path={`${PathLink.seeFilmDetail}/:slug`}
        element={<FilmInfo />}
      ></Route>
      <Route path="/*" element={<Product />} />
    </Routes>
  );
};
export default Routers;
