import React, { useState, useEffect } from "react";
import styles from "./Loadding.module.scss";
const lenLoading: number = 10;
const listsss = new Array<number>(lenLoading);
import imgaeLoading from "../../assets/loading.png";
listsss.fill(0);
type Tloading = {
  height?: string;
};
const LoaddingFiml: React.FC<Tloading> = ({ height }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  useEffect(() => {
    const idTimeout = setInterval(() => {
      if (currentIndex < lenLoading) setCurrentIndex(currentIndex + 1);
      else setCurrentIndex(0);
    }, 200);
    return () => {
      clearInterval(idTimeout);
    };
  }, []);
  return (
    <ul
      className={`${!height ? "min-h-screen" : `${height}`} ${styles.wrapper}`}
    >
      <div className="wrapper-loading my-5  mx-auto w-full">
        <img
          src={imgaeLoading}
          className="animate-spin inline-block"
          width="40"
          height="40"
        />
        <span className="text-lg text-primary font-medium ml-4">
          Chờ tí xíu ....{" "}
        </span>
      </div>
    </ul>
  );
};

export default LoaddingFiml;
