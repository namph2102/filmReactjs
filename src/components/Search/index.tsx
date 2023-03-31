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
import axios from "axios";
import Pathlink from "../../contants";
const SearchContainer = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [listFindFilms, setListFindFilms] = useState<Ifilm[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ListFilms, setListFimls] = useState<Ifilm[]>([]);
  const searchInput = useRef<any>(null);
  const handleForcus = () => {
    searchInput.current.focus();
  };

  useEffect(() => {
    const featchDataSearch = async () => {
      try {
        const res = await axios.get(Pathlink.domain + "api/v2");
        setListFimls(res.data.data);
      } catch {
        console.log("Can not find Api search");
      }
    };
    const idTimeout = setTimeout(() => {
      featchDataSearch();
      clearTimeout(idTimeout);
    }, 4000);
    return () => {
      clearTimeout(idTimeout);
    };
  }, []);
  // Tạo hiệu ứng loading
  useLayoutEffect(() => {
    if (!search) return setListFindFilms(() => []);
    if (isLoading) return;
    setLoading(true);
    const searcPromsie = new Promise((resolve) => {
      const idTimeout = setTimeout(() => {
        const findFilm: Ifilm[] = ListFilms.filter(
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
    const handleClick = () => {
      setSearch("");
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
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
        <Tooltip
          title={
            ListFilms.length <= 0
              ? "😥😥 Đang loadding dữ liệu"
              : "Nhập tên phim ..."
          }
          arrow
        >
          <input
            style={{
              cursor: ` ${ListFilms.length <= 0 ? "progress" : "auto"}`,
            }}
            ref={searchInput}
            height="30px"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.trim())}
            placeholder="Tìm kiếm tên phim..."
            disabled={ListFilms.length <= 0}
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
