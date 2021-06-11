import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/compterendus';

class CompteRenduService {

  getCompteRenduById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getCompteRenduByEntretien(idEntretien){
    return axios.get(API_URL + `/entretien/${idEntretien}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }

  getCompteRenduByManager(idManager){
    return axios.get(API_URL + `/manager/${idManager}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }

  getCompteRenduBySalarie(idSalarie){
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

export default new CompteRenduService();
