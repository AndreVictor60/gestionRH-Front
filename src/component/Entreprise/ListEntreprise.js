import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntreprisesService from "../../services/entreprises.service";
import ReactPaginate from 'react-paginate';
class ListEntreprise extends Component {
  constructor(props) {
    super(props);
    this.retrieveEntreprise = this.retrieveEntreprise.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      entreprises: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0
    };
  }

  componentDidMount() {
    this.retrieveEntreprise();
  }

  retrieveEntreprise() {
    EntreprisesService.count().then((resp) => {
      let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
      this.setState({ pageCount: nbPage })
    }).catch((e) => { console.log(e) });
    EntreprisesService.getAllEntreprisesPage(this.state.currentPage, this.state.itemsPerPage)
      .then(response => {
        this.setState({
          entreprises: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentPage: selected }, () => {
      this.retrieveEntreprise();
    });
  };


  render() {
    const { entreprises } = this.state;
    return (
      <>
        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Complément</th>
                  <th>Ville</th>
                  <th>Pays</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {entreprises.map(entreprises =>
                  <tr key={entreprises.id}>
                    <td>{entreprises.nom}</td>
                    <td>{entreprises.adresse.numero + " " + entreprises.adresse.voie}</td>
                    <td>{entreprises.adresse.complementAdresse}</td>
                    <td>{entreprises.adresse.ville + " " + entreprises.adresse.codePostal}</td>
                    <td>{entreprises.adresse.pays}</td>
                    <td><Link to={"/entreprises/modification/" + entreprises.id}>Modifier</Link></td>
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

export default ListEntreprise;