import { CButton } from "@coreui/react";
import React, { Component } from "react";
import AdressesService from "../../services/adresses.service";
import { withRouter } from "react-router-dom";

class UpdateAdresse extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumero = this.onChangeNumero.bind(this);
    this.onChangeVoie = this.onChangeVoie.bind(this);
    this.onChangeComplementAdresse = this.onChangeComplementAdresse.bind(this);
    this.onChangeVille = this.onChangeVille.bind(this);
    this.onChangeCodePostal = this.onChangeCodePostal.bind(this);
    this.onChangePays = this.onChangePays.bind(this);
    this.getAdresse = this.getAdresse.bind(this);
    this.updateAdresse = this.updateAdresse.bind(this);
    //this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentAdresse: {
        id: null,
        numero: "",
        voie: "",
        complementAdresse: "",
        ville: "",
        codePostal: "",
        pays: "",
        version: null
      },
      message: ""
    };
  }

  componentDidMount() {
   this.getAdresse(this.props.adresseid.id);
  }

  onChangeNumero(e) {
    const numero = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdresse: {
          ...prevState.currentAdresse,
          numero: numero
        }
      };
    });
  }

  onChangeVoie(e) {
    const voie = e.target.value;
    
    this.setState(prevState => ({
        currentAdresse: {
        ...prevState.currentAdresse,
        voie: voie
      }
    }));
  }
  onChangeComplementAdresse(e) {
    const complementAdresse = e.target.value;
    
    this.setState(prevState => ({
        currentAdresse: {
        ...prevState.currentAdresse,
        complementAdresse: complementAdresse
      }
    }));
  }
  onChangeVille(e) {
    const ville = e.target.value;
    
    this.setState(prevState => ({
        currentAdresse: {
        ...prevState.currentAdresse,
        ville: ville
      }
    }));
  }
  onChangeCodePostal(e) {
    const codePostal = e.target.value;
    
    this.setState(prevState => ({
        currentAdresse: {
        ...prevState.currentAdresse,
        codePostal: codePostal
      }
    }));
  }
  onChangePays(e){
    const pays = e.target.value;
    
    this.setState(prevState => ({
        currentAdresse: {
        ...prevState.currentAdresse,
        pays: pays
      }
    }));
  }

  getAdresse(id) {
    AdressesService.getAdresseById(id)
      .then(response => {
        this.setState({
            currentAdresse: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateAdresse() {
    AdressesService.update(
      this.state.currentAdresse
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentAdresse: response.data,
            message: "Modification bien prise en compte !"
        });
        this.props.history.push("/adresses/liste");
      })
      .catch(e => {
        this.setState({
            message: e.message
          });
        console.log(e);
      });
  }


  render() {
    const { currentAdresse } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="numero">Numéro</label>
                <input type="text" className="form-control" id="numero" value={currentAdresse.numero} onChange={this.onChangeNumero}/>
              </div>
              <div className="form-group">
                <label htmlFor="voie">Voie</label>
                <input type="text" className="form-control" id="voie" value={currentAdresse.voie} onChange={this.onChangeVoie}  />
              </div>
              <div className="form-group">
                <label htmlFor="cpltAdresse">Complément d'adresse</label>
                <input type="text" className="form-control" id="cpltAdresse" value={currentAdresse.complementAdresse}  onChange={this.onChangeComplementAdresse} />
              </div>
              <div className="form-group">
                <label htmlFor="town">Ville</label>
                <input type="text" className="form-control" id="ville" value={currentAdresse.ville} onChange={this.onChangeVille} />
              </div>
              <div className="form-group">
                <label htmlFor="codePostal">Code Postal</label>
                <input type="text" className="form-control" id="codePostal" value={currentAdresse.codePostal} onChange={this.onChangeCodePostal} />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Pays</label>
                <input type="text" className="form-control" id="pays" value={currentAdresse.pays}  onChange={this.onChangePays}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateAdresse}>
                Modifier
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}

export default withRouter(UpdateAdresse);