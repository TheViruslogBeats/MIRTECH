import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./App.scss";
import React, { Suspense } from "react";

//Layouts
import MainLayout from "./Layouts/Main/MainLayout";
import PanelLayout from "./Layouts/Panel/PanelLayout";
import RequireAuth from "./hoc/RequireAuth";
import AddDeviceModal from "./Pages/Panel/Components/AddDevice-Modal";
import Loader from "./Components/Loader/Loader";
//Pages
const NotFound = React.lazy(() => import("./Pages/Errors/NotFound"));
const MainIndexPage = React.lazy(() => import("./Pages/Main/JS/MainIndexPage"));
const MainLoginPage = React.lazy(() => import("./Pages/Main/JS/MainLoginPage"));
const PanelMainPage = React.lazy(() =>
  import("./Pages/Panel/JS/PanelIndexPage")
);
const PanelDevicesPage = React.lazy(() =>
  import("./Pages/Panel/JS/PanelDevicesPage")
);
const PanelSettingsPage = React.lazy(() =>
  import("./Pages/Panel/JS/PanelSettingsPage")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <MainIndexPage />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <Suspense fallback={<Loader />}>
                <MainLoginPage />
              </Suspense>
            }
          />
        </Route>
        //Panel
        <Route
          path="/panel"
          element={
            <RequireAuth>
              <PanelLayout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <PanelMainPage />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<Loader />}>
                <PanelSettingsPage />
              </Suspense>
            }
          />
          <Route
            path="devices/*"
            element={
              <Suspense fallback={<Loader />}>
                <PanelDevicesPage />
              </Suspense>
            }
          >
            <Route path="add" element={<AddDeviceModal />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default observer(App);
