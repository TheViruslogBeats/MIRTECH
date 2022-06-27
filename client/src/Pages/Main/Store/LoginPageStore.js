import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../../../service/Auth-Service";

import { API_URL } from "../../../api";

class MainLoginPageStore {
  isLoading = true;
  Authorized = false;
  userData = null;
  logInData = {
    email: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  async FetchLogin() {
    try {
      const response = await AuthService.login(
        this.logInData.email,
        this.logInData.password
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUserData(response.data);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async FetchLogout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.logInData = {};
      this.setUserData(null);
      this.setAuth(false);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async FetchRegistration() {
    try {
      const response = await AuthService.registration(
        this.logInData.email,
        this.logInData.password
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setUserData(response.data);
      this.setAuth(true);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setUserData(response.data);
      this.setAuth(true);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      this.setIsLoading(false);
    }
  }

  setAuth(bool) {
    this.Authorized = bool;
  }

  setUserData(data) {
    this.userData = data;
  }

  setIsLoading(bool) {
    this.isLoading = bool;
  }

  setEmail(value) {
    this.logInData.email = value;
  }
  setPassword(value) {
    this.logInData.password = value;
  }
}

export default new MainLoginPageStore();
