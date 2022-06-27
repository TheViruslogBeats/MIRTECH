import React from "react";
import { Outlet } from "react-router-dom";

import "./PanelLayout.scss";

import { PanelSideBar } from "./Components/JSX/PanelSideBar";
import PanelTopBar from "./Components/JSX/PanelTopBar";

const PanelLayout = () => {
  return (
    <div className="PanelLayout">
      <PanelTopBar />
      <div className="PanelLayout__Content">
        <PanelSideBar />
        <div className="PanelLayout__Content__Outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;
