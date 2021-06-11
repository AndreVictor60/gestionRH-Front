import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import FormationService from '../../services/formations.service';
import Pagination from '../Pagination/Pagination';
import moment from 'moment';
class ListFormation extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state={
            formations: [],
            currentPage: 0,
            sizePage: 10,
            nbTotalFormations: 0,
            nbTotalPage: 0
        }
    }

    componentDidMount(){
        this.retrieveFormation(this.state.currentPage);
        this.getNbTotalFormation();
    }
    handleClick(pageNum) {
      this.setState({ currentPage: pageNum });
      this.retrieveFormation(pageNum);
  }
    
    getNbTotalFormation(){
        FormationService.countFormation().then(resp => {
          this.setState({
            nbTotalFormations: resp.data
          }); 
        })
      }

    retrieveFormation(pageNum) {
        FormationService.getAllFormationByPage(pageNum,this.state.sizePage)
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
        const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    
        const prevPage = () => this.setState({ currentPage: currentPage - 1 });
        return (
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Date de début</th>
                        <th>Date de fin</th>
                        <th>Durée<span><small><i>(en heure)</i></small></span></th>
                        <th>Prix<span><small><i>(TTC)</i></small></span></th>
                        <th></th>
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
                            <td>{formation.prix} €</td>
                            <td><Link to={"/formations/voir/" + formation.id}>Voir</Link></td>
                            <td><Link to={"/formations/modification/" + formation.id}>Modifier</Link></td>
                        </tr>
                      )}
                      </tbody>
                  </table>
                  <Pagination totalPages={nbPage} currentPage={currentPage}  paginate={this.handleClick} nextPage={nextPage} prevPage={prevPage} ></Pagination>
                </div>
            </div>
        )
    }
}

export default ListFormation
