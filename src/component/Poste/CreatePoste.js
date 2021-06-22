import { CButton, CSelect, CAlert } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SalariesService from "../../services/salaries.service";
import TitrePosteService from "../../services/titre-poste.service";
import PosteService from "../../services/poste.service";
import CompetenceService from "../../services/competence.service";
import TypeContratService from "../../services/type-contrat.service";
import EntrepriseService from "../../services/entreprises.service";
import DomainesService from "../../services/domaine.service";
import Select from 'react-select';
import swal from 'sweetalert';
import { compareDateStringWithDateCurrent, ifNumberWithDecimal } from "src/utils/fonctions";
class CreatePoste extends Component {
  constructor(props) {
    super(props);

    this.getAllSalarie = this.getAllSalarie.bind(this);
    this.getAllSalarieByDomaineAndCompetence = this.getAllSalarieByDomaineAndCompetence.bind(this);
    this.getAllSalarieWithoutPoste = this.getAllSalarieWithoutPoste.bind(this);
    this.getAllSalarieWithoutPosteByDomaineAndCompetence = this.getAllSalarieWithoutPosteByDomaineAndCompetence.bind(this);
    this.onChangeSalarie = this.onChangeSalarie.bind(this);
    this.onchangeSalarieSansPoste = this.onchangeSalarieSansPoste.bind(this);
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
    this.getAllCompetenceByDomaine = this.getAllCompetenceByDomaine.bind(this);
    this.onChangeFichierContrat = this.onChangeFichierContrat.bind(this);
    this.onChangeMaitreApprentissage = this.onChangeMaitreApprentissage.bind(this);
    this.ifSAlariePoste = this.ifSAlariePoste.bind(this);
    this.savePoste = this.savePoste.bind(this);

    this.getAllDomaine = this.getAllDomaine.bind(this);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);

    this.state = {
      errors: { dateFinInf: null, volumeNeg: null, extensionFichier: null, envoiFichier: null, dateInfAujDHui: null, salarieAcPoste: null },
      salaries: [],
      domaines: [],
      domainePoste: null,
      titresPoste: [],
      typesContrat: [],
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
      }
    };
  }

  componentDidMount() {
    this.getAllDomaine();
    //this.getAllSalarieWithoutPoste();
    this.getAllTitrePoste();
    this.getAllTypeContrat();
    this.getAllEntreprise();
    this.getAllManager();
    this.getAllMaitreApprentissage();
  }

  onChangeSalarie(e) {
    const idSalarie = e.target.value;
    this.ifSAlariePoste(idSalarie);
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
    console.log("salarie : ", this.state.salaries);
  }

  getAllSalarie() {
    SalariesService.getAll()
      .then(response => {
        this.setState({
          salaries: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllSalarieByDomaineAndCompetence(domaine, competence) {
    SalariesService.getAllSalariesByDomaineAndCompetence(domaine, competence.map(c => c.value))
      .then(response => {
        this.setState({
          salaries: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllSalarieWithoutPoste() {
    SalariesService.getAll()
      .then(response => {
        this.setState({
          salaries: response.data.filter(salarie => salarie.postes.length === 0 || (!compareDateStringWithDateCurrent(salarie.postes[0].dateFin) && salarie.postes[0].dateFin != null)),
        });
        console.log("salarie : ", this.state.salaries);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllSalarieWithoutPosteByDomaineAndCompetence(domaine, competence) {
    SalariesService.getAllSalariesWithoutPosteByDomaineAndCompetence(domaine, competence.map(c => c.value))
      .then(response => {
        this.setState({
          salaries: response.data,
        });
        console.log("salarie : ", this.state.salaries);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onchangeSalarieSansPoste() {
    //(e) if(e.target.checked){
    if (document.getElementById("salariesansposte").checked) {
      //tout les salaries
      this.getAllSalarieByDomaineAndCompetence(this.state.domainePoste, this.state.currentPoste.competencesRequises);
    }
    else {
      //salarie sans poste
      this.getAllSalarieWithoutPosteByDomaineAndCompetence(this.state.domainePoste, this.state.currentPoste.competencesRequises);
    }
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

  onChangeDomaine(e) {
    const idDomaine = e.target.value;
    if ("0" !== idDomaine) {
      document.getElementById('competenceFormPoste').className = "row";
      this.setState({
        domainePoste: idDomaine
      });
      //recupérer etat checkbox et appeler onchangeSalarieSansPoste(e)
      //this.onchangeSalarieSansPoste();
      this.getAllCompetenceByDomaine(idDomaine);
      console.log("domainePoste : ", this.state.domainePoste);
    } else {
      document.getElementById('competenceFormPoste').className = "row d-none";
      document.getElementById('bodyFormPoste').className = "form-group d-none";
      this.setState({
        currentPoste: {
          competencesRequises: null
        }
      });
    }
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
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeCompetence(e) {
    console.log("competence : ", e.length);
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
    /*CompetenceService.getAllCompetence().then((response) => {
      this.setState({ competences: response.data });
    })
    .catch((e) => { console.log(e) })*/
    console.log("if comp : ", idDomaine);
    if (idDomaine) {
      console.log("if comp 2 : ", idDomaine);
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
    const formData = new FormData();
    const infosalarie = this.state.salaries.find(o => o.id === idSalarie);
    const nomfichier = "contrat_" + infosalarie.nom + "_" + infosalarie.prenom + "_" + idPoste + ".pdf";

    formData.append('file', fichier);
    formData.append('name', nomfichier);
    formData.append('idPoste', idPoste);

    //formData.name = "contrat_"+infosalarie.nom+"_"+infosalarie.prenom+"_"+idPoste+".pdf";
    PosteService.uploadFile(formData)
      .then((response) => {
        console.log("message file : ", response.data.message);
        this.props.history.push("/poste/liste");
      })
      .catch((e) => {
        console.log("erreur file : ", e);
      });
  }

  ifSAlariePoste(idsalarie) {
    //console.log("idsalarie : ",idsalarie)
    if (idsalarie !== "0") {
      const salarie = this.state.salaries.find(salarie => salarie.id === parseInt(idsalarie));
      //console.log("salarie IF poste : ",this.state.salaries.find(salarie => salarie.id === parseInt(idsalarie)))
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

  savePoste(e) {
    e.preventDefault();
    //this.cloturerAncienPoste(this.state.currentPoste)
    //date fin obligatoire sauf CDI
    //ajouter champ "maitre d'apprentissage" dans poste de type salarieDto
    if (this.ifSAlariePoste(this.state.currentPoste.salarie.id)) {
      const salarie = this.state.salaries.find(salarie => salarie.id === parseInt(this.state.currentPoste.salarie.id));
      swal({
        title: "Êtes-vous sûre ?",
        text: salarie.nom + " " + salarie.prenom + " à déjà un poste. \nVoulez-vous cloturer se poste '" + salarie.postes[0].titrePoste.intitule + "' pour créer celui-ci ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            PosteService.cloturerPoste(salarie.postes[0]).then(resp => {
              swal("Le poste '" + salarie.postes[0].titrePoste.intitule + "' à bien été cloturé.", {
                icon: "success",
              });
              const json = JSON.stringify(this.state.currentPoste).split('"value":').join('"id":');
              const data = JSON.parse(json);
              const formData = new FormData();
              formData.append('contrat', this.state.fichierContratBrut);
              PosteService.savePoste(data).then((resp) => {
                console.log("response : ", resp);
                //titre : contrat_nom_prenom_idPoste.pdf
                this.uploadFile(this.state.fichierContratBrut, resp.data.salarie.id, resp.data.id);
              }).catch((e) => { console.log(e) })
            }).catch((e) => {
              swal(" " + e, {
                icon: "error",
              });
              console.log("erreur cloture de poste : ", e)
            })
          } else {
            swal("Le poste '" + salarie.postes[0].titrePoste.intitule + "' n'à pas été cloturé.");

          }
        });
    } else {
      const json = JSON.stringify(this.state.currentPoste).split('"value":').join('"id":');
      const data = JSON.parse(json);
      const formData = new FormData();
      formData.append('contrat', this.state.fichierContratBrut);
      PosteService.savePoste(data).then((resp) => {
        console.log("response : ", resp);
        //titre : contrat_nom_prenom_idPoste.pdf
        this.uploadFile(this.state.fichierContratBrut, resp.data.salarie.id, resp.data.id);
      }).catch((e) => { console.log(e) })
      //this.uploadFile(this.state.fichierContratBrut, 1, 100);
    }
  }

  render() {
    const { salaries, titresPoste, typesContrat, entreprises, managers, competences, maitresApprentissage, domaines } = this.state;
    //console.log(this.state.errors);
    return (
      <>
        <div className="submit-form">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="domainePoste">Domaine du poste *</label>
                <CSelect custom name="domainePoste" id="domainePoste" onChange={this.onChangeDomaine} required>
                  <option value="0">Veuillez sélectionner un Domaine</option>
                  {domaines.map((domaine, key) => (
                    <option key={key} value={domaine.id}>
                      {domaine.titre}
                    </option>
                  ))}
                </CSelect>
              </div>
            </div>
          </div>
          <form name="createPoste" onSubmit={this.savePoste} >
            <div className="row d-none" id="competenceFormPoste">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="competences">Compétences *</label>
                  <Select
                    name="competences"
                    placeholder="Liste des compétences"
                    value={this.state.currentPoste.competences}
                    options={competences.map((e) => ({ label: e.nom, value: e.id }))}
                    onChange={this.onChangeCompetence}
                    isMulti
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group d-none" id="bodyFormPoste">
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
                  <div className="form-group form-check">
                    <input type="checkbox" value="1" className="form-check-input" id="salariesansposte" onChange={this.onchangeSalarieSansPoste} />
                    <label className="form-check-label" htmlFor="salariesansposte">Afficher les salariés</label>
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
              {this.state.errors.salarieAcPoste != null ? <CAlert color="warning">{this.state.errors.salarieAcPoste}</CAlert> : ""}
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
                    <label htmlFor="dateDebut">Date de début *</label>
                    <input type="date" className="form-control" id="dateDebut" onChange={this.onChangeDateDebut} required />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateFin">Date de fin</label>
                    <input type="date" className="form-control" id="dateFin" onChange={this.onChangeDateFin} />
                  </div>
                </div>
              </div>
              {this.state.errors.dateFinInf != null ? <CAlert color="danger">{this.state.errors.dateFinInf}</CAlert> : ""}
              {this.state.errors.dateInfAujDHui != null ? <CAlert color="danger">{this.state.errors.dateInfAujDHui}</CAlert> : ""}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dateDebut">Volume horaire *</label>
                    <input type="number" className="form-control" id="volumeHoraire" onChange={this.onChangeVolumeHoraire} min={0} defaultValue={0} pattern="[0-9]*" required />
                    <div onChange={this.onChangeTypeHoraire} className="form-check">
                      <div className="form-check form-check-inline">
                        <input type="radio" value="J" name="typeHoraire" id="typeHoraireJ" className="form-check-input" required/>
                        <label className="form-check-label" htmlFor="typeHoraireJ">
                          Jour
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" value="H" name="typeHoraire" id="typeHoraireH" className="form-check-input" required defaultChecked/>
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
                    <CSelect custom name="maitreApprentissage" id="maitreApprentissage" onChange={this.onChangeMaitreApprentissage} required>
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
              {this.state.errors.extensionFichier != null ? <CAlert color="danger">{this.state.errors.extensionFichier}</CAlert> : ""}
              <CButton type="submit" block color="info">
                Créer le poste
              </CButton>
            </div>
          </form>
        </div>
      </>
    )

  }
}
export default withRouter(CreatePoste);
