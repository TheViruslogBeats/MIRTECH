import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class PanelDevicesStore {
  isModalOpened = false;
  temp = {};
  devices = [];

  deviceName = "";
  deviceType = "temperature_sensor";
  constructor() {
    makeAutoObservable(this);
  }

  async AddDevicesFetch() {
    console.log(this.deviceName);
    console.log(this.deviceType);
    const options = {
      method: "POST",
      url: "http://95.165.99.119:3000/create_sensor",
      headers: { "Content-Type": "application/json" },
      data: { name: "SANYABLYAT222", type_sensor: "temperature_sensor" },
    };

    this.temp = await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    runInAction(() => {
      this.devices.push(this.temp.data);
    });

    this.setDeviceName("");
    this.setDeviceType("temperature_sensor");
  }

  changeModalState(bool) {
    this.isModalOpened = bool;
  }

  setDeviceName(value) {
    this.deviceName = value;
  }

  setDeviceType(value) {
    this.deviceType = value;
  }
}

export default new PanelDevicesStore();
