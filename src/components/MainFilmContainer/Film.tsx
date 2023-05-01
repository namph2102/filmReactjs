import React from "react";
import { Link } from "react-router-dom";
import { Ifilm } from "../../Redux/FilmSlice";

type props = {
  film: Ifilm;
  translateX?: string;
};
import PathLink from "../../contants";
import HandleHookKind from "../../untils/HandleHookKind";
const Film: React.FC<props> = ({ film, translateX }) => {
  return (
    <article
      style={translateX ? { transform: `translateX(${translateX})` } : {}}
      className="film-item basis-1/3 flex-shrink-0 flex-grow-1  sm:basis-1/3 md:basis-1/4  min-h-[200px] "
    >
      <div className="films-item p-1">
        <Link
          to={`/${PathLink.seeFilmDetail}/${film.slug}`}
          className="relative block"
        >
          <figure className="overflow-hidden">
            <img
              src={film.thumb_url}
              alt={film.name}
              className="w-full film-avata"
              loading="lazy"
              onLoad={(e) => (e.target.src = film.thumb_url)}
            />
          </figure>
          <span className="episode">
            {HandleHookKind(
              film.kind,
              film.eposode_total,
              film.episode_current,
              film.trailer
            )}
          </span>
          <span className="status">{film.lang}</span>

          <div className="icon_overlay"></div>
          <div className="films-des">
            <h6 className="text-primary film-name">{film.name}</h6>
            <p className="text-second film-origin">{film.origin_name}</p>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default Film;
