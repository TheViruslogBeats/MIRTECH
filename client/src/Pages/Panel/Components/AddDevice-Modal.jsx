import React from "react";
import { useNavigate } from "react-router-dom";
import PanelDevicesStore from "../Store/PanelDevicesStore";
import "./AddDeviceModal.scss";
const AddDeviceModal = () => {
  const navigate = useNavigate();

  const goback = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="PanelDevicesPage__ModalBKG" />
      <div className="PanelDevicesPage__Modal">
      <button onClick={() => goback()}>Закрыть</button>
        <h2>Какое устройство?</h2>
        <div>
          <div>
            <input
              type="text"
              placeholder="Название"
              value={PanelDevicesStore.deviceName}
              onChange={(event) => {
                PanelDevicesStore.setDeviceName(event.target.value);
              }}
            />
            <select
              value={PanelDevicesStore.deviceType}
              onChange={(event) =>
                PanelDevicesStore.setDeviceType(event.target.value)
              }
              placeholder="Тип датчика"
            >
              <option value="temperature_sensor">Датчик температуры</option>
              <option value="light_sensor">Датчик света</option>
              <option value="switch_door_sensor">Датчик двери</option>
              <option value="switch_window_sensor">Датчик окна</option>
              <option value="water_sensor">Датчик воды</option>
            </select>
            <button
              onClick={() => {
                PanelDevicesStore.AddDevicesFetch();
                goback();
              }}
            >
              <h2>Добавить устройство</h2>
            </button>
          </div>
          <div>
            <div>
              <input type="checkbox" id="typeofCon"></input>
              <label htmlFor="typeofCon">TCP/IP</label>
            </div>
            <div>
              <input type="checkbox" id="typeofCon" disabled></input>
              <label htmlFor="typeofCon">UDP</label>
            </div>
            <div>
              <input type="checkbox" id="typeofCon" disabled></input>
              <label htmlFor="typeofCon">ZigBee</label>
            </div>
            <div>
              <input type="checkbox" id="typeofCon" disabled></input>
              <label htmlFor="typeofCon">MQTT</label>
            </div>
            <div>
              <input type="checkbox" id="typeofCon" disabled></input>
              <label htmlFor="typeofCon">COAP</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDeviceModal;
