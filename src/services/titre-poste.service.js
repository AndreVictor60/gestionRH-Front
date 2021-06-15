import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/titrepostes';

class TitrePosteService {
    getAllTitrePoste() {
    return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  countTitrePoste(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllTitrePosteByPage(page,size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllTitrePosteByPageAndKeyword(page,size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getTitrePosteById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getTitrePosteByName(recherche) {
    return axios.get(API_URL + `/search?name=${recherche}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  saveTitrePoste(data) {
    return axios.post(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  updateTitrePoste(data) {
    return axios.put(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  deleteTitrePosteById(id) {
    return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
}

export default new TitrePosteService();
