import React, { Component } from "react";
import { CButton, CSelect, CAlert } from "@coreui/react";
import { withRouter } from "react-router";
import Select from "react-select";
import AdressesService from "../../services/adresses.service";
import DomaineService from "../../services/domaine.service";
import EntrepriseService from "../../services/entreprises.service";
import CompetenceService from "../../services/competence.service";
import RoleService from "../../services/role.service";
import SalariesService from "../../services/salaries.service";
import { isMajor, isValidDate } from "src/utils/fonctions";

class UpdateSalarie extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);
    this.updateSalarie = this.updateSalarie.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.state = {
      currentErrors: {
        lastname: null,
        lastnameBool: true,
        firstname: null,
        firstnameBool: true,
        email: null,
        emailBool: true,
        birthday: null,
        birthdayError: true,
        password: null,
        passwordMatch: null,
        passwordMatchBool: true,
        passwordBool: true,
        phonePerso: null,
        phonePersoBool: true,
        phoneMPerso: null,
        phoneMPersoBool: true,
        phonePro: null,
        phoneProBool: true,
        phoneMPro: null,
        phoneMProBool: true,
        adresse: null,
        adresseBool: true,
        domain: null,
        domainBool: true,
        company: null,
        companyBool: null,
        skills: null,
        skillsBool: true,
        role: null,
        roleBool: true,
      },
      currentSalarie: {
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        dateNaissance: "",
        telPersonnel: "",
        mobilPersonnel: "",
        telProfessionnel: "",
        mobileProfessionnel: "",
        adresse: {
          id: 0,
          version: null,
        },
        domaine: {
          id: 0,
          version: null,
        },
        entreprise: {
          id: 0,
          version: null,
        },
        roles: [],
        competences: [],
        siManager: false,
        version: null,
      },
      adresses: [],
      domains: [],
      companies: [],
      skills: [],
      roles: [],
      message: "",
      ifError: null,
    };
  }

  componentDidMount() {
    this.getSalarie(this.props.salarieId.id);
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
            lastname: null,
            lastnameBool: false,
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
          },
          currentSalarie: {
            ...prevState.currentSalarie,
            prenom: (value+'').charAt(0).toUpperCase()+value.substr(1),
          },
        }));
      } else {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            firstname: null,
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
                birthdayBool: true,
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
      if (regexTel.test(value)) {
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
      if (regexTel.test(value)) {
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
      if (regexTel.test(value)) {
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
      if (regexTel.test(value)) {
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

    if (name === "email") {
      if (!regexEmail.test(value)) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            email: "Please enter valid email address.",
            emailBool: true,
          },
        }));
      } else {
        if (value === "" || value === null || value.length === 0) {
          this.setState((prevState) => ({
            currentErrors: {
              ...prevState.currentErrors,
              email: "Le champ email est requis.",
              emailBool: true,
            },
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
      console.log(value, "address");
      if (
        parseInt(value) === 0 ||
        value === "" ||
        value === null ||
        value.length === 0
      ) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            adresse: "Le champ adresse est requis.",
            adresseBool: true,
          },
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
      if (
        parseInt(value) === 0 ||
        value === "" ||
        value === null ||
        value.length === 0
      ) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            domain: "Le champ domaine est requis.",
            domainBool: true,
          },
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
      if (
        parseInt(value) === 0 ||
        value === "" ||
        value === null ||
        value.length === 0
      ) {
        this.setState((prevState) => ({
          currentErrors: {
            ...prevState.currentErrors,
            company: "Le champ domaine est requis.",
            companyBool: true,
          },
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
        skill: null,
        skillBool: false,
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
          roleBool: true,
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
          roleBool: false,
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

  getSalarie(id) {
    SalariesService.getSalarieById(id)
      .then((response) => {
        this.setState({
          currentSalarie: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  validationForm() {
    const { currentErrors, currentSalarie } = this.state;
    if (currentSalarie.domaine.id === 0) {
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          domain: "Le champ domaine est requis.",
          domainBool: true,
        },
      }));
    }
    if (Object.entries(currentSalarie.competences).length === 0) {
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          skill: "Veuillez séléctionner au moins une compétences",
          skillBool: true,
        },
      }));
    }
    if (
      currentErrors.lastnameBool &&
      currentErrors.firstnameBool &&
      currentErrors.emailBool &&
      currentErrors.birthdayError &&
      currentErrors.phonePersoBool &&
      currentErrors.phoneMPersoBool &&
      currentErrors.phoneProBool &&
      currentErrors.phoneMProBool &&
      currentErrors.adresseBool &&
      currentErrors.domainBool &&
      currentErrors.companyBool &&
      currentErrors.skillsBool &&
      currentErrors.roleBool
    ) {
      return true;
    } else {
      return true;
    }
  }

  updateSalarie(e) {
    e.preventDefault();

    if (this.validationForm()) {
      const json = JSON.stringify(this.state.currentSalarie)
        .split('"value":')
        .join('"id":');
      const data = JSON.parse(json);
      delete data.postes;
      SalariesService.updateWithoutPassword(data)
        .then((resp) => {
          this.setState({
            message:
              "Modification bien prise en compte ! Redirection vers le profil du salarie.",
            ifError: false,
          });
          window.setTimeout(() => {
            this.props.history.push(`/salaries/profil/${resp.data.id}`);
          }, 2000);
        })
        .catch((e) => {
          this.setState({
            message: e,
            ifError: true,
          });
        });
    } else {
      this.setState({
        message: "Une erreur s'est produite ! veuillez ré-essayer.",
        ifError: true,
      });
    }
  }

  render() {
    const {
      adresses,
      domains,
      companies,
      skills,
      roles,
      currentSalarie,
      currentErrors,
      message,
      ifError,
    } = this.state;
    return (
      <div className="submit-form">
        <div>
          <form name="updateEmployee" onSubmit={this.updateSalarie}>
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
                    value={
                      currentSalarie.nom === null ? "" : currentSalarie.nom
                    }
                    required
                  />
                  <span className="text-danger">{currentErrors.lastname}</span>
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
                    onChange={this.handleChange}
                    value={
                      currentSalarie.prenom === null
                        ? ""
                        : currentSalarie.prenom
                    }
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
                    value={
                      currentSalarie.email === null ? "" : currentSalarie.email
                    }
                    required
                  />
                  <span className="text-danger">{currentErrors.email}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="dayOfBirth" className={currentErrors.birthday ? "font-weight-bold text-danger" : "font-weight-bold"}>Date de naissance *</label>
                  <input
                    type="date"
                    name="birthday"
                    className={currentErrors.birthday ? "form-control is-invalid" : "form-control"}
                    id="dayOfBirth"
                    onChange={this.handleChange}
                    value={
                      currentSalarie.dateNaissance === null
                        ? ""
                        : currentSalarie.dateNaissance
                    }
                    required
                  />
                  <span className="text-danger">{currentErrors.birthday}</span>
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
                    value={
                      currentSalarie.telPersonnel === null
                        ? ""
                        : currentSalarie.telPersonnel
                    }
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">
                    {currentErrors.phonePerso}
                  </span>
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
                    value={
                      currentSalarie.mobilPersonnel === null
                        ? ""
                        : currentSalarie.mobilPersonnel
                    }
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">
                    {currentErrors.phoneMPerso}
                  </span>
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
                    value={
                      currentSalarie.telProfessionnel === null
                        ? ""
                        : currentSalarie.telProfessionnel
                    }
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phonePro}</span>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phoneMPro">Tél. Mobile pro</label>
                  <input
                    type="text"
                    name="phoneMPro"
                    className="form-control"
                    id="phoneMPro"
                    value={
                      currentSalarie.mobileProfessionnel === null
                        ? ""
                        : currentSalarie.mobileProfessionnel
                    }
                    onChange={this.handleChange}
                  />
                  <span className="text-danger">{currentErrors.phoneMPro}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="adresse">Adresse *</label>
                  <CSelect
                    custom
                    name="adresse"
                    id="adresse"
                    onChange={this.handleChange}
                    value={
                      currentSalarie.adresse.id === null
                        ? 0
                        : currentSalarie.adresse.id
                    }
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
                  <label htmlFor="domain">Domaine</label>
                  <CSelect
                    custom
                    name="domain"
                    id="domain"
                    value={
                      currentSalarie.domaine.id === null
                        ? 0
                        : currentSalarie.domaine.id
                    }
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
                  <label htmlFor="company">Entreprise</label>
                  <CSelect
                    custom
                    name="company"
                    id="company"
                    value={
                      currentSalarie.entreprise.id === null
                        ? 0
                        : currentSalarie.entreprise.id
                    }
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
                  <label htmlFor="skills">Compétences</label>
                  <Select
                    name="skills"
                    placeholder="Liste des compétences"
                    value={
                      currentSalarie.competences === null
                        ? ""
                        : currentSalarie.competences
                    }
                    getOptionLabel={(option) => option.nom}
                    getOptionValue={(option) => option.id}
                    options={skills.map((e) => ({ nom: e.nom, id: e.id }))}
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
                  <label htmlFor="roles">Rôle *</label>
                  <Select
                    name="roles"
                    placeholder="Liste des rôles"
                    value={
                      currentSalarie.roles === null ? "" : currentSalarie.roles
                    }
                    getOptionLabel={(option) => option.titre}
                    getOptionValue={(option) => option.id}
                    options={roles.map((e) => ({ titre: e.titre, id: e.id }))}
                    onChange={this.onChangeRoles}
                    isMulti
                  />
                  <span className="text-danger">{currentErrors.role}</span>
                </div>
              </div>
            </div>
            <CButton type="submit" block color="info">
              Modification du salarié
            </CButton>

          </form>
          {ifError != null && (
            <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(UpdateSalarie);
