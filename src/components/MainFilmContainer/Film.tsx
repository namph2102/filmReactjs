import React from "react";
import { Ifilm } from "../../Redux/FilmSlice";
type props = {
  film: Ifilm;
};
const Film: React.FC<props> = ({ film }) => {
  return (
    <article className="basis-1/3 sm:basis-1/3 md:basis-1/4">
      <div className="films-item p-1">
        <a href="" className="relative block">
          <figure className="overflow-hidden">
            <img
              src={film.thumb_url}
              alt={film.name}
              className="w-full film-avata"
            />
          </figure>
          <span className="episode">Tập {film.episode_current}</span>
          <span className="status">{film.quality}</span>

          <div className="icon_overlay"></div>
          <div className="films-des">
            <h6 className="text-primary film-name">
              {film.name} dsads sad sadsa
            </h6>
            <p className="text-second film-origin">{film.origin_name}</p>
          </div>
        </a>
      </div>
    </article>
  );
};

export default Film;
