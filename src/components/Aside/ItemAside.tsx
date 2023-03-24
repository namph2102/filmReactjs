import React from "react";
import { Link } from "react-router-dom";
import { Ifilm } from "../../Redux/FilmSlice";
import { Handle } from "../../untils";
import "./Aside.scss";
import PathLink from "../../contants";
const AsideItem = ({ items }: { items: Ifilm }) => {
  return (
    <div className="aside-popular mb-1">
      <Link
        to={`${PathLink.seeFilmDetail}/${items.slug}`}
        className="aside-items_film"
      >
        <figure className="aside-items-avata_box">
          <img
            src={items.thumb_url}
            className="aside-items-avata object-cover"
            alt={items.name}
          />
        </figure>
        <figcaption className="items_film-des">
          <h4 className="items_film-des_title text-text">{items.name}</h4>
          <p className="items_film-des_origin text-second">
            {items.origin_name}
          </p>
          <p className="items_film-des_view text-primary flex items-center gap-1">
            {Handle.HandleView(Number(items.view))}
          </p>
        </figcaption>
      </Link>
    </div>
  );
};

export default AsideItem;
