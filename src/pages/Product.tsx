import axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import PathLink from "../contants";
import { Ifilm } from "../Redux/FilmSlice";
import RotateLoadding from "../components/Loadding/RotateLoadding";
import { Pagination } from "@mui/material";
const MainFilmContainer = React.lazy(
  () => import("../components/MainFilmContainer")
);
const kindfilm: any = {
  "phim-le": "Phim lẻ",
  "phim-hoan-thanh": "Phim đã hoàn thành",
};
const Product = () => {
  const router = useLocation();
  const [kindSPath, setKindPath] = useState<string>("");
  const [listfilm, setListFilm] = useState<Ifilm[]>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadding, setLoading] = useState<boolean>(false);
  const pathname = router.pathname.split("/");
  useEffect(() => {
    setLoading(true);
    if (pathname[1]) {
      axios
        .post(PathLink.domain + "api/pagefilm", {
          method: "post",
          data: {
            kind: pathname[1],
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setKindPath(pathname[1]);
            setListFilm(response.data.data);
            setTotalPage(response.data.totalPage);
            setCurrentPage(1);
            setLoading(false);
          }
        });
    }
  }, [pathname[1]]);
  const handleChanePage = (event: any, page: number) => {
    setLoading(true);
    axios
      .post(PathLink.domain + "api/pagefilm", {
        method: "post",
        data: {
          kind: pathname[1],
          page,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setKindPath(pathname[1]);
          setListFilm(response.data.data);
          setTotalPage(response.data.totalPage);
          setCurrentPage(page);
          setLoading(false);
        }
      });
  };
  return (
    <section>
      {!loadding ? (
        <Suspense fallback={<RotateLoadding message="Loading ..." />}>
          {listfilm && (
            <MainFilmContainer
              title={kindfilm[kindSPath]}
              listFilms={listfilm}
            />
          )}
        </Suspense>
      ) : (
        <RotateLoadding message="Loading ..." />
      )}
      {totalPage > 1 && (
        <div className="flex justify-center">
          <Pagination
            onChange={handleChanePage}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#ffffff",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#3d3c22",
              },
              "& .Mui-disabled": {
                backgroundColor: "transparent",
                color: "transparent",
              },
              "& button": {
                fontSize: "16px",
                color: "#ffffff",
              },
              "& .Mui-selected": {
                backgroundColor: "#ff871b",
                color: "#fff",
              },
            }}
            count={totalPage}
            page={currentPage}
            siblingCount={0}
            boundaryCount={2}
          />
        </div>
      )}
    </section>
  );
};

export default Product;
