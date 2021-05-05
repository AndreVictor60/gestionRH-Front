import { CButton, CSelect } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AdressesService from "../../services/adresses.service";
import DomaineService from "../../services/domaine.service";
import EntrepriseService from "../../services/entreprises.service";
import CompetenceService from "../../services/competence.service";
import RoleService from "../../services/role.service";
import SalariesService from "../../services/salaries.service";
import Select from 'react-select';
class CreateSalarie extends Component {
    constructor(props){
        super(props);
        this.getAllAdresses = this.getAllAdresses.bind(this);
        this.getAllDomaines = this.getAllDomaines.bind(this);
        this.getAllCompanies = this.getAllCompanies.bind(this);
        this.getAllSkills = this.getAllSkills.bind(this);
        this.getAllRoles = this.getAllRoles.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeRoles = this.onChangeRoles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.state = {
            errors: {},
            adresses: [],
            domains: [],
            companies: [],
            skills: [],
            roles: [],
            password: null,
            multiValue: [],
            nomError: false,
            prenomError: false,
            currentSalarie: {
              nom: null,
              prenom: null,
              email: null,
              dateNaissance: null,
              motDePasse: null,
              telPersonnel: null,
              mobilPersonnel: null,
              telProfessionnel: null,
              mobileProfessionnel: null,
              adresse: {
                id: null
              },
              domaine: {
                id: null
              },
              entreprise: {
                id: null
              },
              roles: [],
              competences: [],
              siManager: false
            }
        };
    }

    componentDidMount() {
        this.getAllAdresses();
        this.getAllDomaines();
        this.getAllCompanies();
        this.getAllSkills();
        this.getAllRoles();
    }

    handleChange(e){
      let errors = {};
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if(name === "lastname"){
        if(value === "" || value === null || value.length === 0){
          this.setState({nomError: true})
          errors["lastname"] = "Le champ nom est requis.";
        }else {
          this.setState((prevState) => ({
            nomError:false,
            currentSalarie: {
              ...prevState.currentSalarie,
              nom: value,
            }
          }));
        }
      }

      if(name === "firstname"){
        if(value === "" || value === null || value.length === 0){
          this.setState({prenomError: true})
        }else{
          this.setState((prevState) => ({
            prenomError: false,
            currentSalarie: {
              ...prevState.currentSalarie,
              prenom: value,
            }
          }));
        }
      }

      if(name === "birthday"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              dateNaissance: value,
            }
          }));
        }
      }

      if(name === "phonePerso"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              telPersonnel: value,
            }
          }));
        }
      }

      if(name === "phoneMPerso"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              mobilPersonnel: value,
            }
          }));
        }
      }
      if(name === "phonePro"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              telProfessionnel: value,
            }
          }));
        }
      }

      if(name === "phoneMPro"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              mobileProfessionnel: value,
            }
          }));
        }
      }

      if(name === "password"){
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({password: value}));
        }
      }

      if(name === "passwordC"){
        if(this.state.password !== value){
          errors["passwordMatch"] = "Les mots de passe ne correspondent pas";
        }
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              motDePasse: value,
            }
          }));
        }
      }

      if(name === "email"){
        if(!pattern.test(value)){
          errors["email"] = "Please enter valid email address.";
        }
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              email: value,
            }
          }));
        }
      }
      if(name === "adresse"){
        if (0 !== value || value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              adresse: {
                id: value
              }
            }
          }));
        }
      }
      if(name === "domain"){
        if (0 !== value || value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              domaine: {
                id: value
              }
            }
          }));
        }
      }
      if(name === "company"){
        if (0 !== value || value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentSalarie: {
              ...prevState.currentSalarie,
              entreprise:{
                id: value
              } 
            }
          }));
        }
      }
      this.setState({errors: errors});
    }

    onChangeSkills(e) {
      console.log("e",e);
      this.setState((prevState) => ({
        currentSalarie: {
          ...prevState.currentSalarie,
          competences: e
        }
      }))

    }

    onChangeRoles(e) {
      this.setState((prevState) => ({
        currentSalarie: {
          ...prevState.currentSalarie,
          roles: e
        }
      }));
    }

    getAllAdresses() {
        AdressesService.getAllAdresse().then((response) => {
          this.setState({ adresses: response.data});
        })
        .catch((e) => { console.log(e);});
    }

    getAllDomaines(){
        DomaineService.getAllDomaine().then((response) => {
          this.setState({domains: response.data});
        })
        .catch((e) => {console.log(e);})
    }

    getAllCompanies(){
        EntrepriseService.getAllEntreprises().then((response) => {
          this.setState({ companies: response.data});
        })
        .catch((e) => { console.log(e) })
    }

    getAllSkills(){
        CompetenceService.getAllCompetence().then((response) => {
          this.setState({ skills: response.data });
        })
        .catch((e) => { console.log(e) })
    }

    getAllRoles(){
        RoleService.getAllRoles().then((response) => {
          this.setState({ roles: response.data });
        })
        .catch((e) => { console.log(e) })
    }

    saveEmployee() {
      const json = JSON.stringify(this.state.currentSalarie).split('"value":').join('"id":');
      const data = JSON.parse(json);
      SalariesService.save(data).then((resp) => {
        console.log(resp);
      }).catch((e) => { console.log(e)})
    }

    render() {
        const {adresses,domains,companies,skills,roles} = this.state;
        console.log(this.state.currentSalarie);
        return (
            <div className="submit-form">
            <div>
            <form name="createEmployee">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastname">Nom *</label>
                    <input type="text" name="lastname" className="form-control" id="lastname" onChange={this.handleChange} required />
                    <span style={{color: "red"}}>{this.state.errors["lastname"]}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstname">Prénom *</label>
                    <input type="text" name="firstname" className="form-control" id="firstname" onChange={this.handleChange} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" name="email" className="form-control" id="email" onChange={this.handleChange} required />
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dayOfBirth">Date de naissance *</label>
                    <input type="date" name="birthday" className="form-control" id="dayOfBirth" onChange={this.handleChange} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={this.handleChange} required  />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="passwordC">Confirmation du mot de passe *</label>
                    <input type="password" name="passwordC" className="form-control" id="passwordC" onChange={this.handleChange} required  />
                    <span style={{color: "red"}}>{this.state.errors["passwordMatch"]}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phonePerso">Tél. perso</label>
                    <input type="text" name="phonePerso" className="form-control" id="phonePerso" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPerso">Tél. Mobile perso</label>
                    <input type="text" name="phoneMPerso" className="form-control" id="phoneMPerso" onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phonePro">Tél. pro</label>
                    <input type="text" name="phonePro" className="form-control" id="phonePro" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPro">Tél. Mobile pro</label>
                    <input type="text" name="phoneMPro" className="form-control" id="phoneMPro" onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="adresse">Adresse *</label>
                    <CSelect custom name="adresse" id="adresse" onChange={this.handleChange} required>
                      <option value="0">Veuillez sélectionner une adresse</option>
                      {adresses.map((adresse, key) => (
                        <option key={key} value={adresse.id}>
                          {adresse.numero +
                            " " +
                            adresse.voie +
                            " " +
                            adresse.ville}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <div className="form-group">
                    <label htmlFor="domain">Domaine</label>
                    <CSelect custom name="domain" id="domain" onChange={this.handleChange}>
                      <option value="0">Veuillez sélectionner un domaine</option>
                      {domains.map((domain, key) => (
                        <option key={key} value={domain.id}>
                          {domain.titre}
                        </option>
                      ))}
                    </CSelect>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <CSelect custom name="company" id="company" onChange={this.handleChange}>
                      <option value="0">Veuillez sélectionner une entreprise</option>
                      {companies.map((company, key) => (
                        <option key={key} value={company.id}>
                          {company.nom}
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
                  name="skills"
                  placeholder="Liste des compétences"
                  value={this.state.currentSalarie.competences}
                  options={skills.map(e => ({ label: e.nom, value: e.id}))}
                  onChange={this.onChangeSkills}
                  isMulti
                  />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <div className="form-group">
                    <label htmlFor="roles">Rôle *</label>
                    <Select 
                      name="roles"
                      placeholder="Liste des rôles"
                      value={this.state.currentSalarie.roles}
                      options={roles.map(e => ({ label: e.titre, value: e.id}))}
                      onChange={this.onChangeRoles}
                      isMulti
                      />
                  </div>
                </div>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.saveEmployee}>
                Ajout d'un salarié
            </CButton>
            </div>
        </div>
        )
    }
}
export default withRouter(CreateSalarie);