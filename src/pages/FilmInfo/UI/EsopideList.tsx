import React, { useState } from "react";
import { Ifilm, updateView } from "../../../Redux/FilmSlice";
import PathLink from "../../../contants";
import { Link } from "react-router-dom";
interface Iesopide {
  esopide: string;
  link: string;
}
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
  return (
    <ul className="flex flex-wrap items-start gap-1 text-yellow-50 listfilm_esopide max-h-[200px] overflow-auto">
      {new Array(film.episode_current).fill(0).map((_, index) => (
        <li
          key={index}
          onClick={() => {
            setCurrentEsopide &&
              setCurrentEsopide(film.episode_current - index);
            updateView(film._id);

            setSeverWatch && nameSever && setSeverWatch(nameSever);
          }}
        >
          <Link
            className={`text-center film_kinds-item w-20 text-sm block ${
              currentEpisode == film.episode_current - index &&
              "bg-yellow-600 text-white"
            }`}
            to={`${
              film.kind == "series"
                ? `${PathLink.seeFilm + film.slug}-tap-${
                    film.episode_current - index
                  }`
                : `${PathLink.seeFilm + film.slug}-full`
            }`}
          >
            {film.kind == "series"
              ? `Tập ${film.episode_current - index}`
              : "FULL"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EsopideList;
