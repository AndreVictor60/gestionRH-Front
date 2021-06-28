import { CButton, CSelect, CAlert } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdressesService from "../../services/adresses.service";
import DomaineService from "../../services/domaine.service";
import EntrepriseService from "../../services/entreprises.service";
import CompetenceService from "../../services/competence.service";
import RoleService from "../../services/role.service";
import SalariesService from "../../services/salaries.service";
import Select from "react-select";
import { isMajor, isValidDate } from "src/utils/fonctions";
class CreateSalarie extends Component {
  constructor(props) {
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
      currentErrors: {
        lastname: null,
        lastnameBool: true,
        firstname: null,
        firstnameBool: true,
        email: null,
        emailBool: true,
        birthday: null,
        birthdayBool: true,
        password: null,
        passwordMatch: null,
        passwordMatchBool: true,
        passwordBool: true,
        phonePerso: null,
        phonePersoBool: null,
        phoneMPerso: null,
        phoneMPersoBool: null,
        phonePro: null,
        phoneProBool: null,
        phoneMPro: null,
        phoneMProBool: null,
        adresse: null,
        adresseBool: true,
        domain: null,
        domainBool: true,
        company: null,
        companyBool: true,
        skills: null,
        skillsBool: true,
        role: null,
        roleBool: true
      },
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
        dateNaissance: new Date(),
        motDePasse: null,
        telPersonnel: null,
        mobilPersonnel: null,
        telProfessionnel: null,
        mobileProfessionnel: null,
        adresse: {
          id: null,
        },
        domaine: {
          id: null,
        },
        entreprise: {
          id: null,
        },
        roles: [],
        competences: [],
        siManager: false,
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
    this.getAllAdresses();
    this.getAllDomaines();
    this.getAllCompanies();
    this.getAllSkills();
    this.getAllRoles();
  }

  handleChange(e) {
    let regexEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let regexTel = new RegExp("^0[1-9]([-. ]?[0-9]{2}){4}$");
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "lastname") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            lastname: "Le champ nom est requis.",
            lastnameBool: true,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            nom: value.toUpperCase(),
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            lastname: "",
            lastnameBool: false
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            nom: value.toUpperCase(),
          },
        }));
      }
    }

    if (name === "firstname") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            firstname: "Le champ prénom est requis.",
            firstnameBool: true,
          },currentSalarie: {
            ...prevState.currentSalarie,
            prenom: (value+'').charAt(0).toUpperCase()+value.substr(1),
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            firstname: "",
            firstnameBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            prenom: (value+'').charAt(0).toUpperCase()+value.substr(1),
          },
        }));
      }
    }
    if (name === "birthday") {
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            birthday: "Le champ date de naissance est requis.",
            birthdayBool: true,
          },
        }));
      } else {
        if (isValidDate(value)) {
          if (!isMajor(value)) {
            this.setState((prevState) => ({
              currentErrors: {
                ...prevState.currentErrors,
                birthday: "Le salarié est mineur.",
                birthdayBool: true,
              },
            }));
          } else {
            this.setState((prevState) => ({
              currentErrors: {
                ...prevState.currentErrors,
                birthday: null,
                birthdayBool: false,
              },
              currentSalarie: {
                ...prevState.currentSalarie,
                dateNaissance: value,
              },
            }));
          }
        } else {
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              birthday: "Veuilez saisir une date.",
              birthdayBool: true,
            },
          }));
        }
      }
    }
    if (name === "phonePerso") {
      if (regexTel.test(value) || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phonePerso: null,
            phonePersoBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            telPersonnel: value,
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phonePerso: "Veuillez saisir un bon numéro",
            phonePersoBool: true,
          },
        }));
      }
    }

    if (name === "phoneMPerso") {
      if (regexTel.test(value) || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phoneMPerso: null,
            phoneMPersoBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            mobilPersonnel: value,
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phoneMPerso: "Veuillez saisir un bon numéro",
            phoneMPersoBool: true,
          },
        }));
      }
    }

    if (name === "phonePro") {
      if (regexTel.test(value) || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phonePro: null,
            phoneProBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            telProfessionnel: value,
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phonePro: "Veuillez saisir un bon numéro",
            phoneProBool: true,
          },
        }));
      }
    }

    if (name === "phoneMPro") {
      if (regexTel.test(value) || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phoneMPro: null,
            phoneMProBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            mobileProfessionnel: value,
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            phoneMPro: "Veuillez saisir un bon numéro",
            phoneMProBool: true,
          },
        }));
      }
    }
    if (name === "password") {
      if (value === "" || value === null || value.length === 0) {
        console.log(value.length, "le mot de passe est vide")
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            password: "Le mot de passe est requis",
            passwordBool: true,
          }
        }));
        console.log(value, "le mot de passe n'est pas vide")
      } else {
        this.setState((prevState) => ({
          password: value,
          currentErrors: {
            ...prevState.currentErrors,
            password: null,
            passwordBool: false
          }
        }));
      }
    }

    if (name === "passwordC") {
      if (this.state.password !== value) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            passwordMatch: "Les mots de passe ne correspondent pas",
            passwordMatchBool: true,
          }
        }));
      } else {
        if (value !== "" || value !== null || value.length !== 0) {
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              passwordMatch: null,
              passwordMatchBool: false,
            },
            currentSalarie: {
              ...prevState.currentSalarie,
              motDePasse: value,
            },
          }));
        }
      }
    }

    if (name === "email") {
      if (!regexEmail.test(value)) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            email: "Veuillez entrer une adresse e-mail valide.",
            emailBool: true,
          }
        }));
      } else {
        if (value === "" || value === null || value.length === 0) {
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              email: "Le champ email est requis.",
              emailBool: true,
            }
          }));
        } else {
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              email: null,
              emailBool: false,
            },
            currentSalarie: {
              ...prevState.currentSalarie,
              email: value,
            },
          }));
        }
      }

    }
    if (name === "adresse") {
      if (parseInt(value) === 0 || value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            adresse: "Le champ adresse est requis.",
            adresseBool: true,
          }
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            adresse: null,
            adresseBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            adresse: {
              id: value,
            },
          },
        }));
      }
    }
    if (name === "domain") {
      if (parseInt(value) === 0 || value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            domain: "Le champ domaine est requis.",
            domainBool: true,
          }
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            domain: null,
            domainBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            domaine: {
              id: value,
            },
          },
        }));
      }
    }
    if (name === "company") {
      if (parseInt(value) === 0 || value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            company: "Le champ domaine est requis.",
            companyBool: true,
          }
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            company: null,
            companyBool: false,
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            entreprise: {
              id: value,
            },
          },
        }));
      }
    }
  }

  onChangeSkills(e) {
    this.setState((prevState) => ({
      currentErrors: {
        ...prevState.currentErrors,
        skills: null,
        skillsBool: false
      },
      currentSalarie: {
        ...prevState.currentSalarie,
        competences: e,
      },
    }));
  }

  onChangeRoles(e) {
    if (e.length === 0) {
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          role: "Veuillez séléctionner au moins une rôle",
          roleBool: true
        },
        currentSalarie: {
          ...prevState.currentSalarie,
          roles: e,
        },
      }));
    } else {
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          role: null,
          roleBool: false
        },
        currentSalarie: {
          ...prevState.currentSalarie,
          roles: e,
        },
      }));
    }

  }

  getAllAdresses() {
    AdressesService.getAllAdresse()
      .then((response) => {
        this.setState({ adresses: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllDomaines() {
    DomaineService.getAllDomaine()
      .then((response) => {
        this.setState({ domains: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllCompanies() {
    EntrepriseService.getAllEntreprises()
      .then((response) => {
        this.setState({ companies: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllSkills() {
    CompetenceService.getAllCompetence()
      .then((response) => {
        this.setState({ skills: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAllRoles() {
    RoleService.getAllRoles()
      .then((response) => {
        this.setState({ roles: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  validationForm() {
    const { currentErrors } = this.state;
    if(!currentErrors.lastnameBool &&
      !currentErrors.firstnameBool &&
      !currentErrors.emailBool && 
      !currentErrors.birthdayError &&
      !currentErrors.passwordMatchBool &&
      !currentErrors.passwordBool &&
      !currentErrors.adresseBool &&
      !currentErrors.domainBool &&
      !currentErrors.skillsBool &&
      !currentErrors.roleBool  ){
      return true;
    }else{
      return false;
    }
  }

  saveEmployee(e) {
    e.preventDefault();
    console.log("validate",this.validationForm())
    if (this.validationForm()) {
      const json = JSON.stringify(this.state.currentSalarie).split('"value":').join('"id":');
      const data = JSON.parse(json);
      SalariesService.save(data)
        .then((resp) => {
          this.setState({
            message: "Création bien prise en compte ! Redirection vers son profil.",
            ifError: false
          });
          window.setTimeout(() => {this.props.history.push(`/salaries/profil/${resp.data.id}`)}, 2500)
        })
        .catch((e) => {
          this.setState({
            message: e,
            ifError: true
          });
          console.log(e);
        });
    } else {
      this.setState({
        message: "Des erreurs sont présentes ! veuillez ré-essayer.",
        ifError: true
      });
    }
  }

  render() {
    const { adresses, domains, companies, skills, roles, currentErrors, message, ifError,currentSalarie } = this.state;
    return (
      <div className="submit-form">
        <div>
          <form name="createEmployee" onSubmit={this.saveEmployee}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="lastname" className={currentErrors.lastname ? "font-weight-bold text-danger" : "font-weight-bold"}>Nom *</label>
                  <input
                    type="text"
                    name="lastname"
                    className={currentErrors.lastname ? "form-control is-invalid" : "form-control"}
                    id="lastname"
                    onChange={this.handleChange}
                    value={currentSalarie.nom}
                    required
                  />
                  <span className="text-danger" >{currentErrors.lastname}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="firstname" className={currentErrors.firstname ? "font-weight-bold text-danger" : "font-weight-bold"}>Prénom *</label>
                  <input
                    type="text"
                    name="firstname"
                    className={currentErrors.firstname ? "form-control is-invalid" : "form-control"}
                    id="firstname"
                    value={currentSalarie.prenom}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.firstname}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="email" className={currentErrors.email ? "font-weight-bold text-danger" : "font-weight-bold"}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    className={currentErrors.email ? "form-control is-invalid" : "form-control"}
                    id="email"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.email}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="dayOfBirth" className={currentErrors.birthday ? "font-weight-bold text-danger" : "font-weight-bold"} >Date de naissance *</label>
                  <input
                    type="date"
                    name="birthday"
                    className={currentErrors.birthday ? "form-control is-invalid" : "form-control"}
                    id="dayOfBirth"
                    value={currentSalarie.dateNaissance}
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.birthday}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="password" className={currentErrors.password ? "font-weight-bold text-danger" : "font-weight-bold"}>Mot de passe *</label>
                  <input
                    type="password"
                    name="password"
                    className={currentErrors.password ? "form-control is-invalid" : "form-control"}
                    id="password"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.password}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="passwordC" className={currentErrors.passwordMatch ? "font-weight-bold text-danger" : "font-weight-bold"}>
                    Confirmation du mot de passe *
                  </label>
                  <input
                    type="password"
                    name="passwordC"
                    className={currentErrors.passwordMatch ? "form-control is-invalid" : "form-control"}
                    id="passwordC"
                    onChange={this.handleChange}
                    required
                  />
                  <span className="text-danger">{currentErrors.passwordMatch}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phonePerso" className={currentErrors.phonePerso ? "font-weight-bold text-danger" : "font-weight-bold"}>Tél. perso</label>
                  <input
                    type="text"
                    name="phonePerso"
                    className={currentErrors.phonePerso ? "form-control is-invalid" : "form-control"}
                    id="phonePerso"
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phonePerso}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phoneMPerso" className={currentErrors.phoneMPerso ? "font-weight-bold text-danger" : "font-weight-bold"}>Tél. Mobile perso</label>
                  <input
                    type="text"
                    name="phoneMPerso"
                    className={currentErrors.phoneMPerso ? "form-control is-invalid" : "form-control"}
                    id="phoneMPerso"
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phoneMPerso}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phonePro" className={currentErrors.phonePro ? "font-weight-bold text-danger" : "font-weight-bold"}>Tél. pro</label>
                  <input
                    type="text"
                    name="phonePro"
                    className={currentErrors.phonePro ? "form-control is-invalid" : "form-control"}
                    id="phonePro"
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phonePro}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phoneMPro" className={currentErrors.phoneMPro ? "font-weight-bold text-danger" : "font-weight-bold"}>Tél. Mobile pro</label>
                  <input
                    type="text"
                    name="phoneMPro"
                    className={currentErrors.phoneMPro ? "form-control is-invalid" : "form-control"}
                    id="phoneMPro"
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phoneMPro}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="adresse" className={currentErrors.adresse ? "font-weight-bold text-danger" : "text-center font-weight-bold"}>Adresse *</label>
                  <CSelect
                    custom
                    className={currentErrors.adresse ? "form-control is-invalid" : "form-control"}
                    name="adresse"
                    id="adresse"
                    onChange={this.handleChange}
                    required
                  >
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
                  <span className="text-danger">{currentErrors.adresse}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="domain" className={currentErrors.domain ? "font-weight-bold text-danger" : "text-center font-weight-bold"}>Domaine *</label>
                  <CSelect
                    custom
                    className={currentErrors.domain ? "form-control is-invalid" : "form-control"}
                    name="domain"
                    id="domain"
                    onChange={this.handleChange}
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
                  <label htmlFor="company" className={currentErrors.company ? "font-weight-bold text-danger" : "font-weight-bold"}>Entreprise *</label>
                  <CSelect
                    className={currentErrors.company ? "form-control is-invalid" : "form-control"}
                    custom
                    name="company"
                    id="company"
                    onChange={this.handleChange}
                  >
                    <option value="0">
                      Veuillez sélectionner une entreprise
                    </option>
                    {companies.map((company, key) => (
                      <option key={key} value={company.id}>
                        {company.nom}
                      </option>
                    ))}
                  </CSelect>
                  <span className="text-danger">{currentErrors.company}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="skills" className={currentErrors.skills ? "font-weight-bold text-danger" : "text-center font-weight-bold"}>Compétences</label>
                  <Select
                    name="skills"
                    placeholder="Liste des compétences"
                    value={this.state.currentSalarie.competences}
                    options={skills.map((e) => ({ label: e.nom, value: e.id }))}
                    onChange={this.onChangeSkills}
                    isMulti
                  />
                  <span className="text-danger">{currentErrors.skills}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="roles" className={currentErrors.role ? "font-weight-bold text-danger" : "text-center font-weight-bold"}>Rôle *</label>
                  <Select
                    name="roles"
                    placeholder="Liste des rôles"
                    value={this.state.currentSalarie.roles}
                    options={roles.map((e) => ({
                      label: e.titre,
                      value: e.id,
                    }))}
                    onChange={this.onChangeRoles}
                    isMulti
                  />
                  <span className="text-danger">{currentErrors.role}</span>
                </div>
              </div>
            </div>
            <CButton type="submit" block color="info">
              Ajout d'un salarié
            </CButton>
          </form>
          {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
        </div>
      </div>
    );
  }
}
export default withRouter(CreateSalarie);
