//import { CButton } from "@coreui/react";
import React, { Component } from "react";
import EntreprisesService from "../../services/entreprises.service";
import AdressesService from "../../services/adresses.service";
import { CButton, CSelect } from "@coreui/react";
import { withRouter } from "react-router-dom";

class UpdateEntreprise extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.getEntreprise = this.getEntreprise.bind(this);
    this.getAllAdresses = this.getAllAdresses.bind(this);
    this.updateEntreprise = this.updateEntreprise.bind(this);
    //this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
        adresses: [],
        currentEntreprise: {
            id: null,
            nom: "",
            adresse: {
                id: null
            },
            version: null
        },
        error: false,
        message: ""
    };
  }

  componentDidMount() {
   this.getEntreprise(this.props.entrepriseid.id);
   this.getAllAdresses();
  }

  onChangeNom(e) {
    const nom = e.target.value;
    if (0 !== nom.length) {
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
    this.setState(prevState => ({
        currentEntreprise: {
        ...prevState.currentEntreprise,
        adresse: {
            id: idAdresse
        } 
      }
    }));
    
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


  updateEntreprise() {
    if (!this.state.currentEntreprise.nom ||0 === this.state.currentEntreprise.nom.length)
    {
      this.setState({
        error: true,
        errorEmptyNom: "Le nom est vide",
      });
    }
    if (this.state.error === false) {
      EntreprisesService.update(
        this.state.currentEntreprise
      )
        .then(response => {
          this.setState({
              currentEntreprise: response.data,
              message: "Modification bien prise en compte !"
          });
          this.props.history.push("/entreprises/liste");
        })
        .catch(e => {
          this.setState({
              message: e.message
            });
          console.log(e);
        });
    }
  }


  render() {
    const { currentEntreprise, adresses, errorEmptyNom } = this.state;
    return (
        <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" className="form-control" id="nom" value={currentEntreprise.nom} onChange={this.onChangeNom}/>
                <span className="text-danger">{errorEmptyNom}</span>
              </div>
              
              <div className="form-group">
                    <CSelect value={currentEntreprise.adresse.id === null ? 1 : currentEntreprise.adresse.id } custom name="adresse" id="adresse" onChange={this.onChangeAdresse}>
                        <option  disabled value="0">Veuillez sélectionner une adresse</option>
                            {adresses.map((adresse) => (
                            <option key={adresse.id} value={adresse.id}>{adresse.numero + " " + adresse.voie + " " +adresse.ville}</option>
                            ))}
                    </CSelect>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateEntreprise}>
                Modifier
            </CButton>
            <p>{this.state.message}</p>
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