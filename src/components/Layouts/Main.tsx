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
import Recharge from "../../pages/Recharge";
import PasswordChange from "../../pages/ChangePasswork";
import PageNotFound from "../../pages/PageNotFound";

const CommemtContainers = React.lazy(() => import("../BaseRealTime"));

const Main = () => {
  return (
    <>
      <Header />

      <section className="container mx-auto">
        <main className="flex flex-wrap bg-content py-4 px-2 min-h-[80vh]">
          <Routes>
            <Route path="*" element={<HaveAside />} />
            <Route path={PathLink.seeProfile} element={<Profile />} />
            <Route path={PathLink.recharge} element={<Recharge />} />
            <Route
              path={PathLink.changePassword}
              element={<PasswordChange />}
            />
            <Route path={PathLink.pagenotfound} element={<PageNotFound />} />
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
