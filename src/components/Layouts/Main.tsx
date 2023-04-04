import React, { Suspense } from "react";
import Routers from "../../routers/Routers";
import Aside from "../Aside";

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
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
const CommemtContainers = React.lazy(() => import("../BaseRealTime"));

const Main = () => {
  const isCommemt = useSelector((state: RootState) => state.commemt.isComment);
  return (
    <>
      <Header />
      <section className="container mx-auto">
        <main className="flex flex-wrap bg-content py-4 px-2">
          <article className="wrapper-container basis-full lg:basis-2/3 lg:pt-4">
            <Routers />
          </article>
          <aside className="wrapper-aside basis-full lg:basis-1/3 relative">
            <Aside />
          </aside>
        </main>
      </section>
      <div className="container mx-auto relative">
        <Suspense fallback={<RotateLoadding />}>
          {isCommemt && <CommemtContainers />}
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
};
export default Main;
