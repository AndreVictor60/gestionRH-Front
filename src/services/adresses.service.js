import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/adresses';

class AdressesService {
  getAllAdresse() {
    return axios.get(API_URL, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAllAdresseByPage(page, size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAllAdresseByPageAndKeyword(page, size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAdresseById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  save(data) {
    return axios.post(API_URL, data, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  update(data) {
    return axios.put(API_URL, data, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  count(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
}

export default new AdressesService();
