import React, { memo } from "react";
import { Link } from "react-router-dom";
interface TItem {
  slug: string;
  _id: string;
  country?: string;
  category?: string;
}
type Tprops = {
  path: string;
  listItems: TItem[];
};
const Submenu: React.FC<Tprops> = ({ listItems, path }) => {
  return (
    <div className=" drop-menu">
      <ul>
        {listItems.map((menu, index) => (
          <li key={menu._id}>
            <Link to={path + "/" + menu.slug}>
              {menu.country || menu.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Submenu);
