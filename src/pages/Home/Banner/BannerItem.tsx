import React from "react";
import { ISlider } from "../../../contants";
import { Link } from "react-router-dom";
import PathLink from "../../../contants";
interface IItemBanner extends ISlider {
  translateX: string;
}

const BannerItem: React.FC<IItemBanner> = ({
  translateX,
  slug,
  link,
  subname,
  title,
}) => {
  return (
    <figure
      style={{ transform: `translateX(${translateX})` }}
      className="banner_item"
    >
      <Link to={"/" + PathLink.seeFilmDetail + "/" + slug}>
        <img className="cursor-pointer object-cover" src={link} alt={title} />
      </Link>
      <figcaption className="banner_item-des py-4 px-5 ">
        <h3 className="text-2xl text-ellipsis overflow-hidden capitalize">
          {title}
        </h3>
        <p className="text-sm text-ellipsis overflow-hidden capitalize">
          [{subname}]
        </p>
      </figcaption>
    </figure>
  );
};

export default BannerItem;
