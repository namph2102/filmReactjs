import { memo } from "react";
import Film from "./Film";
import "./mainfilm.scss";
import { Ifilm } from "../../Redux/FilmSlice";
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
      <div className="films-containe flex flex-wrap  my-4">
        {listFilms.map((film: Ifilm) => (
          <Film key={film.id} film={film} />
        ))}
      </div>
      {seemore && <a className="see-more">xem tất cả</a>}
    </section>
  );
};

export default memo(MainFilmContainer);
