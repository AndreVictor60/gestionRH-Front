import React, { Component } from "react";
import EntretienService from "../../services/entretien.service"
import moment from 'moment';
import momentFR from 'moment/locale/fr';
import { Link } from "react-router-dom";

class ListEntretien extends Component {
    constructor(props) {
      super(props);
      this.retrieveEntretien = this.retrieveEntretien.bind(this);
      this.state = {
        entretiens: []
      };
      moment.locale('fr',momentFR );
    }

    componentDidMount() {
        this.retrieveEntretien();
    }

    retrieveEntretien() {
      EntretienService.getAllEntretiens()
        .then(response => {
          this.setState({
            entretiens: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    render() {
      
        const { entretiens } = this.state;
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered ">
                  <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Date / heure</th>
                        <th>Compte rendu</th>
                        <th>Salarie (Prenom-Nom)</th>
                        <th>Manager  (Prenom-Nom)</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {entretiens.map( entretien => 
                        <tr key={entretien.id}>
                            <td>{entretien.id}</td>
                            <td>{moment(entretien.dateEntretien).format("llll")}</td>
                            <td>{entretien.compteRendu === null ? "Aucun" : entretien.compteRendu.compteRendu}</td>
                            <td>{` ${entretien.salarie.prenom} ${entretien.salarie.nom}`}</td>
                            <td>{`${entretien.managerEntretien.prenom} ${entretien.managerEntretien.nom}`}</td>
                            <td><Link to={"/entretiens/modification/" + entretien.id}>Modifier</Link></td>
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

export default ListEntretien;