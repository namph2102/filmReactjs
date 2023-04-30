import React, { useState } from "react";
import { Ifilm } from "../../../Redux/FilmSlice";
import moment from "moment";
import calendar from "../../../assets/calendar.png";
import danger from "../../../assets/danger.png";
import "./filmdes.scss";
const FilmDescription: React.FC<{ film: Ifilm }> = ({ film }) => {
  const [openDes, setOpenDes] = useState<boolean>(false);
  return (
    <div className="bg-hover p-4">
      <div className="halim--notice">
        <figure className="flex items-center gap-2 py-4 bg-third text-base px-2 rounded">
          <img src={danger} width={40} height={40} />
          <figcaption className="m-0">
            <li>
              Mẹo tìm kiếm : Thêm{" "}
              <span className="italic text-primary font-bold">videotv</span>{" "}
              phía sau để ra kết quả tốt nhất, ví dụ :{" "}
              <span className="capitalize"> {film.name} </span>{" "}
              <span className="italic text-primary font-bold">videotv</span>
            </li>
            <li>
              Đừng tiếc 1{" "}
              <span className="italic text-primary font-bold">comment</span> bên
              dưới để đánh giá phim
            </li>
            <li>
              {" "}
              <span className="italic text-primary font-bold">Đăng nhập </span>
              để bình chọn sao nhé !
            </li>
          </figcaption>
        </figure>
        <figure className="flex items-center gap-2 py-4 bg-third text-base mt-4 px-2 rounded">
          <img src={calendar} width={40} height={40} />
          <figcaption className="m-0">
            <ul className="m-0">
              <li>
                Phim được cập nhập vào lúc
                <span className="italic text-primary font-bold">
                  {" "}
                  {moment(film.updatedAt).format("HH:mm:ss - DD/MM/YYYY ")}
                </span>
              </li>
            </ul>
          </figcaption>
        </figure>
      </div>

      <div className="title_special-box mb-4 mt-3">
        <h5 className="title_special inline-block">Nội Dung Phim</h5>
      </div>
      <div className="film-detail_des">
        <h2 className="capitalize text-xl font-extrabold font-sans">
          {film.name}
        </h2>
        <p className={`film-detail_des-info ${openDes && "open"}`}>
          {film.description}
          <span className="item-content-gradient absolute bottom-0 left-0 right-0"></span>
        </p>
        <button
          onClick={() => setOpenDes(!openDes)}
          className="hover:text-primary  py-2 "
        >
          {!openDes ? "Mở rộng ..." : "Thu gọn"}
        </button>
      </div>
    </div>
  );
};

export default FilmDescription;
