import React from "react";
import { Ifilm } from "../../Redux/FilmSlice";
import { Link } from "react-router-dom";
interface IProps {
  listFilm: Ifilm[];
}
import PathLink from "../../contants";
export const ResultSearch: React.FC<IProps> = ({ listFilm }) => {
  return (
    <>
      <ul className="search_result-list">
        {listFilm.length > 0 &&
          listFilm.map((film) => (
            <li key={film._id}>
              <Link
                to={`${PathLink.seeFilmDetail}/${film.slug}`}
                className="flex items-center p-3 hover:bg-hover"
              >
                <img
                  src={film.thumb_url}
                  width="50"
                  height="80"
                  className="object-cover"
                  alt={film.name}
                />
                <div className="mx-3">
                  <h6 className="text-text font-medium capitalize">
                    {film.name}
                  </h6>
                  <p className="text-second font-normal text-xs capitalize">
                    {film.origin_name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};
