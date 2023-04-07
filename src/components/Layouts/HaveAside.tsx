import React from "react";
import Routers from "../../routers/Routers";
import Aside from "../Aside";

const HaveAside = () => {
  return (
    <>
      <article className="wrapper-container basis-full lg:basis-2/3 lg:pt-4">
        <Routers />
      </article>
      <aside className="wrapper-aside basis-full lg:basis-1/3 relative">
        <Aside />
      </aside>
    </>
  );
};

export default HaveAside;
