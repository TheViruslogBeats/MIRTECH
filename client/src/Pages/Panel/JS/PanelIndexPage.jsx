import React from "react";
import "../SCSS/PanelIndexPage.scss";
import * as bi from "react-icons/bi";

export default function PanelMainPage() {
  return (
    <div className="PanelMainPage">
      <h1>Мои устройства</h1>
      <div className="PanelMainPage__Container">
        <h2>Колличество устройств: </h2>
        <table className="PanelMainPage__iksweb">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название устройства</th>
              <th>Статус</th>
              <th>Протокол</th>
              <th>Настройки</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Мой дом</td>
              <td>
                <div className="PanelMainPage__Status">
                  <div></div>
                  <p>Онлайн</p>
                </div>
              </td>
              <td>TCP</td>
              <td className="PanelMainPage__SVG">
                <bi.BiWrench />
                <bi.BiPencil />
                <bi.BiTrash />
              </td>
              <td><button>Перейти</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
