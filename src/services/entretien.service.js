import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/entretiens';

class EntretienService {
    getAllEntretiens() {
    return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllEntretiensByPage(page,size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getEntretienById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  } 
  getEntretienByManager(idManager) {
    return axios.get(API_URL + `/manager/${idManager}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  } 
  getEntretienBySalarie(idSalarie) {
    return axios.get(API_URL + `/salarie/${idSalarie}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  } 
  count() {
    return axios.get(API_URL + `/count`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  } 
  save(data) {
    return axios.post(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  update(data) {
    return axios.put(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
}

export default new EntretienService();
