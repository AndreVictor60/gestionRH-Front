import { CAlert, CButton, CSelect } from "@coreui/react";
import moment from "moment";
import React, { Component } from "react";
import Select from "react-select";
import competenceService from "src/services/competence.service";
import domaineService from "src/services/domaine.service";
import formationsService from "src/services/formations.service";
import { compareDateStringWithDateCurrent, compareTwoDateString, ifNumberWithDecimal,ifNumber,isValidDate } from "src/utils/fonctions";
import { withRouter } from "react-router-dom";

export class CreateFormation extends Component {
  constructor(props) {
    super(props);
    this.getAllDomaines = this.getAllDomaines.bind(this);
    this.getAllSkills = this.getAllSkills.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveTraining = this.saveTraining.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.state = {
      message: null,
      ifError: null,
      currentErrors: {
        title: null,
        titleBool: true,
        duration: null,
        durationBool: true,
        price: null,
        priceBool: true,
        startDate: null,
        startDateBool: true,
        endDate: null,
        endDateBool: true,
        domain: null,
        domainBool: true,
        skill: null,
        skillBool: true
      },
      validateForm: false,
      domains: [],
      skills: [],
      currentFormation: {
        titre: null,
        dateDebut: null,
        dateFin: null,
        duree: 0,
        test: null,
        prix: 0,
        domaine: {
          id: 0,
          version: null,
        },
        competences: {},
      },
    };
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "title") {
      if (value === "" || value === null || value.length === 0) {
          console.log("title est null")
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            title: "Le champ nom est requis.",
            titleBool: true,
          }
        }));
      } else {
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            titre: value
          },
          currentErrors: {
            ...prevState.currentErrors,
            title: null,
            titleBool: false
          }
        }));
      }
    }

    if (name === "duration") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              duration: "Le champ durée est requis.",
              durationBool: true,
            }
          }));
      } else {
        if(!ifNumber(value)){
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              duration: "Veuillez saisir un durée correct. (en heure)",
              durationBool: true,
            }
          }));
        }else{
          if(value <= 0){
            this.setState((prevState) => ({
              currentErrors: {
                ...prevState.currentErrors,
                duration: "Le durée ne peut être inférieur à zero.",
                durationBool: true,
              }
            }));
          }else{
            this.setState((prevState) => ({
              currentErrors: {
                  ...prevState.currentErrors,
                  duration: null,
                  durationBool: false,
              },
              currentFormation: {
                  ...prevState.currentFormation,
                  duree: value,
              },
          }));
          }
        }
      }
    }

    if (name === "price") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            price : "Le champ prix est requis.",
            priceBool: true
          }
        }));
      }else{
        if(!ifNumberWithDecimal(value)){
          this.setState((prevState) => ({
            currentErrors:{
              ...prevState.currentErrors,
              price : "Veuillez saisir un prix correct.",
              priceBool: true
            }
          }));
        }else{
          if(value <= 0){
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                price : "Le prix ne peut être inférieur à zero.",
                priceBool: true
              }
            }));
          }else{
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                price : null,
                priceBool: false
              },
              currentFormation: {
                ...prevState.currentFormation,
                prix: value,
              },
            }));
          }
        }
      }
    }

    if (name === "startDate") {
      console.log("isValidDate",isValidDate(value))
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            startDate: "Le champ date début est requis.",
            startDateBool : true,
          }
        }));
      }else{
        if(!isValidDate(value)){
          this.setState((prevState) => ({
            currentErrors:{
              ...prevState.currentErrors,
              startDate: "Veuillez saisir un date correct.",
              startDateBool : true,
            }
          }));
        }else{
          if(!compareDateStringWithDateCurrent(value)){
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                startDate: "La date doit être ultérieure à la date du jour.",
                startDateBool : true,
              }
            }));
          }else{
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                startDate: null,
                startDateBool : false,
              },
              currentFormation: {
                ...prevState.currentFormation,
                dateDebut: value,
              },
            }));
          }
        }
        
      }
    }

    /**
     * TODO: Vérification par rapport a la durée
     */
    if (name === "endDate") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            endDate: "Le champ date de fin est requis.",
            endDateBool: true
          }
        }));
      }else{
        if(!isValidDate(value)){
          this.setState((prevState) => ({
            currentErrors:{
              ...prevState.currentErrors,
              endDate: "Veuillez saisir une date correct.",
              endDateBool: true
            }
          }));
        }else{
          if(compareTwoDateString(this.state.currentFormation.dateDebut,value) === "+" || compareTwoDateString(this.state.currentFormation.dateDebut,value) === "=" ){
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                endDate: "Le date de fin ne peut être inférieur ou égal a la date de début.",
                endDateBool: true
              }
            }));
          }else{
            this.setState((prevState) => ({
              currentErrors:{
                ...prevState.currentErrors,
                endDate: null,
                endDateBool: false
              },
              currentFormation: {
                ...prevState.currentFormation,
                dateFin: value,
              },
            }));
          }
        }
      }
    }
    if (name === "domain") {
      console.log(value);
      if (value === "0" || value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            domain: "Le champ domaine est requis.",
            domainBool: true
          }
        }));
      }else{
        if(this.state.domains.find(e => e.id === parseInt(value)) === undefined){
          this.setState((prevState) => ({
            currentErrors:{
              ...prevState.currentErrors,
              domain: "Veuillez sélectionner un domaine qui existe.",
              domainBool: true
            }
          }));
        }else{
          this.setState((prevState) => ({
            currentErrors:{
              ...prevState.currentErrors,
              domain: null,
              domainBool: false
            },
            currentFormation: {
              ...prevState.currentFormation,
              domaine: {
                id: value,
              },
            },
          }));
        }
      }
    }
  }

  componentDidMount() {
    this.getAllDomaines();
    this.getAllSkills();
  }

  onChangeSkills(e) {
      console.log(e.length)
    if(e.length === 0){
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          skill: "Veuillez séléctionner au moins une compétences",
          skillBool: true
        },
        currentFormation: {
          ...prevState.currentFormation,
          competences: e,
        },
      }));
    }else{
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          skill: null,
          skillBool: false
        },
        currentFormation: {
          ...prevState.currentFormation,
          competences: e,
        },
      }));
    }
  }

  validationForm(){
    const { currentErrors,currentFormation } = this.state;
    if(currentFormation.domaine.id === 0){
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          domain: "Le champ domaine est requis.",
          domainBool: true
        }
      }));
    }
    if(Object.entries(currentFormation.competences).length === 0){
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          skill: "Veuillez séléctionner au moins une compétences",
          skillBool: true
        }
      }));
    }
    if(!currentErrors.durationBool && !currentErrors.startDateBool && !currentErrors.endDateBool && !currentErrors.domainBool && !currentErrors.titleBool && !currentErrors.skillBool && !currentErrors.priceBool){
      return true;
    }else{
      return false;
    }
  }

  getAllDomaines() {
    domaineService
      .getAllDomaine()
      .then((response) => {
        this.setState({ domains: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllSkills() {
    competenceService
      .getAllCompetence()
      .then((response) => {
        this.setState({ skills: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveTraining(e) {
   e.preventDefault();
   if(this.validationForm()){
    const json = JSON.stringify(this.state.currentFormation).split('"value":').join('"id":');
    const data = JSON.parse(json);
    formationsService.save(data)
      .then((resp) => {
        this.setState({
          message: "Création bien prise en compte ! Redirection vers la liste des formations.",
          ifError: false
      });
      window.setTimeout(() => {this.props.history.push('/formations')}, 5000)
      })
      .catch((e) => {
        this.setState({
          message: e,
          ifError: true
        });
        console.log(e);
      });
   }else{
    this.setState({
      message: "Une erreur s'est produite ! veuillez ré-essayer.",
      ifError: true
    });
     console.log("Des erreurs présents");
   }
  }



  render() {
    const { domains, skills, currentFormation, currentErrors,message,ifError } = this.state;
    const dateNow = new Date();
    return (
      <div className="submit-form">
        <div>
          <form name="createTraining" onSubmit={this.saveTraining}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="title">Titre *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    id="title"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.title}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="duration">Durée * <span><small><i>(en heure)</i></small></span></label>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    id="duration"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.duration}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="price">Prix * <span><small><i>(TTC)</i></small></span></label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.price}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="startDate">Date début *</label>
                  <input
                    type="date"
                    min={moment(dateNow.setDate(dateNow.getDate() + 1)).format(
                      "YYYY-MM-DD"
                    )}
                    name="startDate"
                    className="form-control"
                    id="startDate"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.startDate}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="endDate">Date de fin *</label>
                  <input
                    type="date"
                    min={moment(dateNow.setDate(dateNow.getDate() + 2)).format(
                      "YYYY-MM-DD"
                    )}
                    name="endDate"
                    className="form-control"
                    id="endDate"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.endDate}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="domain">Domaine *</label>
                  <CSelect
                    custom
                    name="domain"
                    id="domain"
                    onChange={this.handleChange}
                    required
                  >
                    <option value="0">Veuillez sélectionner un domaine</option>
                    {domains.map((domain, key) => (
                      <option key={key} value={domain.id}>
                        {domain.titre}
                      </option>
                    ))}
                  </CSelect>
                  <span className="text-danger">{currentErrors.domain}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="skills">Compétences *</label>
                  <Select
                    name="skills"
                    required={true}
                    placeholder="Liste des compétences"
                    value={
                      Object.entries(currentFormation.competences).length === 0
                        ? null
                        : currentFormation.competences
                    }
                    options={skills.map((e) => ({ label: e.nom, value: e.id }))}
                    onChange={this.onChangeSkills}
                    isMulti
                    isSearchable={true}
                    
                  />
                  <span className="text-danger">{currentErrors.skill}</span>
                </div>
              </div>
            </div>
            <CButton type="submit" block color="info">
              Ajout d'une formation
            </CButton>
          </form>
          {ifError != null ? ifError ? <CAlert color="danger">{message}</CAlert> : <CAlert color="success">{message}</CAlert> : <CAlert></CAlert>}
        </div>
      </div>
    );
  }
}

export default withRouter(CreateFormation);
