import { CButton, CSelect } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AdressesService from "../../services/adresses.service";

class CreateSalarie extends Component {
    constructor(props){
        super(props);
        this.getAllAdresses = this.getAllAdresses.bind(this);
        this.state = {
            adresses: []
        };
    }

    componentDidMount() {
        this.getAllAdresses();
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

    render() {
        const {adresses} = this.state;
        return (
            <div className="submit-form">
            <div>
            <form>
              <div className="form-group">
                <label htmlFor="numero">Nom</label>
                <input type="text" className="form-control" id="firstName" />
              </div>
              <div className="form-group">
                <label htmlFor="voie">Prénom</label>
                <input type="text" className="form-control" id="voie" />
              </div>
              <div className="form-group">
                <label htmlFor="cpltAdresse">Email</label>
                <input type="text" className="form-control" id="cpltAdresse" />
              </div>
              <div className="form-group">
                <label htmlFor="town">Mot de passe</label>
                <input type="text" className="form-control" id="ville"  />
              </div>
              <div className="form-group">
                <label htmlFor="codePostal">Tél. perso</label>
                <input type="text" className="form-control" id="codePostal"  />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Tél. Mobile perso</label>
                <input type="text" className="form-control" id="pays"/>
              </div>
              <div className="form-group">
                <label htmlFor="codePostal">Tél. pro</label>
                <input type="text" className="form-control" id="codePostal"  />
              </div>
              <div className="form-group">
                <label htmlFor="pays">Tél. Mobile pro</label>
                <input type="text" className="form-control" id="pays"/>
              </div>
              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <CSelect custom name="adresse" id="adresse" onChange={this.onChangeAdresse}>
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
            </form>
            <CButton type="submit" block  color="info">
                Créer une adresse
            </CButton>
            </div>
        </div>
        )
    }
}
export default withRouter(CreateSalarie);
