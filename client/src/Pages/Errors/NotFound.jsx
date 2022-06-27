import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="Error__Container">
      <h1>Ошибка 404</h1>
      <p>Сервер не может найти запрашиваемый ресурс.</p>
      <p>Возможно указана неверная ссылка</p>
      <NavLink to="/">Вернуться на главную страницу</NavLink>
    </div>
  );
};

export default NotFound;
