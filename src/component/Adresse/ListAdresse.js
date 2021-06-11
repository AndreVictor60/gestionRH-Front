import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdressesService from "../../services/adresses.service";

class ListAdresse extends Component {
    constructor(props) {
      super(props);
      this.retrieveAdresses = this.retrieveAdresses.bind(this);
      this.state = {
        adresses: []
      };
    }

    componentDidMount() {
        this.retrieveAdresses();
    }

    retrieveAdresses() {
        AdressesService.getAllAdresse()
        .then(response => {
          this.setState({
            adresses: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    render() {
        const { adresses } = this.state;
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered ">
                  <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Voie</th>
                        <th>Complément</th>
                        <th>Ville</th>
                        <th>Code Postal</th>
                        <th>Pays</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {adresses.map( adresse => 
                        <tr key={adresse.id}>
                            <td>{adresse.numero}</td>
                            <td>{adresse.voie}</td>
                            <td>{adresse.complementAdresse !== null ? adresse.complementAdresse : " "}</td>
                            <td>{adresse.ville}</td>
                            <td>{adresse.codePostal}</td>
                            <td>{adresse.pays}</td>
                            <td><Link to={"/adresses/modification/" + adresse.id}><CButton  className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link></td>
                        </tr>
                      )}
                      </tbody>
                  </table>
                </div>
            </div>
          </>
      );
        
    }
}

export default ListAdresse;