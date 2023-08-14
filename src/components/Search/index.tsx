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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [ListFilms, setListFimls] = useState<Ifilm[]>([]);
  const searchInput = useRef<any>(null);
  const handleForcus = () => {
    searchInput.current.focus();
  };

  const handheChangeValueSearch = () => {
    if (!searchInput.current.value) return setListFindFilms(() => []);
    axios
      .post(Pathlink.domain + "api/search", {
        data: searchInput.current.value,
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
              setListFindFilms(() => []);
              e.target.value = "";
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
            Kết quả tìm kiếm: <span className="text-yellow-400">{search}</span>
          </h5>
        )}
        {listFindFilms.length > 0 && <ResultSearch listFilm={listFindFilms} />}
      </div>
    </section>
  );
};

export default memo(SearchContainer);
