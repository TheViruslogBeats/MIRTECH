import { useLocation, Navigate } from "react-router-dom";

import React from "react";
import LoginPageStore from "../Pages/Main/Store/LoginPageStore";
import Loader from "../Components/Loader/Loader";
import { observer } from "mobx-react-lite";

const RequireAuth = ({ children }) => {
  const location = useLocation();

  if (LoginPageStore.isLoading && !LoginPageStore.Authorized) {
    return <Loader />;
  } else if (!LoginPageStore.Authorized && !LoginPageStore.isLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    return children;
  }
};

export default observer(RequireAuth);
