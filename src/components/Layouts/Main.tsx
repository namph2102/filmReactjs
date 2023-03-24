import React from "react";
import Routers from "../../routers/Routers";
import Aside from "../Aside";
import Footer from "../Footer";
import Header from "../Header";

const Main = () => {
  return (
    <>
      <Header />
      <section className="container mx-auto">
        <main className="flex flex-wrap bg-content py-4 px-2">
          <article className="wrapper-container basis-full lg:basis-2/3">
            <Routers />
          </article>
          <aside className="wrapper-aside basis-full lg:basis-1/3 relative">
            <Aside />
          </aside>
        </main>
      </section>

      <Footer />
    </>
  );
};
export default Main;
