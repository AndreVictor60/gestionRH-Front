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
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordC = this.onChangePasswordC.bind(this);
        this.onChangePhonePerso = this.onChangePhonePerso.bind(this);
        this.onChangePhoneMPerso = this.onChangePhoneMPerso.bind(this);
        this.onChangePhonePro = this.onChangePhonePro.bind(this);
        this.onChangePhoneMPro = this.onChangePhoneMPro.bind(this);     
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangeDomain = this.onChangeDomain.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeRoles = this.onChangeRoles.bind(this);
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

    onChangeLastname(e) {
      const lastname = e.target.value;
      if (0 !== lastname.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            nom: lastname,
          }
        }));
      }
    }

    onChangeFirstname(e) {
      const firstname = e.target.value;
      if (0 !== firstname.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            prenom: firstname,
          }
        }));
      }
    }

    onChangeEmail(e) {
      const email = e.target.value;
      let errors = {};
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if(!pattern.test(email)){
        errors["email"] = "Please enter valid email address.";
      }
      if (0 !== email.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            email: email,
          }
        }));
      }
      //this.setState((prevState) => ({errors: [...prevState.errors,"errors"]}));
    }

    onChangeBirthday(e) {
      const birthday = e.target.value;
      if (0 !== birthday.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            dateNaissance: birthday,
          }
        }));
      }
    }

    onChangePassword(e) {
      const password = e.target.value;
      if (0 !== password.length) {
        this.setState((prevState) => ({password: password}));
      }
    }

    onChangePasswordC(e) {
      const passwordC = e.target.value;
      let errors = {};
      if(this.state.password !== passwordC){
        errors["passwordMatch"] = "Les mots de passe ne correspondent pas";
      }
      if (0 !== passwordC.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            motDePasse: passwordC,
          }
        }));
      }
      this.setState((prevState) => ({errors: [...prevState.errors,"errors"]}));
    }

    onChangePhonePerso(e) {
      const phonePerso = e.target.value;
      if (0 !== phonePerso.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            telPersonnel: phonePerso,
          }
        }));
      }
    }

    onChangePhoneMPerso(e) {
      const phoneMPerso = e.target.value;
      if (0 !== phoneMPerso.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            mobilPersonnel: phoneMPerso,
          }
        }));
      }
    }

    onChangePhonePro(e) {
      const phonePro = e.target.value;
      if (0 !== phonePro.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            telProfessionnel: phonePro,
          }
        }));
      }
    }

    onChangePhoneMPro(e) {
      const phoneMPro = e.target.value;
      if (0 !== phoneMPro.length) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            mobileProfessionnel: phoneMPro,
          }
        }));
      }
    }

    onChangeAdress(e) {
      const idAdress = e.target.value;
      if (0 !== idAdress) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            adresse: {
              id: idAdress
            }
          }
        }));
      }
    }

    onChangeDomain(e) {
      const idDomain = e.target.value;
      if (0 !== idDomain) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            domaine: {
              id: idDomain
            }
          }
        }));
      }
    }

    onChangeCompany(e) {
      const idCompany = e.target.value;
      if (0 !== idCompany) {
        this.setState((prevState) => ({
          currentSalarie: {
            ...prevState.currentSalarie,
            entreprise:{
              id: idCompany
            } 
          }
        }));
      }
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
      SalariesService.save(json).then((resp) => {
        console.log(resp);
      }).catch((e) => { console.log(e)})
    }

    render() {
        const {adresses,domains,companies,skills,roles} = this.state;
        console.log(this.state.errors);
        return (
            <div className="submit-form">
            <div>
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="lastname">Nom *</label>
                    <input type="text" className="form-control" id="lastname" onChange={this.onChangeLastname} required />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="firstname">Prénom *</label>
                    <input type="text" className="form-control" id="firstname" onChange={this.onChangeFirstname} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control" id="email" onChange={this.onChangeEmail} required />
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="dayOfBirth">Date de naissance *</label>
                    <input type="date" className="form-control" id="dayOfBirth" onChange={this.onChangeBirthday} required />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" className="form-control" id="password" onChange={this.onChangePassword} required  />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="passwordC">Confirmation du mot de passe *</label>
                    <input type="password" className="form-control" id="passwordC" onChange={this.onChangePasswordC} required  />
                    <span style={{color: "red"}}>{this.state.errors["passwordMatch"]}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phonePerso">Tél. perso</label>
                    <input type="text" className="form-control" id="phonePerso" onChange={this.onChangePhonePerso} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPerso">Tél. Mobile perso</label>
                    <input type="text" className="form-control" id="phoneMPerso" onChange={this.onChangePhoneMPerso}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phonePro">Tél. pro</label>
                    <input type="text" className="form-control" id="phonePro" onChange={this.onChangePhonePro} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="phoneMPro">Tél. Mobile pro</label>
                    <input type="text" className="form-control" id="phoneMPro" onChange={this.onChangePhoneMPro}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="adresse">Adresse *</label>
                    <CSelect custom name="adresse" id="adresse" onChange={this.onChangeAdress} required>
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
                    <CSelect custom name="domain" id="domain" onChange={this.onChangeDomain}>
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
                    <CSelect custom name="company" id="company" onChange={this.onChangeCompany}>
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
                    <label htmlFor="role">Rôle *</label>
                    <Select 
                      name="role"
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
