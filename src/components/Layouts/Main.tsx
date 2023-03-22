import React from "react";
import Routers from "../../routers/Routers";
import Footer from "../Footer";
import Header from "../Header";

export const Main = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};
