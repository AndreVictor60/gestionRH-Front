import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import FormationService from '../../services/formations.service';
import Pagination from '../Pagination/Pagination';
import moment from 'moment';
class ListFormation extends Component {
    constructor(props) {
        super(props);
        this.state={
            formations: [],
            currentPage: 0,
            sizePage: 2,
            nbTotalFormations: 0,
            nbTotalPage: 0
        }
    }

    componentDidMount(){
        this.retrieveFormation();
        this.getNbTotalFormation();
    }

    
    getNbTotalFormation(){
        FormationService.countFormation().then(resp => {
          this.setState({
            nbTotalFormations: resp.data
          }); 
        })
      }

    retrieveFormation() {
        FormationService.getAllFormationByPage(0,2)
        .then(response => {
            this.setState({
                formations: response.data
            })
        })
        .catch(e => {
          console.log(e);
        });
    }
    
    render() {
        const { formations,currentPage,nbTotalFormations,sizePage } = this.state;
        const nbPage = Math.ceil(nbTotalFormations / sizePage);
        return (
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Durée</th>
                        <th>Prix</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {formations.map( formation => 
                        <tr key={formation.id}>
                            <td>{formation.titre}</td>
                            <td>{moment(formation.dateDebut).format('DD/MM/YYYY')}</td>
                            <td>{moment(formation.dateFin).format('DD/MM/YYYY')}</td>
                            <td>{formation.duree}</td>
                            <td>{formation.prix}</td>
                            <td><Link to={"/formations/voir/" + formation.id}>Voir</Link></td>
                        </tr>
                      )}
                      </tbody>
                  </table>
                  <Pagination totalPages={nbPage} currentPage={currentPage}  paginate={this.handleClick} ></Pagination>
                </div>
            </div>
        )
    }
}

export default ListFormation
