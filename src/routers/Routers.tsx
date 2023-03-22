import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Country from "../pages/Country";

const Routers = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<Product />} />
      <Route path="country" element={<Country />} />
      <Route path="country/:slug" element={<Country />} />
    </Routes>
  );
};
export default Routers;
