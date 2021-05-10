import { CButton, CSelect } from "@coreui/react";
import React, { Component } from "react";
import AdressesService from "../../services/adresses.service";
import EntreprisesService from "../../services/entreprises.service";
import { withRouter } from "react-router-dom";

class CreateEntreprise extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.getAllAdresses = this.getAllAdresses.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.saveEntreprise = this.saveEntreprise.bind(this);
    //this.deleteTutorial = this.deleteTutorial.bind(this;=);

    this.state = {
      adresses: [],
      currentEntreprise: {
        id: null,
        nom: "",
        adresse: {
          id: null,
        },
        version: null,
      },
      message: "",
      submitted: false,
      error: true,
      errorEmptyNom: "",
      errorEmptyAdresse: "",
    };
  }

  componentDidMount() {
    this.getAllAdresses();
  }

  onChangeNom(e) {
    const nom = e.target.value;
    if (0 !== this.state.currentEntreprise.nom.length) {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          nom: nom,
        },
        error: false,
        errorEmptyNom: "",
      }));
    } else {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          nom: nom,
        },
        error: true,
        errorEmptyNom: "Le nom est vide",
      }));
    }
  }

  onChangeAdresse(e) {
    const idAdresse = e.target.value;
    console.log(idAdresse);
    if (idAdresse !== "0" || !idAdresse) {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          adresse: {
            id: idAdresse,
          },
        },
        error: false,
        errorEmptyAdresse: "",
      }));
    } else {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          adresse: {
            id: idAdresse,
          },
        },
        error: true,
        errorEmptyAdresse: "Veuillez sélectionner une adresse",
      }));
    }
  }

  getAllAdresses() {
    AdressesService.getAllAdresse()
      .then((response) => {
        this.setState({
          adresses: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveEntreprise() {
    if (!this.state.currentEntreprise.nom || 0 === this.state.currentEntreprise.nom.length) {
      this.setState({
        error: true,
        errorEmptyNom: "Le nom est vide",
      });
    }
    if (
      this.state.currentEntreprise.adresse.id === undefined ||
      this.state.currentEntreprise.adresse.id === null ||
      this.state.currentEntreprise.adresse.id === "0"
    ) {
      this.setState({
        error: true,
        errorEmptyAdresse: "Veuillez sélectionner une adresse",
      });
    }
    if (this.state.error === false && this.state.errorEmptyAdresse === "" && this.state.errorEmptyNom === "") {
      var data = {
        nom: this.state.currentEntreprise.nom,
        adresse: {
          id: this.state.currentEntreprise.adresse.id,
        },
      };
      EntreprisesService.save(data)
        .then((response) => {
          this.setState({
            id: response.data.id,
            submitted: true,
          });
          this.props.history.push("/entreprises/liste");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    const {
      currentEntreprise,
      adresses,
      errorEmptyNom,
      errorEmptyAdresse,
    } = this.state;

    return (
      <div className="submit-form">
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  placeholder="Saisir un nom d'entreprise"
                  className="form-control"
                  id="nom"
                  value={currentEntreprise.nom}
                  onChange={this.onChangeNom}
                  required
                />
                <span className="text-danger">{errorEmptyNom}</span>
              </div>

              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <CSelect
                  custom
                  name="adresse"
                  id="adresse"
                  onChange={this.onChangeAdresse}
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
                <span className="text-danger">{errorEmptyAdresse}</span>
              </div>
            </form>
            <CButton
              type="submit"
              block
              color="info"
              onClick={this.saveEntreprise}
            >
              Créer une entreprise
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}

export default withRouter(CreateEntreprise);
