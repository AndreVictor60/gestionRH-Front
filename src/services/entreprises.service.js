import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/entreprises';

class EntreprisesService {
    getAllEntreprises() {
        return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }
    /**
    * @param {*} page Nombre de la page
    * @param {*} size Taille de la page
    * @returns Retourne la liste des entreprises par page et taille
     */
    getAllEntreprisesPage(page,size) {
        return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getEntrepriseById(id) {
        return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    // Param ?name = ???
    getEntrepriseByName(name) {
        return axios.get(API_URL + `/search?name=${name}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getEntrepriseByAdresse(id) {
        return axios.get(API_URL + `/adresse/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    countEntreprise() {
        return axios.get(API_URL, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
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

export default new EntreprisesService();
