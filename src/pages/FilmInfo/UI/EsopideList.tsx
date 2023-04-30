import React, { useState } from "react";
import { Ifilm, updateView } from "../../../Redux/FilmSlice";
import PathLink from "../../../contants";
import { Link } from "react-router-dom";
const EsopideList: React.FC<{
  currentEpisode?: any;
  setCurrentEsopide?: (esopide: number) => void;
  setSeverWatch?: (sever: string) => void;
  nameSever?: string;

  film: Ifilm;
}> = ({
  currentEpisode = "",
  film,
  setCurrentEsopide,
  setSeverWatch,
  nameSever,
}) => {
  console.log(film);
  return (
    <ul className="flex flex-wrap gap-1 text-yellow-50">
      {new Array(film.episode_current).fill(0).map((_, index) => (
        <li
          key={index}
          onClick={() => {
            setCurrentEsopide && setCurrentEsopide(index + 1);
            updateView(film._id);

            setSeverWatch && nameSever && setSeverWatch(nameSever);
          }}
        >
          <Link
            className={`text-center film_kinds-item w-20 text-sm block ${
              currentEpisode == index + 1 && "bg-yellow-600 text-white"
            }`}
            to={`${
              film.kind == "series"
                ? `${PathLink.seeFilm + film.slug}-tap-${index + 1}`
                : `${PathLink.seeFilm + film.slug}-full`
            }`}
          >
            {film.kind == "series" ? `Tập ${index + 1}` : "FULL"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EsopideList;
