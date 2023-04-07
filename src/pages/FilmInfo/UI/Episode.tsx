import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { Ifilm } from "../../../Redux/FilmSlice";
import {
  BiArrowToBottom,
  BiDownArrowCircle,
  BiSearchAlt,
} from "react-icons/bi";
import SearchFilm from "../component/SearchFilm";

const EpisodeContainer: React.FC<{
  film: Ifilm;
}> = ({ film }) => {
  const [currentEpisode, setCurrentEsopide] = useState<number>(
    film.kind == "series" ? film.episode_current : 0
  );

  return (
    <section className="p-4 pp-2">
      <div className="flex gap-1 text-base ">
        <BiSearchAlt size={defaultIconSize} /> <span>TÌM TẬP NHANH</span>
        <BiDownArrowCircle size={defaultIconSize} />
      </div>

      <SearchFilm slug={film.slug} totalEsopide={film.episode_current} />

      <ul className="flex flex-wrap gap-1 mt-8">
        {currentEpisode > 1 &&
          film.episode_current &&
          new Array(currentEpisode).fill(0).map((_, index) => (
            <li key={index}>
              <Link
                className={`text-center film_kinds-item w-20 text-sm block ${
                  currentEpisode == index && "current"
                }`}
                to={PathLink.seeFilm + film.slug}
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
