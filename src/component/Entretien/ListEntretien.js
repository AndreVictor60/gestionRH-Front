import React, { Component } from "react";
import EntretienService from "../../services/entretien.service"
import moment from 'moment';
import momentFR from 'moment/locale/fr';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

class ListEntretien extends Component {
    constructor(props) {
      super(props);
      this.retrieveEntretien = this.retrieveEntretien.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);
      this.state = {
        entretiens: [],
        itemsPerPage: 5,
        currentPage: 0,
        pageCount: 0,
        searchExpression: ""
      };
      moment.locale('fr',momentFR );
    }

    componentDidMount() {
        this.retrieveEntretien();
    }

    retrieveEntretien() {
      EntretienService.count().then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage)
        this.setState({pageCount: nbPage })
     }).catch((e) => { console.log(e)});
      EntretienService.getAllEntretiensByPage(this.state.currentPage,this.state.itemsPerPage)
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

    handlePageClick = (data) => {
      let selected = data.selected;
      this.setState({ currentPage: selected }, () => {
        this.retrieveEntretien();
      });
    };
  
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
          </>
      );
        
    }
}

export default ListEntretien;