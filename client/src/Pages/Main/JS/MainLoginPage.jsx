import React from "react";
import { observer } from "mobx-react-lite";
import "../SCSS/MainLoginPage.scss";
import MainLoginPageStore from "../Store/LoginPageStore";
import { useLocation, useNavigate } from "react-router-dom";

const MainLoginPage = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const redirect = () => navigate(fromPage);

  return (
    <div className="MainLoginPage__Container">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MIREA_logo.png/900px-MIREA_logo.png"
          alt=""
        />
      </div>

      <form className="MainLoginPage__form">
        <h1>Вход</h1>
        <input
          className="MainLoginPage__input MainLoginPage_input_emailimg"
          type="text"
          placeholder="Логин"
          value={MainLoginPageStore.logInData.email}
          onChange={(event) => {
            MainLoginPageStore.setEmail(event.target.value);
          }}
        />
        <input
          className="MainLoginPage__input MainLoginPage_input_passimg"
          type="password"
          placeholder="Пароль"
          value={MainLoginPageStore.logInData.password}
          onChange={(event) => {
            MainLoginPageStore.setPassword(event.target.value);
          }}
        />
        {/* <a href="#">Забыл пароль?</a> */}
        <input
          className="MainLoginPage__Button"
          type="submit"
          value="Войти"
          onClick={(event) => {
            event.preventDefault();
            MainLoginPageStore.FetchLogin().then(redirect());
          }}
        />
        <input
          className="MainLoginPage__Button"
          type="submit"
          value="Зарегестрироваться"
          onClick={(event) => {
            event.preventDefault();
            MainLoginPageStore.FetchRegistration().then(redirect());
          }}
        />
        {/* <a href="">Нет аккаунта? Зарегистрируйся!</a> */}
      </form>
    </div>
  );
});

export default MainLoginPage;
