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

import { Ifilm } from "../../Redux/FilmSlice";
import { ResultSearch } from "./ResultSearch";
import axios from "axios";
import Pathlink from "../../contants";
import { Debounced } from "../../untils";
const SearchContainer = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [listFindFilms, setListFindFilms] = useState<Ifilm[]>([]);
  const [isLoading] = useState<boolean>(false);
  const searchKeyword = useRef<HTMLSpanElement>(null);
  const searchInput = useRef<any>(null);
  const handleForcus = () => {
    searchInput.current.focus();
  };

  const handheChangeValueSearch = () => {
    const valueSearch = searchInput.current.value;
    if (!valueSearch) return setListFindFilms(() => []);
    if (searchKeyword.current) {
      searchKeyword.current.innerText = valueSearch || "";
    }

    axios
      .post(Pathlink.domain + "api/search", {
        data: valueSearch,
      })
      .then((res) => res.data?.listfilmSearch)
      .then((data) => {
        if (data) {
          setListFindFilms(() => data);
        }
      });
  };

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
        <Tooltip title={"Nhập tên phim ..."} arrow>
          <input
            ref={searchInput}
            height="30px"
            onBlur={(e) => {
              const id = setTimeout(() => {
                clearTimeout(id);
                setListFindFilms(() => []);
                e.target.value = "";
              }, 100);
            }}
            type="text"
            onChange={Debounced(handheChangeValueSearch, 500)}
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
            Kết quả tìm kiếm:{" "}
            <span ref={searchKeyword} className="text-yellow-400"></span>
          </h5>
        )}

        {listFindFilms.length > 0 && <ResultSearch listFilm={listFindFilms} />}
      </div>
    </section>
  );
};

export default memo(SearchContainer);
