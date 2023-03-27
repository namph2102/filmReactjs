import React, { Suspense } from "react";
import Routers from "../../routers/Routers";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";

import RotateLoadding from "../Loadding/RotateLoadding";
const CommemtContainers = React.lazy(() => import("../BaseRealTime"));

const Main = () => {
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
          <CommemtContainers idFilm={0} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
};
export default Main;
