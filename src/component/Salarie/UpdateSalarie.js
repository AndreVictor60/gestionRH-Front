import React, { Component } from 'react'
import { CButton, CSelect } from '@coreui/react';
import Select from 'react-select';
import AdressesService from "../../services/adresses.service";
import DomaineService from "../../services/domaine.service";
import EntrepriseService from "../../services/entreprises.service";
import CompetenceService from "../../services/competence.service";
import RoleService from "../../services/role.service";
import SalariesService from "../../services/salaries.service";

 class UpdateSalarie extends Component {
     constructor(props){
         super(props);
         this.handleChange = this.handleChange.bind(this);
         this.onChangeSkills = this.onChangeSkills.bind(this);
         this.onChangeRoles = this.onChangeRoles.bind(this);
         this.state = {
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
              },
            adresses: [],
            domains: [],
            companies: [],
            skills: [],
            roles: [],
            errors: {}
         }
     }

    componentDidMount() {
        this.getSalarie(this.props.salarieId.id);
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

    getSalarie(id) {
        SalariesService.getSalarieById(id)
          .then(response => {
            this.setState({
                currentSalarie: response.data
            })
          })
          .catch(e => {
            console.log(e);
          });
    }

    updateSalarie(){
        SalariesService.update()
        .then(resp => {
            console.log(resp);
        }) 
        .catch(e => { console.log(e)})
    }

    render() {
        const {adresses,domains,companies,skills,roles,currentSalarie} = this.state;
        return (
            <div className="submit-form">
            <div>
            <form name="createEmployee">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastname">Nom *</label>
                    <input type="text" name="lastname" className="form-control" id="lastname" onChange={this.handleChange} value={currentSalarie.nom} required />
                    <span style={{color: "red"}}>{this.state.errors["lastname"]}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstname">Prénom *</label>
                    <input type="text" name="firstname" className="form-control" id="firstname" onChange={this.handleChange} value={currentSalarie.prenom} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" name="email" className="form-control" id="email" onChange={this.handleChange} value={currentSalarie.email} required />
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dayOfBirth">Date de naissance *</label>
                    <input type="date" name="birthday" className="form-control" id="dayOfBirth" onChange={this.handleChange} value={currentSalarie.dateNaissance} required />
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
                    <input type="text" name="phonePerso" className="form-control" id="phonePerso" value={currentSalarie.telPersonnel} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPerso">Tél. Mobile perso</label>
                    <input type="text" name="phoneMPerso" className="form-control" id="phoneMPerso" value={currentSalarie.mobilPersonnel} onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phonePro">Tél. pro</label>
                    <input type="text" name="phonePro" className="form-control" id="phonePro" value={currentSalarie.telProfessionnel} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPro">Tél. Mobile pro</label>
                    <input type="text" name="phoneMPro" className="form-control" id="phoneMPro" value={currentSalarie.mobileProfessionnel} onChange={this.handleChange}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="adresse">Adresse *</label>
                    <CSelect custom name="adresse" id="adresse" onChange={this.handleChange} value={currentSalarie.adresse.id} required>
                      <option value="0">Veuillez sélectionner une adresse</option>
                      {adresses.map((adresse, key) => (
                        <option key={key}  value={adresse.id}>
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
                    <CSelect custom name="domain" id="domain" value={currentSalarie.domaine.id} onChange={this.handleChange}>
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
                    <CSelect custom name="company" id="company" value={currentSalarie.entreprise.id} onChange={this.handleChange}>
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
                  value={currentSalarie.competences}
                  getOptionLabel={option => option.nom}
                  getOptionValue={option => option.id}
                  options={skills.map(e => ({ nom: e.nom, id: e.id}))}
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
                      getOptionLabel={option => option.titre}
                      getOptionValue={option => option.id}
                      options={roles.map(e => ({ titre: e.titre, id: e.id}))}
                      onChange={this.onChangeRoles}
                      isMulti
                      />
                  </div>
                </div>
              </div>
            </form>
            <CButton type="submit" block  color="info">
                Ajout d'un salarié
            </CButton>
            </div>
        </div>
        )
    }
}
export default UpdateSalarie;