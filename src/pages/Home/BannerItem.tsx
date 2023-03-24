import React from "react";
import { ISlider } from "../../contants";
import { Link } from "react-router-dom";
interface IItemBanner extends ISlider {
  translateX: string;
}

const BannerItem: React.FC<IItemBanner> = ({
  translateX,
  slug,
  link,
  description,
  title,
}) => {
  return (
    <figure
      style={{ transform: `translateX(${translateX})` }}
      className="banner_item"
    >
      <Link to={slug}>
        <img className="cursor-pointer" src={link} alt={title} />
      </Link>
      <figcaption className="banner_item-des py-4 px-5 ">
        <h3 className="text-2xl text-ellipsis overflow-hidden">{title}</h3>
        <p className="text-sm text-ellipsis overflow-hidden">[{description}]</p>
      </figcaption>
    </figure>
  );
};

export default BannerItem;