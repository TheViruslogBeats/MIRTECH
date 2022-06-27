import { observer } from "mobx-react-lite";
import React from "react";
import "../SCSS/PanelDevicesPage.scss";
import PanelDevicesStore from "../Store/PanelDevicesStore";
import * as io from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

const PanelDevicesPage = observer(() => {
  return (
    <div className="PanelDevicesPage">
      <NavLink to="add">
        <io.IoMdAddCircleOutline /> <p>Добавить устройство</p>
      </NavLink>
      {PanelDevicesStore.devices.map((device) => {
        return (
          <>
            <h1>{device.name}</h1>
            <h1>{device.type_sensor}</h1>
          </>
        );
      })}
      <Outlet />
    </div>
  );
});

export default PanelDevicesPage;
