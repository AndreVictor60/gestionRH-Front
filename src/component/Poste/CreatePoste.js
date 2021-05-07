import { CButton, CSelect, CAlert } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SalariesService from "../../services/salaries.service";
import TitrePosteService from "../../services/titre-poste.service";
import PosteService from "../../services/poste.service";
import CompetenceService from "../../services/competence.service";
import TypeContratService from "../../services/type-contrat.service";
import EntrepriseService from "../../services/entreprises.service";
import Select from 'react-select';
class CreatePoste extends Component {
    constructor(props){
        super(props);
        this.getAllSalarie = this.getAllSalarie.bind(this);
        this.onChangeSalarie = this.onChangeSalarie.bind(this);
        this.getAllTitrePoste = this.getAllTitrePoste.bind(this);
        this.onChangeTitrePoste = this.onChangeTitrePoste.bind(this);
        this.getAllTypeContrat = this.getAllTypeContrat.bind(this);
        this.onChangeTypeContrat = this.onChangeTypeContrat.bind(this);
        this.onChangeDateDebut = this.onChangeDateDebut.bind(this);
        this.onChangeDateFin = this.onChangeDateFin.bind(this);
        this.onChangeVolumeHoraire = this.onChangeVolumeHoraire.bind(this);
        this.onChangeTypeHoraire = this.onChangeTypeHoraire.bind(this);
        this.onChangeEntreprise = this.onChangeEntreprise.bind(this);
        this.onChangeManager = this.onChangeManager.bind(this);
        this.onChangeCompetence = this.onChangeCompetence.bind(this);
        this.onChangeFichierContrat = this.onChangeFichierContrat.bind(this);
        this.savePoste = this.savePoste.bind(this);

        this.state = {
            errors: {dateFinInf: null, volumeNeg: null, extensionFichier: null, envoiFichier: null},
            salaries: [],
            titresPoste: [],
            typesContrat: [],
            entreprises: [],
            managers: [],
            multiValue: [],
            typeHoraire: 0,
            competences: [],
            fichierContratBrut: null,
            currentPoste: {
              id: null,
              dateDebut: null,
              dateFin: null,
              volumeHoraire: null,
              volumeJournalier: null,
              fichierContrat: null,
              titrePoste: {
                id: null
              },
              salarie: {
                id: null
              },
              typeContrat: {
                id: null
              },
              manager: {
                id: null
              },
              lieuTravail: {
                id: null
              },
              competences: [],
            }
        };
    }

    componentDidMount() {
        this.getAllSalarie();
        this.getAllTitrePoste();
        this.getAllTypeContrat();
        this.getAllEntreprise();
        this.getAllManager();
        this.getAllCompetence();
    }

    

    onChangeSalarie(e) {
      const idSalarie = e.target.value;
      if (0 !== idSalarie) {
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            salarie: {
              id: idSalarie
            }
          }
        }));
      }
    }
    getAllSalarie() {
        SalariesService.getAll()
        .then(response => {
          this.setState({
            salaries: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    onChangeTitrePoste(e) {
        const idTitrePoste = e.target.value;
        if (0 !== idTitrePoste) {
          this.setState((prevState) => ({
            currentPoste: {
              ...prevState.currentPoste,
              titrePoste: {
                id: idTitrePoste
              }
            }
          }));
        }
    }
    getAllTitrePoste() {
        TitrePosteService.getAllTitrePoste()
          .then(response => {
            this.setState({
              titresPoste: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeTypeContrat(e) {
        const idTypeContrat = e.target.value;
        if (0 !== idTypeContrat) {
          this.setState((prevState) => ({
            currentPoste: {
              ...prevState.currentPoste,
              typeContrat: {
                id: idTypeContrat
              }
            }
          }));
        }
    }
    getAllTypeContrat() {
        TypeContratService.getAllTypeContrat()
          .then(response => {
            this.setState({
              typesContrat: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeCompetence(e) {
      console.log(e);
      this.setState((prevState) => ({
        currentPoste: {
          ...prevState.currentPoste,
          competences: e
        }
      }))
      
    }
    getAllCompetence(){
      CompetenceService.getAllCompetence().then((response) => {
        this.setState({ competences: response.data });
      })
      .catch((e) => { console.log(e) })
    }

    onChangeDateDebut(e) {
      const dateDebut = e.target.value;
      if (0 !== dateDebut.length) {
        this.setState((prevState) => ({
        currentPoste: {
            ...prevState.currentPoste,
            dateDebut: dateDebut,
        },
        errors: {
          ...prevState.errors,
          dateFinInf: null,
        }
        }));
        if(this.state.currentPoste.dateFin !== null && this.state.currentPoste.dateFin<dateDebut)
        {
            this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                dateFinInf: "La date de fin ne doit pas être inferieur à la date de début.",
            }
          }));
        }
      }

     }
    
    onChangeDateFin(e) {
      const dateFin = e.target.value;
      if (0 !== dateFin.length) {
        this.setState((prevState) => ({
        currentPoste: {
            ...prevState.currentPoste,
            dateFin: dateFin,
        },
        errors: {
          ...prevState.errors,
          dateFinInf: null,
        }
        }));
      }
      if(this.state.currentPoste.dateDebut !== null && this.state.currentPoste.dateDebut>dateFin)
      {
          this.setState((prevState) => ({
          errors: {
              ...prevState.errors,
              dateFinInf: "La date de fin ne doit pas être inferieur à la date de début.",
          }
        }));
      }
    }

    onChangeVolumeHoraire(e) {
        const VolumeHoraire = e.target.value;
        //console.log("VolumeHoraire : ",VolumeHoraire,"typehoraire (0H, 1J) : ",this.state.typeHoraire);
        if(VolumeHoraire>0){
          if(this.state.typeHoraire === 0){
              this.setState((prevState) => ({
                  currentPoste: {
                      ...prevState.currentPoste,
                      volumeHoraire: VolumeHoraire,
                      volumeJournalier: 0.0,
                  },
                  errors: {
                    ...prevState.errors,
                    volumeNeg: null,
                  }
              }));
          }
          else{
              this.setState((prevState) => ({
                  currentPoste: {
                      ...prevState.currentPoste,
                      volumeHoraire: 0.0,
                      volumeJournalier: VolumeHoraire,
                  },
                  errors: {
                    ...prevState.errors,
                    volumeNeg: null,
                  }
              }));
          }
        }
        else{
          this.setState((prevState) => ({
          errors: {
              ...prevState.errors,
              volumeNeg: "Le volume horaire ne doit pas être négative.",
          }
        }));
      }
        //console.log("typehoraire (0H, 1J) : ",this.state.typeHoraire+" || volumeJournalier : "+this.state.currentPoste.volumeJournalier+" || volumeHoraire : "+this.state.currentPoste.volumeHoraire);
    }

    onChangeTypeHoraire(e) {
        const typeHoraire = e.target.value;
        //h0 j1
        //console.log("typeHoraire : ",typeHoraire);
        if (0 !== typeHoraire.length) {
            this.setState({ typeHoraire: typeHoraire });
        }
    }

    onChangeEntreprise(e) {
      const idEntreprise = e.target.value;
      if (0 !== idEntreprise) {
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            lieuTravail: {
              id: idEntreprise
            }
          }
        }));
      }
    }
    getAllEntreprise() {
      EntrepriseService.getAllEntreprises()
          .then(response => {
            this.setState({
              entreprises: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeManager(e) {
      const idManager = e.target.value;
      if (0 !== idManager) {
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            manager: {
              id: idManager
            }
          }
        }));
      }
    }
    getAllManager() {
      SalariesService.getAll()
          .then(response => {
            this.setState({
              managers: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    onChangeFichierContrat(e){
      // Update the state
      console.log("fichier : ",e.target.files[0]);
      const nomfichier = e.target.files[0].name.split(' ').join('-');
      if(e.target.files[0].type.match("application/pdf")){
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            fichierContrat:  nomfichier 
          }
        })); 
        this.setState((prevState) => ({fichierContratBrut: e.target.files[0]}));
        //this.uploadFile(e.target.files[0]);
      }else{
        this.setState((prevState) => ({
          errors: {
              ...prevState.errors,
              extensionFichier: "Seul les PDF sont acceptés.",
          }
        }));
      }
    }

    uploadFile(fichier, idSalarie, idPoste){
      const formData = new FormData();
      console.log("fichier PDF : ",fichier);
      const infosalarie=this.state.salaries.find(o => o.id === idSalarie);
      const nomfichier = "contrat_"+infosalarie.nom+"_"+infosalarie.prenom+"_"+idPoste+".pdf";

      formData.append('file', fichier);
      formData.append('name', nomfichier);
      
      console.log("formdata PDF : ",formData);

      //formData.name = "contrat_"+infosalarie.nom+"_"+infosalarie.prenom+"_"+idPoste+".pdf";
      PosteService.uploadFile(formData)
      .then((response) => {
        console.log("message file : ",response.data.message);
      })
      .catch((e) => {
        console.log("erreur file : ",e);
      });
    }

    savePoste() {
      //date fin obligatoire sauf CDI
      //ajouter champ "maitre d'apprentissage" dans poste de type salarieDto
      const json = JSON.stringify(this.state.currentPoste).split('"value":').join('"id":');
      console.log("json : ",json);
      const data = JSON.parse(json);
      const formData = new FormData();
      console.log("data : ",data);
      console.log("fichier pdf save : ",this.state.fichierContratBrut);
      formData.append('contrat', this.state.fichierContratBrut);
      console.log("formdata : ",formData);
      PosteService.savePoste(data).then((resp) => {
        console.log("response : ",resp);
        //titre : contrat_nom_prenom_idPoste.pdf
        this.uploadFile(this.state.fichierContratBrut, resp.data.salarie.id, resp.data.id);
      }).catch((e) => { console.log(e)})
      //this.uploadFile(this.state.fichierContratBrut, 1, 100);
    }

    render() {
        const {salaries, titresPoste, typesContrat, entreprises, managers, competences} = this.state;
        console.log(this.state.errors);
        return (
            <div className="submit-form">
            <div>
            <form>
            <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="salarie">Salarié *</label>
                    <CSelect custom name="salarie" id="salarie" onChange={this.onChangeSalarie} required>
                      <option value="0">Veuillez sélectionner un salarié</option>
                      {salaries.map((salarie, key) => (
                        <option key={key} value={salarie.id}>
                          {salarie.nom + " " + salarie.prenom}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="titrePoste">Intitulé de poste *</label>
                    <CSelect custom name="titrePoste" id="titrePoste" onChange={this.onChangeTitrePoste} required>
                      <option value="0">Veuillez sélectionner un intitulé de poste</option>
                      {titresPoste.map((titrePoste, key) => (
                        <option key={key} value={titrePoste.id}>
                          {titrePoste.intitule}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="typeContrat">Type de contrat *</label>
                    <CSelect custom name="typeContrat" id="typeContrat" onChange={this.onChangeTypeContrat} required>
                      <option value="0">Veuillez sélectionner un type de contrat</option>
                      {typesContrat.map((typeContrat, key) => (
                        <option key={key} value={typeContrat.id}>
                          {typeContrat.type}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <div className="form-group">
                <label htmlFor="skills">Compétences</label>
                  <Select 
                  name="competences"
                  placeholder="Liste des compétences"
                  value={this.state.currentPoste.competences}
                  options={competences.map(e => ({ label: e.nom, value: e.id}))}
                  onChange={this.onChangeCompetence}
                  isMulti
                  />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateDebut">Date de début *</label>
                    <input type="date" className="form-control" id="dateDebut" onChange={this.onChangeDateDebut} required />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateFin">Date de fin</label>
                    <input type="date" className="form-control" id="dateFin" onChange={this.onChangeDateFin}/>
                  </div>
                </div>
              </div>
              {this.state.errors.dateFinInf != null ? <CAlert color="danger">{this.state.errors.dateFinInf}</CAlert> : ""}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateDebut">Volume horaire *</label>
                    <input type="number" className="form-control" id="volumeHoraire" onChange={this.onChangeVolumeHoraire} min={0} defaultValue={0} required />
                    <div onChange={this.onChangeTypeHoraire} className="form-check">
                      <div className="form-check form-check-inline">
                        <input type="radio" value="1" name="typeHoraire" id="typeHoraireJ" className="form-check-input" required /> 
                        <label className="form-check-label" htmlFor="typeHoraireJ">
                          Jour
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" value="0" name="typeHoraire" id="typeHoraireH" className="form-check-input" required defaultChecked /> 
                        <label className="form-check-label" htmlFor="typeHoraireH">
                          Heure
                        </label>
                      </div>
                    </div>
                  </div>
                  {this.state.errors.volumeNeg != null ? <CAlert color="danger">{this.state.errors.volumeNeg}</CAlert> : ""}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="entreprise">Entreprise *</label>
                    <CSelect custom name="entreprise" id="entreprise" onChange={this.onChangeEntreprise} required>
                      <option value="0">Veuillez sélectionner une entreprise</option>
                      {entreprises.map((entreprise, key) => (
                        <option key={key} value={entreprise.id}>
                          {entreprise.nom}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="manager">Manager</label>
                    <CSelect custom name="manager" id="manager" onChange={this.onChangeManager} required>
                      <option value="0">Veuillez sélectionner un Manageur</option>
                      {managers.map((manager, key) => (
                        <option key={key} value={manager.id}>
                          {manager.nom+" "+manager.prenom}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="contrat">Contrat (PDF)</label>
                    <input type="file" id="contrat" name="contrat" onChange={this.onChangeFichierContrat} accept="application/pdf"/>
                  </div>
                </div>
              </div>
              {this.state.errors.extensionFichier != null ? <CAlert color="danger">{this.state.errors.extensionFichier}</CAlert> : ""}
            </form>
            <CButton type="submit" block  color="info" onClick={this.savePoste}>
                Ajout d'un salarié
            </CButton>
            </div>
        </div>
        )
    }
}
export default withRouter(CreatePoste);
