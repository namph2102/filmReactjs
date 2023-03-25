import React, { useState, useEffect } from "react";
import styles from "./Loadding.module.scss";
const lenLoading: number = 10;
const listsss = new Array<number>(lenLoading);
listsss.fill(0);
type Tloading = {
  height?: string;
};
const LoaddingFiml: React.FC<Tloading> = ({ height }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      if (currentIndex < lenLoading) setCurrentIndex(currentIndex + 1);
      else setCurrentIndex(0);
    }, 200);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [currentIndex]);
  return (
    <ul
      className={`${!height ? "min-h-screen" : `${height}`} ${styles.wrapper}`}
    >
      {listsss.map((_, index) => (
        <li
          key={index}
          className={`${index >= currentIndex ? "bg-white" : "bg-primary"}`}
        ></li>
      ))}
    </ul>
  );
};

export default LoaddingFiml;
