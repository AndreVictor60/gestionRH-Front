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
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

}

export default new AuthService();
