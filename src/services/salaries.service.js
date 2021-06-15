import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/salaries';

class SalariesService {
  getAll() {
    return axios.get(API_URL + "/0/10", { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  getAllSalariesByPage(page, size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  getAllSalariesByKeywordPerPage(page, size, name) {
    return axios.get(API_URL + `/${page}/${size}/${name}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }
  /* findBySalarie() {
     return axios.get(API_URL, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
   }*/

  getAllSalariesWithoutPoste() {
    return axios.get(API_URL + `/sans-poste`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  getAllSalariesByDomaineAndCompetence(domaine, competence) {
    return axios.get(API_URL + `/salaries-domaine-competence/${domaine}/${competence}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  getAllSalariesWithoutPosteByDomaineAndCompetence(domaine, competence) {
    return axios.get(API_URL + `/salaries-sans-poste-domaine-competence/${domaine}/${competence}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  getUser() {
    return axios.get(API_URL + "/3", { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  getSalarieById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

  save(data) {
    return axios.post(API_URL, data, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' } });
  }

  update(data) {
    return axios.put(API_URL, data, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' } });
  }

  updateWithoutPassword(data) {
    return axios.put(API_URL + "/without-password", data, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' } });
  }

  count(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization: authHeader(), "Access-Control-Allow-Origin": "*" } });
  }

}

export default new SalariesService();
