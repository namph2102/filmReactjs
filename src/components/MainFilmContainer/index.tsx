import React, { memo, Suspense } from "react";
import RotateLoadding from "../Loadding/RotateLoadding";
const Film = React.lazy(() => import("./Film"));
import "./mainfilm.scss";
import { Ifilm } from "../../Redux/FilmSlice";
import { Link } from "react-router-dom";
interface IMain {
  title?: string;
  listFilms: Ifilm[];
  seemore?: boolean;
  maxlength?: number;
}
const MainFilmContainer: React.FC<IMain> = ({
  title,
  listFilms,
  seemore,
  maxlength,
}) => {
  if (maxlength && listFilms.length > maxlength) listFilms.length = maxlength;
  return (
    <section className="main-contents">
      {title && <h5 className="title_special">{title}</h5>}
      <div className="films-container min-h-[400px]: flex flex-wrap  my-4 flex-shrink-1 flex-grow-0">
        {listFilms.map((film: Ifilm) => (
          <Suspense key={film._id} fallback={<RotateLoadding />}>
            <Film key={film._id} film={film} />
          </Suspense>
        ))}
      </div>
      {seemore && (
        <Link to="/xem-tat-ca" className="see-more">
          xem tất cả
        </Link>
      )}
    </section>
  );
};

export default memo(MainFilmContainer);
