import { memo } from "react";
import Film from "./Film";
import "./mainfilm.scss";
import { Ifilm } from "../../Redux/FilmSlice";
interface IMain {
  title?: string;
  listFilms: Ifilm[];
  seemore?: boolean;
}
const MainFilmContainer: React.FC<IMain> = ({ title, listFilms, seemore }) => {
  return (
    <section className="main-contents">
      {title && <h5 className="title_special inline-block">{title}</h5>}
      <div className="films-containe flex flex-wrap  my-4">
        {listFilms.length > 0 &&
          listFilms.map((film: Ifilm, index) => <Film film={film} />)}
      </div>
      {seemore && <a className="see-more">xem tất cả</a>}
    </section>
  );
};

export default memo(MainFilmContainer);
