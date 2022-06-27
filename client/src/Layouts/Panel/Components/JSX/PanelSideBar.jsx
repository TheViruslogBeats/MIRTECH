import React from "react";
import "../SCSS/PanelSideBar.scss";
import * as bi from "react-icons/bi";
import PanelTopBarStore from "../../Store/PanelTopBarStore";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export const PanelSideBar = observer(() => {
  return (
    <div
      className={
        PanelTopBarStore.PanelTopBar
          ? "PanelSideBar"
          : "PanelSideBar PanelSideBarClosed"
      }
    >
      <ul>
        <li>
          <NavLink to="/panel">
            <bi.BiHome />
            <p>Главная страница</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="devices">
            <bi.BiServer />
            <p>Мои устройства</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="settings">
            <bi.BiWrench />
            <p>Настройки</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <bi.BiLogOut />
            <p>Выход</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
});
