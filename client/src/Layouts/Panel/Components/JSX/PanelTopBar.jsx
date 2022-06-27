import React from "react";
import "../SCSS/PanelTopBar.scss";
import * as bi from "react-icons/bi";
import PanelTopBarStore from "../../Store/PanelTopBarStore";
import LoginPageStore from "../../../../Pages/Main/Store/LoginPageStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const PanelTopBar = observer(() => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  return (
    <header className="PanelTopBar">
      <div className="PanelTopBar__Container">
        <div>
          <button
            onClick={() => {
              PanelTopBarStore.changePanelTopBar();
            }}
          >
            <bi.BiListUl />
          </button>
          <p>НАЗВАНИЕ СТРАНИЦЫ</p>
        </div>
        <div>
          {LoginPageStore.Authorized ? (
            <>
              <h1>
                {LoginPageStore.userData.user.userInfoDto.firstName}{" "}
                {LoginPageStore.userData.user.userInfoDto.lastName}
              </h1>
              <img
                alt="USERPHOTO"
                src={LoginPageStore.userData.user.userInfoDto.img}
              />
              <bi.BiLogOut
                onClick={() => {
                  LoginPageStore.FetchLogout();
                  goToMain()
                }}
              />
            </>
          ) : (
            <h1>Загрузка...</h1>
          )}
        </div>
      </div>
    </header>
  );
});

export default PanelTopBar;
