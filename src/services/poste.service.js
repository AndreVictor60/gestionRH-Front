import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/postes';

class PosteService {
    getAllPoste() {
        return axios.get(API_URL , { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getAllPosteByPage(page,size) {
        return axios.get(API_URL + `/${page}/${size}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getPosteById(id) {
        return axios.get(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    // Param ?name = ???
    getAllPosteByTypeContrat(idTypeContrat) {
        return axios.get(API_URL + `/typecontrat/${idTypeContrat}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getPosteByManager(idManager) {
        return axios.get(API_URL + `/manager/${idManager}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    getPosteByLieuTravail(idLieuTravail) {
        return axios.get(API_URL + `/adresse/${idLieuTravail}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    recherche(initilue) {
        return axios.get(API_URL + `/recherche?initilue=${initilue}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    rechercheDate(dateDebut,dateFin) {
        return axios.get(API_URL + `/rechercheDate?dateDebut=${dateDebut}&dateFin=${dateFin}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    countPoste() {
        return axios.get(API_URL+ `/count`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    savePoste(data) {
        return axios.post(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    updatePoste(data) {
        return axios.put(API_URL, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    deleteByIdPoste(id) {
        return axios.delete(API_URL + `/${id}`, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }

    uploadFile(data) {
        return axios.post(API_URL + `/save-file`, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*", "Content-Type": "multipart/form-data" } });
    }

    cloturerPoste(data) {
        return axios.put(API_URL + `/cloturer-poste`, data, { headers: { Authorization : authHeader(),"Access-Control-Allow-Origin": "*" } });
    }
}

export default new PosteService();
