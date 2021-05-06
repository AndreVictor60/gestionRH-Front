import { CButton, CSelect } from "@coreui/react";
import moment from "moment";
import React, { Component } from "react";
import Select from "react-select";
import competenceService from "src/services/competence.service";
import domaineService from "src/services/domaine.service";
import formationsService from "src/services/formations.service";

export class CreateFormation extends Component {
  constructor(props) {
    super(props);
    this.getAllDomaines = this.getAllDomaines.bind(this);
    this.getAllSkills = this.getAllSkills.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveTraining = this.saveTraining.bind(this);
    this.state = {
      currentErrors: {
        title: null,
        duration: null,
        price: null,
        startDate: null,
        endDate: null,
        domain: null,
        skill: null,
      },
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
    let errors = {};
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    /**
     * TODO: Vérification du string
     */
    if (name === "title") {
      if (value === "" || value === null || value.length === 0) {
          console.log("title est null")
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            titre: value
          },
          currentErrors: {
            ...prevState.currentErrors,
            title: "Le champ nom est requis.",
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
          }
        }));
      }
    }

    if (name === "duration") {
        /**
         * TODO: Vérification de la longueur
         * TODO: Vérification du négatif
         * TODO: Vérification si c'est un nombre
         */
      if (value === "" || value === null || value.length === 0) {
        this.setState((prevState) => ({
            currentFormation: {
              ...prevState.currentFormation,
              duree: value
            },
            currentErrors: {
              ...prevState.currentErrors,
              duration: "Le champ durée est requis.",
            }
          }));
      } else {
        this.setState((prevState) => ({
            currentErrors: {
                ...prevState.currentErrors,
                duration: null,
            },
            currentFormation: {
                ...prevState.currentFormation,
                duree: value,
            },
        }));
      }
    }

    if (name === "price") {
        /**
         * TODO: Impossible d'être négatif
         * TODO: Vérification si c'est un nombre
         */
      if (value !== "" || value !== null || value.length !== 0) {
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            prix: value,
          },
        }));
      }
    }

    /**
     * TODO: Vérification de la date
     * TODO: Vérification si la date n'est pas inférieur a la date actuelle
     */
    if (name === "startDate") {
      if (value !== "" || value !== null || value.length !== 0) {
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            dateDebut: value,
          },
        }));
      }
    }

    /**
     * TODO: Vérification de la date
     * TODO: Vérification si la date n'est pas inférieur a la startDate && par rapport a la durée
     */
    if (name === "endDate") {
      if (value !== "" || value !== null || value.length !== 0) {
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            dateFin: value,
          },
        }));
      }
    }
    /**
     * TODO: Required
     * TODO: Vérification si le domaine existe
     */
    if (name === "domain") {
      if (0 !== value || value !== "" || value !== null || value.length !== 0) {
        this.setState((prevState) => ({
          currentFormation: {
            ...prevState.currentFormation,
            domaine: {
              id: value,
            },
          },
        }));
      }
    }
    this.setState({ errors: errors });
  }

  componentDidMount() {
    this.getAllDomaines();
    this.getAllSkills();
  }

  onChangeSkills(e) {
      /**
       * TODO: Required min 1
       */
    console.log("e", e);
    this.setState((prevState) => ({
      currentFormation: {
        ...prevState.currentFormation,
        competences: e,
      },
    }));
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
    const json = JSON.stringify(this.state.currentFormation)
      .split('"value":')
      .join('"id":');
    const data = JSON.parse(json);
    formationsService
      .save(data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { domains, skills, currentFormation, currentErrors } = this.state;
    console.log("errors", this.state);
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
                  <label htmlFor="duration">Durée *</label>
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
                  <label htmlFor="price">Prix *</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    id="price"
                    onChange={this.handleChange}
                    required
                  />
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
                    onChange={this.handleChange}
                  >
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
                  <label htmlFor="skills">Compétences</label>
                  <Select
                    name="skills"
                    placeholder="Liste des compétences"
                    value={
                      Object.entries(currentFormation.competences).length === 0
                        ? null
                        : currentFormation.competences
                    }
                    options={skills.map((e) => ({ label: e.nom, value: e.id }))}
                    onChange={this.onChangeSkills}
                    isMulti
                  />
                </div>
              </div>
            </div>

            <CButton type="submit" block color="info">
              Ajout d'une formation
            </CButton>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateFormation;
