import axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PathLink from "../contants";
import { Ifilm } from "../Redux/FilmSlice";
import RotateLoadding from "../components/Loadding/RotateLoadding";
import { Pagination } from "@mui/material";
const MainFilmContainer = React.lazy(
  () => import("../components/MainFilmContainer")
);
const kindfilm: any = {
  "phim-le": "Danh Sách Phim lẻ",
  "phim-hoan-thanh": "Phim đã hoàn thành",
  "phim-dang-chieu": "Danh sách Phim Đang Chiếu",
  "phim-sap-chieu": "Danh sách Phim Trailer",
  "quoc-gia": "Phim theo quốc gia  ",
  "the-loai": "phim theo thể loại ",
  "xem-tat-ca": "Tất cả phim",
};
const Product = () => {
  const router = useLocation();
  const [kindSPath, setKindPath] = useState<string>("");
  const [listfilm, setListFilm] = useState<Ifilm[]>();
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadding, setLoading] = useState<boolean>(false);
  const [namePathTwo, setNamePathTwo] = useState<string>("");
  const pathname = router.pathname.split("/");
  useEffect(() => {
    setLoading(true);
    setTotalPage(0);
    setNamePathTwo("");
    if (pathname[1]) {
      axios
        .post(PathLink.domain + "api/pagefilm", {
          method: "post",
          data: {
            kind: pathname[1],
            slug: pathname[2],
            page: 0,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setKindPath(pathname[1]);
            setListFilm(response.data.data);
            setTotalPage(response.data.totalPage);
            response.data.subName && setNamePathTwo(response.data.subName);
            setCurrentPage(1);
            setLoading(false);
          }
        });
    }
  }, [pathname[1], pathname[2]]);
  const navigate = useNavigate();
  if (!kindfilm[pathname[1]]) {
    navigate(`/${PathLink.pagenotfound}`);
  }
  const handleChanePage = (event: any, page: number) => {
    setLoading(true);
    axios
      .post(PathLink.domain + "api/pagefilm", {
        method: "post",
        data: {
          kind: pathname[1],
          slug: pathname[2],
          page: page - 1,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.scrollTo({
            behavior: "smooth",
            top: 0,
          });
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
              title={kindfilm[kindSPath] + namePathTwo}
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
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#ff871b",
                color: "#fff",
              },
              "& .MuiPaginationItem-root": {
                color: "#fff",
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
            }}
            count={totalPage}
            page={currentPage}
            siblingCount={0}
            boundaryCount={2}
          />
        </div>
      )}
      {listfilm && listfilm.length <= 0 && (
        <p className="text-primary font-bold text-sm">
          - Hiện tại chưa có phim nào
        </p>
      )}
    </section>
  );
};

export default Product;
