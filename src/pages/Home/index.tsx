import React from "react";
import Aside from "./Aside";
import Banner from "./Banner";

const Home = () => {
  return (
    <section className="container mx-auto">
      <main className="flex gap-x-8 bg-content py-4 px-2">
        <article className="wrapper-container basis-full lg:basis-2/3">
          <Banner />
        </article>
        <aside className="wrapper-aside basis-full lg:basis-1/3 bg-red-600">
          <Aside />
        </aside>
      </main>
    </section>
  );
};

export default Home;
