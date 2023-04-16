import React, { useEffect, useState } from "react";
import { Ifilm } from "../../Redux/FilmSlice";
import Film from "../MainFilmContainer/Film";
import axios from "axios";
import PathLink, { defaultIconSize } from "../../contants";
import "./filmsame.scss";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const FilmSameContainer: React.FC<{
  category: string[];
  limit: number;
  id: string;
}> = ({ category, limit, id }) => {
  const [listFilm, setListFilm] = useState<Ifilm[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    setCurrentIndex(0);
    axios
      .post(PathLink.domain + "api/findlistfilmsame", {
        method: "post",
        data: {
          limit,
          category,
        },
      })
      .then((responsve) => {
        if (responsve.status == 200) {
          setListFilm(
            responsve.data.data.filter((item: Ifilm) => item._id !== id)
          );
        } else {
          setListFilm((pre) => []);
        }
      })
      .catch(() => {
        setListFilm((pre) => []);
      });
  }, [category]);
  const DecreaseIndex = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(listFilm.length - 3);
    } else setCurrentIndex(currentIndex - 1);
  };
  const InCreaseIndex = () => {
    if (currentIndex >= listFilm.length - 3) {
      setCurrentIndex(0);
    } else setCurrentIndex(currentIndex + 1);
  };
  return (
    <>
      {listFilm.length > 0 ? (
        <section className="main-contents">
          <h5 className="title_special">Phim liên quan</h5>
          <div className="flex flex-wrap my-4 film_sameSlider">
            {listFilm.map((film, index: number) => {
              const translateX = `${(index - currentIndex) * 100}%`;
              return (
                <Film key={film._id} translateX={translateX} film={film} />
              );
            })}
            {listFilm.length > 4 && (
              <button className="btn_left" onClick={DecreaseIndex}>
                <BiChevronLeft size={defaultIconSize} />
              </button>
            )}
            {listFilm.length > 4 && (
              <button className="btn_right" onClick={InCreaseIndex}>
                <BiChevronRight size={defaultIconSize} />
              </button>
            )}
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default FilmSameContainer;
