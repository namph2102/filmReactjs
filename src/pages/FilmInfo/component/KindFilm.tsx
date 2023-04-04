import React from "react";
import PathLink, { defaultIconSize } from "../../../contants";
import { Link } from "react-router-dom";
const KindFilm: React.FC<{ kindlists: string[] }> = ({ kindlists }) => {
  return (
    <ul className="flex gap-2  flex-wrap">
      {kindlists.map((kind, index) => (
        <li key={index}>
          <Link to={`${PathLink.seeCategories}`}>
            <button className="film_kinds-item capitalize">{kind}</button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default KindFilm;
