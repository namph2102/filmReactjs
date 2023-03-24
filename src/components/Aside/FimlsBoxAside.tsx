import React from "react";
import { Ifilm } from "../../Redux/FilmSlice";
import ItemAside from "./ItemAside";

type Tprops = {
  title?: string;
  kind?: string;
  listFilm: Ifilm[];
};
const FimlsBoxAside: React.FC<Tprops> = ({ title, listFilm, kind }) => {
  return (
    <section className="px-5">
      {title && (
        <div className="title_special-box mb-4">
          <h5 className="title_special inline-block">{title}</h5>
        </div>
      )}
      {listFilm.length > 0 &&
        listFilm
          .filter((fiml: Ifilm) => fiml.kind == kind)
          .map((film: Ifilm, index) => (
            <ItemAside key={film.id} items={film} />
          ))}
    </section>
  );
};

export default FimlsBoxAside;
