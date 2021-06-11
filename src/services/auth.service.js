import axios from "axios";
//import axiosInstance from './axiosInstance'

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "authenticate", { email, password })
      .then((response) => {
        console.log("response",response.data)
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("salarie", JSON.stringify(response.data.email));
          localStorage.setItem("user", JSON.stringify(response.data.email));
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
