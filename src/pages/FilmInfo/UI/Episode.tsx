import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { Ifilm } from "../../../Redux/FilmSlice";
import {
  BiArrowToBottom,
  BiDownArrowCircle,
  BiSearchAlt,
} from "react-icons/bi";
import { Tooltip } from "@mui/material";
import { componentsProps } from "../../../untils";
const EpisodeContainer: React.FC<{ film: Ifilm }> = ({ film }) => {
  const [currentEpisode, setCurrentEsopide] = useState<number>(-1);
  const handleChoseEpisode = (e: HTMLInputElement | any) => {
    console.log(e.target.value);
  };

  console.log("re-render");

  return (
    <section className="my-4 px-2">
      <div className="flex gap-1 text-base ">
        <BiSearchAlt size={defaultIconSize} /> <span>TÌM TẬP NHANH</span>
        <BiDownArrowCircle size={defaultIconSize} />
      </div>
      <Tooltip
        title="Enter để tìm kiếm... "
        componentsProps={componentsProps}
        arrow
        placement="top"
      >
        <label className="relative block w-full lg:w-52 my-3">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-menu w-full rounded-md py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Tìm kiếm tập ... "
            type="text"
            name="search"
            onBlur={handleChoseEpisode}
          />
        </label>
      </Tooltip>
      <ul className="flex flex-wrap gap-1 mt-8">
        {film.episode_current &&
          new Array(film.episode_current).fill(0).map((episode, index) => (
            <li key={index}>
              <Link
                className={`text-center film_kinds-item w-20 text-sm block ${
                  currentEpisode == index && "current"
                }`}
                to={PathLink.seeFilm}
              >
                Tập {index + 1}
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default EpisodeContainer;
