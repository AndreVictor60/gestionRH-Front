import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/domaines';

class DomaineService {
  /**
   * @returns Retourne tout les domaines disponnibles
   */
  getAllDomaine() {
    return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  /**
   * @param {*} page Nombre de la page
   * @param {*} size Taille de la page
   * @returns Retourne la liste des domaines par page et taille
   */
  getAllDomaineByPage(page,size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }

  getAllDomaineByPageAndKeyword(page,size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getDomaineById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getDomaineByName(recherche) {
    return axios.get(API_URL + `/search?name=${recherche}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  countDomaine(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
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

export default new DomaineService();
