//import { CButton } from "@coreui/react";
import React, { Component } from "react";
import EntreprisesService from "../../services/entreprises.service";
import AdressesService from "../../services/adresses.service";
import { CAlert, CButton, CSelect } from "@coreui/react";
import { withRouter } from "react-router-dom";

class UpdateEntreprise extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.getEntreprise = this.getEntreprise.bind(this);
    this.getAllAdresses = this.getAllAdresses.bind(this);
    this.updateEntreprise = this.updateEntreprise.bind(this);
    this.state = {
      currentErrors: {
        name: null,
        nameBool: null,
        address: null,
        addressBool: null
      },
        adresses: [],
        currentEntreprise: {
            id: null,
            nom: "",
            adresse: {
                id: null
            },
            version: null
        },
        message: "",
        ifError: null
    };
  }

  componentDidMount() {
   this.getEntreprise(this.props.entrepriseid.id);
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
  
  getEntreprise(id) {
    EntreprisesService.getEntrepriseById(id)
      .then(response => {
        this.setState({
            currentEntreprise: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getAllAdresses() {
    AdressesService.getAllAdresse()
    .then(response => {
      this.setState({
        adresses: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
}


  updateEntreprise(e) {
    e.preventDefault();
    if(this.state.currentErrors.nameBool && this.state.currentErrors.addressBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: false
      });
    }else{
      EntreprisesService.update(this.state.currentEntreprise)
        .then(response => {
          this.setState({
              currentEntreprise: response.data,
              message: "Création bien prise en compte ! Redirection vers la liste de entreprise.",
              ifError: true
          });
          window.setTimeout(() => {this.props.history.push("/entreprises/liste")}, 3000);
        })
        .catch(e => {
          this.setState({
            message: e.message,
            ifError: true
          });
        });
    }
  }


  render() {
    const { currentEntreprise, adresses, currentErrors,message,ifError } = this.state;
    return (
        <div>
          <div className="edit-form">
            <form name="updateCompany" onSubmit={this.updateEntreprise}>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" className="form-control" id="nom" value={currentEntreprise.nom} onChange={this.onChangeNom}/>
                <span className="text-danger">{currentErrors.name}</span>
              </div>
              
              <div className="form-group">
                    <CSelect value={currentEntreprise.adresse.id === null ? 1 : currentEntreprise.adresse.id } custom name="adresse" id="adresse" onChange={this.onChangeAdresse}>
                        <option  disabled value="0">Veuillez sélectionner une adresse</option>
                            {adresses.map((adresse) => (
                            <option key={adresse.id} value={adresse.id}>{adresse.numero + " " + adresse.voie + " " +adresse.ville}</option>
                            ))}
                    </CSelect>
                    <span className="text-danger">{currentErrors.address}</span>
              </div>
              <CButton type="submit" block  color="info" >
                Modifier
              </CButton>
            </form>
            {ifError != null && <CAlert color={ifError ? "success" : "danger"}>{message}</CAlert>}
          </div>
        </div>
    );
  }
}

export default withRouter(UpdateEntreprise)

/**
 * TODO :
 * 
 *  Select Adresse faut le trier par VILLE 
 */