import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Country from "../pages/Country";
import PathLink from "../contants";
import FilmInfo from "../pages/FilmInfo";
const Routers = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<Product />} />
      <Route path="country" element={<Country />} />
      <Route path="country/:slug" element={<Country />} />
      <Route
        path={`${PathLink.seeFilmDetail}/:slug`}
        element={<FilmInfo />}
      ></Route>
    </Routes>
  );
};
export default Routers;
