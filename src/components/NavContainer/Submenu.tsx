import React, { memo } from "react";
import { Link } from "react-router-dom";
interface TItem {
  slug: string;
  name: string;
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
          <li key={menu.name}>
            <Link to={path + "/" + menu.slug}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Submenu);
