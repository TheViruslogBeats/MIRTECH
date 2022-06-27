import React from "react";
import "./MainTopBar.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MainLoginPageStore from "../../../Pages/Main/Store/LoginPageStore";
import * as bi from "react-icons/bi";

const MainTopBar = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <header className="MainTopBar">
      <div className="MainTopBar__Container">
        <div className="MainTopBar__FlexContainer">
          <h1>IoTMirTech</h1>
        </div>
        <div className="MainTopBar__FlexContainer">
          {MainLoginPageStore.Authorized ? (
            <>
              <h1>{MainLoginPageStore.userData.user.userInfoDto.firstName}</h1>
              <h1>{MainLoginPageStore.userData.user.userInfoDto.lastName}</h1>
              <img
                alt="USERPHOTO"
                src={MainLoginPageStore.userData.user.userInfoDto.img}
              />
              <bi.BiLogOut onClick={() => {
                MainLoginPageStore.FetchLogout()
              }}/>
            </>
          ) : location.pathname === "/login" ? (
            <button
              onClick={() => {
                goBack();
              }}
            >
              Вернуться назад
            </button>
          ) : (
            <NavLink to="/login">
              <h1>
                Войти <bi.BiLogIn />
              </h1>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
});

export default MainTopBar;
