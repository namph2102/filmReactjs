import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  memo,
} from "react";
import { BiSearch, BiAnalyse } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import "./search.scss";
import { defaultIconSize } from "../../contants";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Ifilm } from "../../Redux/FilmSlice";
import { ResultSearch } from "./ResultSearch";

const SearchContainer = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [listFindFilms, setListFindFilms] = useState<Ifilm[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const searchInput = useRef<any>(null);
  const handleForcus = () => {
    searchInput.current.focus();
  };

  const filmSlice = useSelector((state: RootState) => state.film.fimls);
  // Tạo hiệu ứng loading
  useLayoutEffect(() => {
    if (!search) return setListFindFilms(() => []);
    if (isLoading) return;
    setLoading(true);
    const searcPromsie = new Promise((resolve) => {
      const idTimeout = setTimeout(() => {
        const findFilm: Ifilm[] = filmSlice.filter(
          (film: Ifilm) =>
            film.name.toLowerCase().includes(search.toLowerCase()) ||
            film.origin_name.toLowerCase().includes(search.toLowerCase())
        );
        clearTimeout(idTimeout);
        resolve(findFilm);
      }, 1000);
    });
    searcPromsie
      .then((data: any) => {
        setListFindFilms(() => [...data]);
      })
      .catch(() => setListFindFilms([]))
      .finally(() => setLoading(false));
    return () => {};
  }, [search]);

  useEffect(() => {
    document.onclick = () => {
      setSearch("");
    };
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
      }
    });
  }, []);

  return (
    <section className="w-full search_content ">
      <div
        className={`search-box ${
          !search && "rounded-full"
        } flex items-center bg-input`}
      >
        <BiSearch
          cursor="pointer"
          fontSize={defaultIconSize}
          onClick={handleForcus}
          className="mx-2"
        />
        <Tooltip title="Nhấn Enter để tìm kiếm" arrow>
          <input
            ref={searchInput}
            height="30px"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())}
            placeholder="Tìm kiếm tên phim..."
          />
        </Tooltip>
        {isLoading && (
          <BiAnalyse
            cursor="progress"
            className="animate-spin"
            fontSize={defaultIconSize}
          />
        )}
      </div>
      <div className="search_result">
        {search && (
          <h5 className="bg-gray-700 py-2 px-5 text-base">
            Kết quả tìm kiếm: <span className="text-yellow-400">{search}</span>
          </h5>
        )}
        {!isLoading && listFindFilms.length > 0 && (
          <ResultSearch listFilm={listFindFilms} />
        )}
      </div>
    </section>
  );
};

export default memo(SearchContainer);
