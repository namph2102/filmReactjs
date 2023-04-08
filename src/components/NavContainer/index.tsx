import React, { memo } from "react";

import { NavLink } from "react-router-dom";
import listMenuNav, { INav } from "./listMenu";
import Submenu from "./Submenu";
import "./nav.scss";
type TMenu = {
  isOpenMenu: boolean;
};
const Menu: React.FC<TMenu> = ({ isOpenMenu }) => {
  console.log("re-render menu");

  return (
    <ul
      className={`main-menu text-xs lg:flex ${
        !isOpenMenu ? "height_effect_menu" : "height_auto"
      }`}
    >
      {listMenuNav.map((menu: INav) => {
        return (
          <li key={menu.title}>
            <NavLink to={menu.path}>
              {!menu.iconLeft && menu.iconElement}
              {menu.title}
              {menu.iconLeft && menu.iconElement}
            </NavLink>
            {menu.submenu && <Submenu listItems={menu.submenu} />}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Menu);
