import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import FormationService from '../../services/formations.service';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
class ListFormation extends Component {
    constructor(props) {
        super(props);
        this.retrieveFormation = this.retrieveFormation.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state={
            formations: [],
            itemsPerPage: 5,
            currentPage: 0,
            pageCount: 0,
            firstDate: "2020-04-02",
            lastDate:"2021-05-16"
        }
    }

    componentDidMount(){
        this.retrieveFormation();
    }

    retrieveFormation() {
      FormationService.countFormation(this.state.firstDate,this.state.lastDate).then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage)
        this.setState({pageCount: nbPage })
        console.log(resp.data)
     }).catch((e) => { console.log(e)});
        FormationService.getFormationPeriodByPage(this.state.currentPage,this.state.itemsPerPage,this.state.firstDate,this.state.lastDate)
        .then(response => {
            this.setState({
                formations: response.data
            })
            console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        });
    }

    handlePageClick = (data) => {
      let selected = data.selected;
      this.setState({ currentPage: selected }, () => {
        this.retrieveFormation();
      });
    };
    
    render() {
        const { formations } = this.state;
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
                  <ReactPaginate
              previousLabel={'Précédent'}
              nextLabel={'Suivant'}
              breakLabel={'...'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={4}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              pageLinkClassName="page-link"
              breakLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              pageClassName="page-item"
              breakClassName="page-item"
              nextClassName="page-item"
              previousClassName="page-item"
            />
                </div>
            </div>
        )
    }
}

export default ListFormation
