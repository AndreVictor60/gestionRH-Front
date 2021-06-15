import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/roles';

class RoleService {
  getAllRoles() {
    return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllRolesPage(page,size) {
    return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getAllRolesPageAndKeyword(page,size,search) {
    return axios.get(API_URL + `/${page}/${size}/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getRoleById(id) {
    return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  getRoleByName(recherche) {
    return axios.get(API_URL + `/search?name=${recherche}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  countRole(search) {
    return axios.get(API_URL + `/count/${search}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  saveRole(data) {
    return axios.post(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  updateRole(data) {
    return axios.put(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
  deleteById(id) {
    return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
  }
}

export default new RoleService();
