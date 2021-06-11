import React, { Component } from "react";
import { Link } from "react-router-dom";
import SalariesService from "../../services/salaries.service";
import { compareDateStringWithDateCurrent } from '../../utils/fonctions';
class ListSalarie extends Component {
    constructor(props) {
      super(props);
      this.retrieveSalaries = this.retrieveSalaries.bind(this);
      this.state = {
        salaries: []
      };
    }
    
    componentDidMount() {
      this.retrieveSalaries();
    }
  
    retrieveSalaries() {
        SalariesService.getAll()
        .then(response => {
          this.setState({
            salaries: response.data
          });
          console.log("response.data",response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    render() {
        const { salaries } = this.state;
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Nom prénom</th>
                      <th>Type de contrat</th>
                        <th>Poste</th>
                        <th>Manager</th>
                        <th>Entreprise du poste</th>
                        <th>Modifier</th>
                      </tr>
                    </thead>
                    <tbody>
                    {salaries.map( salarie => 
                      <tr key={salarie.id}>
                        <td>{salarie.nom + " " + salarie.prenom}</td>
                        <td>{salarie.postes.length !== 0 ? compareDateStringWithDateCurrent(salarie.postes[0].dateFin) ? (salarie.postes[0].typeContrat.type) : "" : ""}</td>
                        <td>{salarie.postes.length !== 0 ? compareDateStringWithDateCurrent(salarie.postes[0].dateFin) ? (salarie.postes[0].titrePoste.intitule) : "" : ""}</td>
                        <td>{salarie.postes.length !== 0 ? compareDateStringWithDateCurrent(salarie.postes[0].dateFin) ? (salarie.postes[0].manager === null) ? (salarie.postes[0].manager.nom + " " + salarie.postes[0].manager.prenom) : "" : "" : ""}</td>
                        <td>{salarie.postes.length !== 0 ? compareDateStringWithDateCurrent(salarie.postes[0].dateFin) ? (salarie.postes[salarie.postes.length - 1].lieuTravail.nom) : "" : ""}</td>
                        <td><Link to={"/salaries/modification/" + salarie.id}>Modifier</Link></td>
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

export default ListSalarie;