import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { componentsProps } from "../../../untils";
import { BiSearchAlt } from "react-icons/bi";
import PathLink, { defaultIconSize } from "../../../contants";
import RotateLoadding from "../../../components/Loadding/RotateLoadding";
import { Link } from "react-router-dom";

const SearchFilm: React.FC<{ totalEsopide: number; slug: string }> = ({
  totalEsopide,
  slug,
}) => {
  const [search, setInputSearch] = useState("");
  const [listSearch, setListSearch] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChoseEpisode = (e: HTMLInputElement | any) => {
    setInputSearch(e.target.value);
    e.target.value = "";
  };
  useEffect(() => {
    setInputSearch("");
    if (listSearch.length > 0) {
      setListSearch([]);
    }
  }, [slug]);
  const handleFindEpisode = () => {
    let valueSearch: number | string = search;
    valueSearch = Number(valueSearch.replace(/[a-zA-z*+-/]/g, ""));
    if (!isNaN(Number(valueSearch))) {
      let newArray: number[] = [];
      if (valueSearch <= totalEsopide) {
        for (let i = 1; i <= totalEsopide; i++) {
          if (`${i}`.includes(valueSearch + "")) {
            newArray.push(i);
          }
        }
      }
      setIsLoading(true);
      setListSearch([]);
      return new Promise((reslove) => {
        setTimeout(reslove, 1000);
      }).then(() => {
        setIsLoading(false);
        setListSearch(newArray);
      });
    }
  };

  return (
    <div>
      <label className="relative  w-full lg:w-80 my-3 flex">
        <Tooltip
          title="Bấm nút search để tìm kiếm.. "
          componentsProps={componentsProps}
          arrow
          placement="top"
        >
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-menu w-full rounded-md py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Tìm kiếm tập ... "
            type="text"
            name="search"
            onBlur={handleChoseEpisode}
          />
        </Tooltip>
        <button
          onClick={handleFindEpisode}
          className="bg-menu py-2 px-3 ml-2 rounded-full flex justify-center items-center hover:text-primary hover:bg-menu"
        >
          <BiSearchAlt size={defaultIconSize} />
          <span className="px-1">Search</span>
        </button>
      </label>
      <div className="">
        {isLoading && <RotateLoadding message="Đang tìm kiếm...." />}
      </div>
      <ul className="flex gap-1 flex-wrap">
        {listSearch.length > 0
          ? listSearch.map((episode) => (
              <li key={episode}>
                <Link
                  to={`${PathLink.seeFilm + slug}-tap-${episode}`}
                  className="text-center film_kinds-item w-20 text-sm block esopide"
                >
                  Tập {episode}
                </Link>
              </li>
            ))
          : search && !isLoading && "Không tìm thấy kết quả"}
      </ul>
    </div>
  );
};

export default SearchFilm;
