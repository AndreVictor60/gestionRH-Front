import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/formations';

class FormationService {
    getAllFormationByPage(page,size) {
        return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getFormationById(id){
        return axios.get(API_URL + `/${id}` , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getFormationPeriodByPage(page,size,dateDebut,dateFin){
        return axios.get(API_URL + `/period/${page}/${size}`, {params: {firstDate: dateDebut,lastDate: dateFin},headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllFormationEnCours(page,size) {
        return axios.get(API_URL + `/encours/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllFormationNonCommence(page,size) {
        return axios.get(API_URL + `/noncommence/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllFormationByIdCompetence(idCompetence) {
        return axios.get(API_URL + `/competence/${idCompetence}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllFormationByDate(date) {
        return axios.get(API_URL + `/date?date=${date}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllFormationByPeriode(dateDebut,dateFin) {
        return axios.get(API_URL+ `/date?dateDebut=${dateDebut}&dateFin=${dateFin}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getSalarieByIdFormation(idFormation) {
        return axios.get(API_URL + `/${idFormation}/salaries` , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    countFormation(dateDebut,dateFin) {
        return axios.get(API_URL + `/count`, { params: {firstDate: dateDebut,lastDate: dateFin}, headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    save(data) {
        return axios.post(API_URL,data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    update(data){
        return axios.put(API_URL,data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    delete(id){
        return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }
}

export default new FormationService();
