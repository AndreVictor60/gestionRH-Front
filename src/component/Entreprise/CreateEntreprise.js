import { CAlert, CButton, CSelect } from "@coreui/react";
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
    this.state = {
      adresses: [],
      currentErrors: {
        name: null,
        nameBool: null,
        address: null,
        addressBool: null
      },
      currentEntreprise: {
        id: null,
        nom: "",
        adresse: {
          id: null,
        },
        version: null,
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
    this.getAllAdresses();
  }

  onChangeNom(e) {
    const nom = e.target.value;
    if (nom === "" || nom === null || nom.length === 0) {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          nom: nom,
        },
        currentErrors: {
          ...prevState.currentErrors,
          name: "Le champ nom est requis.",
          nameBool: true
        }
      }));
    } else {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          nom: nom,
        },
        currentErrors: {
          ...prevState.currentErrors,
          name: null,
          nameBool: false
        }
      }));
    }
  }

  onChangeAdresse(e) {
    const idAdresse = e.target.value;
    if (idAdresse !== "0" || !idAdresse) {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          adresse: {
            id: idAdresse,
          },
        },
        currentErrors: {
          ...prevState.currentErrors,
          address: null,
          addressBool: false
        }
      }));
    } else {
      this.setState((prevState) => ({
        currentEntreprise: {
          ...prevState.currentEntreprise,
          adresse: {
            id: idAdresse,
          },
        },
        currentErrors: {
          ...prevState.currentErrors,
          address: "Veuillez sélectionner une adresse",
          addressBool: true
        }
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
    if(this.state.currentErrors.nameBool && this.state.currentErrors.addressBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      EntreprisesService.save(this.state.currentEntreprise)
        .then((response) => {
          this.setState({
            id: response.data.id,
            message: "Création bien prise en compte ! Redirection vers la liste de entreprise.",
            ifError: false
          });
          window.setTimeout(() => {this.props.history.push("/entreprises/liste")}, 3000);
        })
        .catch((e) => {
          this.setState({
            message: e.message,
            ifError: true
            });
        });
    }
  }

  render() {
    const {currentEntreprise,adresses,currentErrors,message,ifError} = this.state;
    return (
      <div className="submit-form">
          <div>
            <form name="createCompany" onSubmit={this.saveEntreprise}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" placeholder="Saisir un nom d'entreprise" className="form-control" id="name" value={currentEntreprise.nom} onChange={this.onChangeNom} required />
                <span className="text-danger">{currentErrors.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <CSelect custom name="adresse" id="adresse" onChange={this.onChangeAdresse}>
                  <option value="0">Veuillez sélectionner une adresse</option>
                  {adresses.map((adresse, key) => (
                    <option key={key} value={adresse.id}>
                      {adresse.numero + " " + adresse.voie + " " + adresse.ville}
                    </option>
                  ))}
                </CSelect>
                <span className="text-danger">{currentErrors.address}</span>
              </div>
              <CButton type="submit" block color="info">
              Créer une entreprise
            </CButton>
            </form>
            {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
          </div>
      </div>
    );
  }
}

export default withRouter(CreateEntreprise);
