import React, { useState, useEffect, useRef, memo } from "react";
import { BiSearch, BiAnalyse } from "react-icons/bi";
import { Tooltip } from "@mui/material";
import "./search.scss";
import { defaultIconSize } from "../../contants";
const SearchContainer = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const searchInput = useRef<any>(null);
  const handleForcus = () => {
    searchInput.current.focus();
  };
  console.log("ren-render-search");

  useEffect(() => {
    document.onclick = () => {
      setSearch("");
    };
  }, []);
  return (
    <section className="w-full search_content">
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tên phim..."
          />
        </Tooltip>
        <BiAnalyse
          cursor="progress"
          className="animate-spin"
          fontSize={defaultIconSize}
        />
      </div>
      <div className={`search_result ${!search && "hidden"}`}>
        <h5 className="bg-gray-700 py-2 px-5 text-base">
          Kết quả tìm kiếm: <span className="text-yellow-400">{search}</span>
        </h5>
        <ul className="search_result-list">
          <li>
            <a href="" className="flex items-center p-3 hover:bg-hover">
              <img src="/images/thumsfilm.jpg" width="50" height="80" alt="" />
              <div className="mx-3">
                <h6 className="text-base">Hạnh phúc quanh ta</h6>
                <p className="text-blue-300 font-medium">Happy for codding</p>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="flex items-center p-3 hover:bg-hover">
              <img src="/images/thumsfilm.jpg" width="50" height="80" alt="" />
              <div className="mx-3">
                <h6 className="text-base">Hạnh phúc quanh ta</h6>
                <p className="text-blue-300 font-medium">Happy for codding</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default memo(SearchContainer);
