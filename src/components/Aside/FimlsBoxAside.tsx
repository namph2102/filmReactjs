import React from "react";
import { IApiFilm } from "../../Redux/ApiSlice";
import ItemAside from "./ItemAside";

type Tprops = {
  title?: string;
  listFilm: IApiFilm[];
};
const FimlsBoxAside: React.FC<Tprops> = ({ title, listFilm }) => {
  return (
    <section className="px-5">
      {title && (
        <div className="title_special-box mb-4">
          <h5 className="title_special inline-block">{title}</h5>
        </div>
      )}
      {listFilm.length > 0 &&
        listFilm.map((film: IApiFilm) => (
          <ItemAside key={film.id} items={film} />
        ))}
    </section>
  );
};

export default FimlsBoxAside;
