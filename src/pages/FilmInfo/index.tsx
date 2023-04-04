import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PathLink from "../../contants";
import { Ifilm } from "../../Redux/FilmSlice";
import ToastMessage from "../../untils/ToastMessage";
import "./fiml.scss";
import FilmLeft from "./UI/FilmLeft";
import FilmRight from "./UI/FilmRight";
import FilmDescription from "./UI/FilmDescription";
import EpisodeContainer from "./UI/Episode";

const FilmInfo = () => {
  let { slug } = useParams();
  const [film, setFilm] = useState<Ifilm>();
  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const responsive = await axios.post(PathLink.domain + "api/film", {
            method: "post",
            slug,
          });
          setFilm(responsive.data.film);
        } catch (err: any) {
          ToastMessage(err.response.data.message).info();
        }
      })();
    }
  }, [slug]);

  return (
    <>
      {film && (
        <section className="text-text film-detail">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 film_detail">
            <FilmLeft film={film} />
            <FilmRight film={film} />
          </div>
          <EpisodeContainer film={film} />
          <FilmDescription film={film} />
        </section>
      )}
    </>
  );
};

export default FilmInfo;
