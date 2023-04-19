import React, { memo, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import listMenuNav, { INav } from "./listMenu";
import Submenu from "./Submenu";
import "./nav.scss";
import PathLink from "../../contants";
import axios from "axios";
type TMenu = {
  isOpenMenu: boolean;
};
const Menu: React.FC<TMenu> = ({ isOpenMenu }) => {
  const [change, setChange] = useState<boolean>(false);
  useEffect(() => {
    axios.get(PathLink.domain + "api/listsub").then((res) => {
      if (res.status == 200) {
        const { categories, countries } = res.data;
        const itemCate = listMenuNav.find((item) => item.path == "the-loai");
        const itemcountry = listMenuNav.find((item) => item.path == "quoc-gia");
        if (itemCate) {
          itemCate.submenu = categories;
        }
        if (itemcountry) {
          itemcountry.submenu = countries;
        }

        setChange(true);
      }
    });
  }, []);
  return (
    <ul
      className={`main-menu text-xs lg:flex ${
        !isOpenMenu ? "height_effect_menu" : "height_auto_menu"
      }`}
    >
      {listMenuNav.length > 0 &&
        listMenuNav.map((menu: INav) => {
          return (
            <li key={menu.title}>
              <NavLink
                to={menu.path}
                onClick={(e) => {
                  menu.submenu && e.preventDefault();
                }}
              >
                {!menu.iconLeft && menu.iconElement}
                {menu.title}
                {menu.iconLeft && menu.iconElement}
              </NavLink>

              {menu.submenu && (
                <Submenu path={menu.path} listItems={menu.submenu} />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default memo(Menu);
