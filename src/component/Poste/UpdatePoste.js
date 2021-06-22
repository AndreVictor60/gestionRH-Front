import { CButton, CSelect, CAlert } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SalariesService from "../../services/salaries.service";
import PosteService from "../../services/poste.service";
import CompetenceService from "../../services/competence.service";
import EntrepriseService from "../../services/entreprises.service";
import DomainesService from "../../services/domaine.service";
import Select from 'react-select';
import swal from 'sweetalert';
import { compareDateStringWithDateCurrent, ifNumberWithDecimal } from "src/utils/fonctions";
/*import PDFViewer from "../PDF/PDFViewer";
import AllPagesPDFViewer from "../PDF/all-pages-pdf";
import samplePDF from "src/assets/contrat/contrat_Herduin_Corentin_1.pdf";*/
import "./styles.css";

class UpdatePoste extends Component {
  constructor(props) {
    super(props);
    this.onChangeDateDebut = this.onChangeDateDebut.bind(this);
    this.onChangeDateFin = this.onChangeDateFin.bind(this);
    this.onChangeVolumeHoraire = this.onChangeVolumeHoraire.bind(this);
    this.onChangeTypeHoraire = this.onChangeTypeHoraire.bind(this);
    this.onChangeEntreprise = this.onChangeEntreprise.bind(this);
    this.onChangeManager = this.onChangeManager.bind(this);
    this.onGetPoste = this.onGetPoste.bind(this);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.getAllCompetenceByDomaine = this.getAllCompetenceByDomaine.bind(this);
    this.onChangeFichierContrat = this.onChangeFichierContrat.bind(this);
    this.onChangeMaitreApprentissage = this.onChangeMaitreApprentissage.bind(this);
    this.ifSAlariePoste = this.ifSAlariePoste.bind(this);
    this.updatePoste = this.updatePoste.bind(this);
    this.getAllDomaine = this.getAllDomaine.bind(this);

    this.state = {
      posteId: this.props.posteId.id,
      //samplePDF: "src/assets/contrat/contrat_Herduin_Corentin_3.pdf",
      errors: { dateFinInf: null, volumeNeg: null, extensionFichier: null, envoiFichier: null, dateInfAujDHui: null, salarieAcPoste: null },
      domaines: [],
      domainePoste: null,
      entreprises: [],
      managers: [],
      maitresApprentissage: [],
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
        competencesRequises: [],
        maitreApprentissage: {
          id: null
        },
      },
      currentPosteOld: {
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
        competencesRequises: [],
        maitreApprentissage: {
          id: null
        },
      }
    };

  }

  componentDidMount() {
    this.onGetPoste(this.props.posteId.id);
    this.getAllDomaine();
    this.getAllEntreprise();
    this.getAllManager();
    this.getAllMaitreApprentissage();
  }

  onGetPoste(id) {
    PosteService.getPosteById(id)
      .then(response => {
        this.setState({
          currentPoste: response.data,
          currentPosteOld: response.data
        });
        console.log("data : ", response.data);
        this.setState({
          domainePoste: this.sortByFrequency(response.data.competencesRequises.map(comp => comp.domaines.map(dom => dom.id)))[0]
        });
        this.getAllCompetenceByDomaine(this.sortByFrequency(response.data.competencesRequises.map(comp => comp.domaines.map(dom => dom.id)))[0]);
      })
      .catch(e => {
        console.log(e);
      });
  }





  getAllDomaine() {
    DomainesService.getAllDomaine()
      .then(response => {
        this.setState({
          domaines: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }



  onChangeCompetence(e) {
    console.log("competence : ", e);
    if (e.length > 0) {
      this.setState((prevState) => ({
        currentPoste: {
          ...prevState.currentPoste,
          competencesRequises: e
        }
      }));
      document.getElementById('bodyFormPoste').className = "form-group";
      //this.onchangeSalarieSansPoste();
      //console.log("COMP : domaine : ",this.state.domainePoste," || competence : ", e);
      this.getAllSalarieWithoutPosteByDomaineAndCompetence(this.state.domainePoste, e)
    } else {
      document.getElementById('bodyFormPoste').className = "form-group d-none";
    }
  }
  getAllCompetenceByDomaine(idDomaine) {
    if (idDomaine) {
      CompetenceService.getCompetenceByIdDomaine(parseInt(idDomaine)).then((response) => {
        this.setState({ competences: response.data });

      })
        .catch((e) => { console.log(e) })
    } else {
      console.log("else comp 2 : ", this.state.domainePoste);
      CompetenceService.getCompetenceByIdDomaine(0).then((response) => {
        this.setState({ competences: response.data });
      })
        .catch((e) => { console.log(e) })
    }
  }

  onChangeDateDebut(e) {
    const dateDebut = e.target.value;
    if (0 !== dateDebut.length) {
      if (compareDateStringWithDateCurrent(dateDebut)) {
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            dateDebut: dateDebut,
          },
          errors: {
            ...prevState.errors,
            dateFinInf: null,
            dateInfAujDHui: null,
          }
        }));
        if (this.state.currentPoste.dateFin !== null && this.state.currentPoste.dateFin < dateDebut) {
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              dateFinInf: "La date de fin ne doit pas être inferieur à la date de début.",
            }
          }));
        }
      }
      else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            dateInfAujDHui: "La date ne peut pas être inferieur à aujourd'hui.",
          }
        }));
      }
    }
  }

  onChangeDateFin(e) {
    const dateFin = e.target.value;
    if (0 !== dateFin.length) {
      if (compareDateStringWithDateCurrent(dateFin)) {
        this.setState((prevState) => ({
          currentPoste: {
            ...prevState.currentPoste,
            dateFin: dateFin,
          },
          errors: {
            ...prevState.errors,
            dateFinInf: null,
            dateInfAujDHui: null,
          }
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            dateInfAujDHui: "La date ne peut pas être inferieur à aujourd'hui.",
          }
        }));
      }
      if (this.state.currentPoste.dateDebut !== null && this.state.currentPoste.dateDebut > dateFin) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            dateFinInf: "La date de fin ne doit pas être inferieur à la date de début.",
          }
        }));
      }
    }
  }

  onChangeVolumeHoraire(e) {
    let Volume = null;
    if (e.target === undefined) {
      console.log("e undifined : ", e)
      Volume = parseInt(e);
    }
    else {
      console.log("e difined : ", e.target.value)
      Volume = parseInt(e.target.value);
    }

    console.log("onChangeVolumeHoraire : ", Volume, " || type : ", this.state.typeHoraire);
    if (ifNumberWithDecimal(Volume)) {
      if (Volume > 0) {
        if (this.state.typeHoraire === "H") {
          this.setState((prevState) => ({
            currentPoste: {
              ...prevState.currentPoste,
              volumeHoraire: Volume,
              volumeJournalier: 0.0,
            },
            errors: {
              ...prevState.errors,
              volumeNeg: null,
            }
          }));
        }
        else {
          this.setState((prevState) => ({
            currentPoste: {
              ...prevState.currentPoste,
              volumeHoraire: 0.0,
              volumeJournalier: Volume,
            },
            errors: {
              ...prevState.errors,
              volumeNeg: null,
            }
          }));
        }
      }
      else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            volumeNeg: "Le volume horaire ne doit pas être négative.",
          }
        }));
      }
    }
    else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          volumeNeg: "Le volume horaire doit être un chiffre.",
        }
      }));
    }
  }

  onChangeTypeHoraire(e) {
    const typeHoraire = e.target.value;
    //h0 j1
    if (0 !== typeHoraire.length) {
      this.setState({ typeHoraire: typeHoraire }, () => {
        console.log("onChangeTypeHoraire : heure : ", this.state.currentPoste.volumeHoraire, " || jour : ", this.state.currentPoste.volumeJournalier);
        this.state.currentPoste.volumeHoraire === null ? this.onChangeVolumeHoraire(this.state.currentPoste.volumeJournalier) : this.onChangeVolumeHoraire(this.state.currentPoste.volumeHoraire);
      })
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
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeMaitreApprentissage(e) {
    const idMaitresApprentissage = e.target.value;
    console.log("maitre apprenti : ", idMaitresApprentissage);
    if (0 !== idMaitresApprentissage) {
      this.setState((prevState) => ({
        currentPoste: {
          ...prevState.currentPoste,
          maitreApprentissage: {
            id: idMaitresApprentissage
          }
        }
      }));
    }
  }
  getAllMaitreApprentissage() {
    SalariesService.getAll()
      .then(response => {
        this.setState({
          maitresApprentissage: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeFichierContrat(e) {
    const nomfichier = e.target.files[0].name.split(' ').join('-');
    if (e.target.files[0].type.match("application/pdf")) {
      this.setState((prevState) => ({
        currentPoste: {
          ...prevState.currentPoste,
          fichierContrat: nomfichier
        }
      }));
      this.setState((prevState) => ({ fichierContratBrut: e.target.files[0] }));
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          extensionFichier: "Seul les PDF sont acceptés.",
        }
      }));
    }
  }

  uploadFile(fichier, idSalarie, idPoste) {
    console.log("upload : fichier : ", fichier, " || idsalarie : ", idSalarie, " || idposte : ", idPoste);
    const formData = new FormData();
    let infosalarie = null;
    SalariesService.getSalarieById(idSalarie)
      .then(response => {
        infosalarie = response.data;
        console.log("infosalarie : ", infosalarie);
        const nomfichier = "contrat_" + infosalarie.nom + "_" + infosalarie.prenom + "_" + idPoste + ".pdf";

        formData.append('file', fichier);
        formData.append('name', nomfichier);
        formData.append('idPoste', idPoste);

        //formData.name = "contrat_"+infosalarie.nom+"_"+infosalarie.prenom+"_"+idPoste+".pdf";
        PosteService.uploadFile(formData)
          .then((response) => {
            console.log("message file : ", response.data.message);
          })
          .catch((e) => {
            console.log("erreur file : ", e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  ifSAlariePoste(idsalarie) {
    console.log("idsalarie : ", typeof (idsalarie))
    if (idsalarie !== "0") {
      const salarie = this.state.salaries.find(salarie => salarie.id === parseInt(idsalarie));
      if (salarie.postes.length === 0) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            salarieAcPoste: null,
          }
        }));
        return false; //n'a pas de poste
      }
      else {
        if (compareDateStringWithDateCurrent(salarie.postes[0].dateFin) || salarie.postes[0].dateFin === null) {
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              salarieAcPoste: "Le salarié à un poste en cours",
            }
          }));
          return true; //a un poste
        } else {
          this.setState((prevState) => ({
            errors: {
              ...prevState.errors,
              salarieAcPoste: null,
            }
          }));
        }
      }
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          salarieAcPoste: null,
        }
      }));
      return false; //n'a pas de poste
    }
  }

  sortByFrequency(arr) {
    const frequency = {};
    arr.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    const sortable = arr.map(item => [item, frequency[item]]);
    sortable.sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];
      return b[1] - a[1];
    });
    return sortable.map(s => s[0]);
  }

  updatePoste(e) {
    //TODO: Si le salarié est changé voir s'il a un poste
    e.preventDefault();
    const json = JSON.stringify(this.state.currentPoste).split('"value":').join('"id":');
    const data = JSON.parse(json);
    const formData = new FormData();
    formData.append('contrat', this.state.fichierContratBrut);
    console.log("data update", data);

    if (this.state.fichierContratBrut) {
      PosteService.updatePoste(data).then((resp) => {
        console.log("response : ", resp);
        //titre : contrat_nom_prenom_idPoste.pdf
        this.uploadFile(this.state.fichierContratBrut, resp.data.salarie.id, resp.data.id);
        this.props.history.push("/poste/liste");
      }).catch((e) => { console.log("erreur update if : ", e) })
    } else {
      PosteService.updatePoste(data).then((resp) => {
        console.log("response : ", resp);
        this.props.history.push("/poste/liste");
      }).catch((e) => { console.log("erreur update else : ", e) })
    }

  }

  render() {
    const { entreprises, managers, competences, maitresApprentissage, currentPoste, domaines, domainePoste } = this.state;
    console.log("heure : ", currentPoste.volumeHoraire, " || jour : ", currentPoste.volumeJournalier);
    /*const pdflink = import('src/assets/contrat/contrat_Herduin_Corentin_1.pdf').then((resp) => {return resp.default});
    console.log("pdflink : ", pdflink);*/
    return (
      <>
        <div className="submit-form">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="domainePoste">Domaine du poste *</label>
                <CSelect custom name="domainePoste" id="domainePoste" disabled required>
                  <option value="0">Veuillez sélectionner un Domaine</option>
                  {domaines.map((domaine, key) => (
                    parseInt(domainePoste) === parseInt(domaine.id) ?
                      <option defaultValue key={key} selected={domaine.id}>
                        {domaine.titre}
                      </option>
                      : ""
                  ))}
                </CSelect>
              </div>
            </div>
          </div>
          <form name="createPoste" onSubmit={this.updatePoste} >
            <div className="row" id="competenceFormPoste">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="competences">Compétences *</label>

                  <Select
                    name="competences"
                    placeholder="Liste des compétences"
                    value={
                      currentPoste.competencesRequises === null
                        ? ""
                        : currentPoste.competencesRequises
                    }
                    getOptionLabel={(option) => option.nom}
                    getOptionValue={(option) => option.id}
                    options={competences.map((e) => ({ nom: e.nom, id: e.id }))}
                    onChange={this.onChangeCompetence}
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div className="form-group" id="bodyFormPoste">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="salarie">Salarié *</label>
                    <CSelect custom name="salarie" id="salarie" disabled required
                      value={
                        currentPoste.salarie.id === null
                          ? 0
                          : currentPoste.salarie.id
                      }
                    >
                      <option defaultValue value={currentPoste.salarie.id}>
                        {currentPoste.salarie.nom + " " + currentPoste.salarie.prenom}
                      </option>
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="typeContrat">Type de contrat *</label>
                    <CSelect custom name="typeContrat" id="typeContrat" disabled required>
                      <option value={currentPoste.typeContrat.id}>
                        {currentPoste.typeContrat.type}
                      </option>
                    </CSelect>
                  </div>
                </div>
              </div>
              {this.state.errors.salarieAcPoste != null ? <CAlert color="warning">{this.state.errors.salarieAcPoste}</CAlert> : ""}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="titrePoste">Intitulé de poste *</label>
                    <CSelect custom name="titrePoste" id="titrePoste" disabled required>
                      <option value={currentPoste.titrePoste.id}>
                        {currentPoste.titrePoste.intitule}
                      </option>
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateDebut">Date de début *</label>
                    <input type="date" className="form-control" id="dateDebut" onChange={this.onChangeDateDebut} required
                      value={
                        currentPoste.dateDebut === null
                          ? ""
                          : currentPoste.dateDebut
                      } />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateFin">Date de fin</label>
                    <input type="date" className="form-control" id="dateFin" onChange={this.onChangeDateFin}
                      value={
                        currentPoste.dateFin === null
                          ? ""
                          : currentPoste.dateFin
                      }
                    />
                  </div>
                </div>
              </div>
              {this.state.errors.dateFinInf != null ? <CAlert color="danger">{this.state.errors.dateFinInf}</CAlert> : ""}
              {this.state.errors.dateInfAujDHui != null ? <CAlert color="danger">{this.state.errors.dateInfAujDHui}</CAlert> : ""}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateDebut">Volume horaire *</label>
                    <input type="number" className="form-control" id="volumeHoraire" onChange={this.onChangeVolumeHoraire} min={0} defaultValue={0} pattern="[0-9]*" required
                      value={
                        currentPoste.volumeHoraire === null || currentPoste.volumeHoraire === 0
                          ? currentPoste.volumeJournalier === null || currentPoste.volumeJournalier === 0 ? "" : currentPoste.volumeJournalier
                          : currentPoste.volumeHoraire
                      }
                    />
                    <div onChange={this.onChangeTypeHoraire} className="form-check">
                      <div className="form-check form-check-inline">
                        <input type="radio" value="J" name="typeHoraire" id="typeHoraireJ" className="form-check-input" required checked={currentPoste.volumeJournalier !== 0} />
                        <label className="form-check-label" htmlFor="typeHoraireJ">
                          Jour
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" value="H" name="typeHoraire" id="typeHoraireH" className="form-check-input" required checked={currentPoste.volumeHoraire !== 0} />
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
                    <CSelect custom name="entreprise" id="entreprise" onChange={this.onChangeEntreprise} required
                      value={
                        currentPoste.lieuTravail.id === null
                          ? 0
                          : currentPoste.lieuTravail.id
                      }
                    >
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
                    <CSelect custom name="manager" id="manager" onChange={this.onChangeManager} required
                      value={
                        currentPoste.manager === null
                          ? 0
                          : currentPoste.manager.id
                      }
                    >
                      <option value="0">Veuillez sélectionner un Manageur</option>
                      {managers.map((manager, key) => (
                        <option key={key} value={manager.id}>
                          {manager.nom + " " + manager.prenom}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="maitreApprentissage">Maitre d'apprentissage</label>
                    <CSelect custom name="maitreApprentissage" id="maitreApprentissage" onChange={this.onChangeMaitreApprentissage} required
                      value={
                        currentPoste.maitreApprentissage === null || currentPoste.maitreApprentissage === undefined
                          ? 0
                          : currentPoste.maitreApprentissage.id
                      }
                    >
                      <option value="0">Veuillez sélectionner un maitre d'apprentissage</option>
                      {maitresApprentissage.map((maitreApprentissage, key) => (
                        <option key={key} value={maitreApprentissage.id}>
                          {maitreApprentissage.nom + " " + maitreApprentissage.prenom}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contrat">Contrat (PDF) *</label>
                <input type="file" id="contrat" name="contrat" className="form-control-file" onChange={this.onChangeFichierContrat} accept="application/pdf" />
              </div>
              <a href={"C:/tempBidon/" + currentPoste.fichierContrat} className="font-weight-bold"> Contrat actuel </a>
              {/*<div className="all-page-container">
                <AllPagesPDFViewer pdf={pdflink} />
              </div>
              <div>
                <PDFViewer />
              </div>*/}
              {this.state.errors.extensionFichier != null ? <CAlert color="danger">{this.state.errors.extensionFichier}</CAlert> : ""}
              <CButton type="submit" block color="info">
                Modfier le poste
              </CButton>
            </div>
          </form>
        </div>

      </>
    )
  }
}
export default withRouter(UpdatePoste);
