import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "authenticate", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("salarie", JSON.stringify(response.data.subObject));
          localStorage.setItem("user", JSON.stringify(response.data.subObject.email));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("salarie");
    localStorage.removeItem("token");
  }

}

export default new AuthService();
