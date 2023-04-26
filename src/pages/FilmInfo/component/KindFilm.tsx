import React from "react";
import PathLink, { defaultIconSize } from "../../../contants";
import { Link } from "react-router-dom";
import { ICategory } from "../../../Redux/FilmSlice";
const KindFilm: React.FC<{ kindlists: ICategory[] }> = ({ kindlists }) => {
  return (
    <ul className="flex gap-2  flex-wrap">
      {kindlists.map((kind, index) => (
        <li key={kind._id}>
          <Link to={`/the-loai/${kind.slug}`}>
            <button className="film_kinds-item capitalize">
              {kind.category}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default KindFilm;
