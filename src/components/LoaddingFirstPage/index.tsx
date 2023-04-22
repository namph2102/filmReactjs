import React from "react";
import "./loadding.scss";
import Logo from "../../assets/logo.png";
const LoaddingFirstPage = () => {
  return (
    <section className="wapper_Loadding flex">
      <figure className="wapper_Loadding-container sm:w-[60%] lg:w-[50%] w-[90%] m-auto">
        <img className="w-full wapper_Loadding-animate" src={Logo} alt="" />
      </figure>
    </section>
  );
};

export default LoaddingFirstPage;
