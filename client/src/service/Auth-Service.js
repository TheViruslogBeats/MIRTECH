import $api from "../api";

export default class AuthService {
  static async login(email, password) {
    return $api.post("/auth/login", { email, password });
  }

  static async logout() {
    return $api.post("/auth/logout");
  }

  static async registration(email, password) {
    return $api.post("/auth/registration", { email, password });
  }
}
