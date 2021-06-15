import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/competences';

class CompetenceService {
  getAllCompetence() {
    return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllComptenceByPage(page,size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllComptenceByPageAndKeyword(page,size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  countCompetence(search) {
    if(search === null || search === undefined){
      return axios.get(API_URL + `/count`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }else{
      return axios.get(API_URL + `/count/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }
  }
  getCompetenceById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getCompetenceByIdDomaine(id) {
    return axios.get(API_URL + `/domaine/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  saveCompetence(data) {
    return axios.post(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  updateCompetence(data) {
    return axios.put(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  deleteById(id) {
    return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
}

export default new CompetenceService();
