import React, { Suspense } from "react";
import Routers from "../../routers/Routers";
import Aside from "../Aside";
import PathLink from "../../contants";
import Header from "../Header";
const Footer = React.lazy(() => {
  return new Promise((resolve: any) => {
    const idTimeout = setTimeout(() => {
      clearTimeout(idTimeout);
      return resolve(import("../Footer"));
    }, 4000);
  });
});

import RotateLoadding from "../Loadding/RotateLoadding";

import HaveAside from "./HaveAside";
import { Route, Routes } from "react-router-dom";
import Profile from "../../pages/profile";

const CommemtContainers = React.lazy(() => import("../BaseRealTime"));

const Main = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto">
        <main className="flex flex-wrap bg-content py-4 px-2 min-h-[80vh]">
          <Routes>
            <Route path="*" element={<HaveAside />} />
            <Route path="tai-khoan" element={<Profile />} />
          </Routes>
        </main>
      </section>

      <div className="container mx-auto relative">
        <Suspense fallback={<RotateLoadding />}>
          <CommemtContainers />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};
export default Main;
