import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/typecontrats';

class TypeContratService {
  getAllTypeContrat() {
    return axios.get(API_URL, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAllTypeContratByPage(page, size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAllTypeContratByPageAndKeyword(page, size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getTypeContratById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getTypeContratByName(recherche) {
    return axios.get(API_URL + `/search?name=${recherche}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  count(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
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
}

export default new TypeContratService();
