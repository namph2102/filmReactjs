import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathLink, { defaultIconSize } from "../../../contants";
import { Ifilm } from "../../../Redux/FilmSlice";
import { BiDownArrowCircle, BiSearchAlt } from "react-icons/bi";
import SearchFilm from "../component/SearchFilm";
import EsopideList from "./EsopideList";

const EpisodeContainer: React.FC<{
  film: Ifilm;
}> = ({ film }) => {
  return (
    <section className="p-4 pp-2">
      <div className="flex gap-1 text-base">
        <BiSearchAlt size={defaultIconSize} /> <span>TÌM TẬP NHANH</span>
        <BiDownArrowCircle size={defaultIconSize} />
      </div>

      <SearchFilm slug={film.slug} totalEsopide={film.episode_current} />

      <div className="mt-6">
        <EsopideList film={film} />
      </div>
    </section>
  );
};

export default EpisodeContainer;
