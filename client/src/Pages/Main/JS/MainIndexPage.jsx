import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import "../SCSS/MainIndexPage.scss";
import LoginPageStore from "../Store/LoginPageStore";

const MainIndexPage = observer(() => {
  return (
    <div className="MainIndexPage">
      <h1>Главная страница</h1>
      {LoginPageStore.Authorized ? (
        <>
          <p>Вы авторизованы!</p>
          <NavLink to="/panel">Перейти в панель</NavLink>
        </>
      ) : (
        <p>
          Для того чтобы начать пользоваться панелью, вам необходимо
          авторизоваться!
        </p>
      )}
    </div>
  );
});

export default MainIndexPage;
