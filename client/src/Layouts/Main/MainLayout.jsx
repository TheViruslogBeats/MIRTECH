import React from "react";
import { Outlet } from "react-router-dom";
import MainTopBar from "./Components/MainTopBar";
import "./MainLayout.scss";

export default function MainLayout() {
  return (
    <div className="MainLayout">
      <MainTopBar />
      <div className="MainLayout__Container">
        <Outlet />
      </div>
    </div>
  );
}
