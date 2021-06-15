import React, { Component } from "react";
import { CButton,CSelect } from "@coreui/react";
import { Link } from "react-router-dom";
import EntreprisesService from "../../services/entreprises.service";
import ReactPaginate from 'react-paginate';
class ListEntreprise extends Component {
  constructor(props) {
    super(props);
    this.retrieveEntreprise = this.retrieveEntreprise.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchEntreprise = this.searchEntreprise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      entreprises: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
      searchExpression: ""
    };
  }

  componentDidMount() {
    this.retrieveEntreprise();
  }

  retrieveEntreprise() {
    EntreprisesService.count(this.state.searchExpression).then((resp) => {
      let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
      this.setState({ pageCount: nbPage })
    }).catch((e) => { console.log(e) });
    EntreprisesService.getAllEntreprisesPageAndKeyword(this.state.currentPage, this.state.itemsPerPage,this.state.searchExpression)
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

  searchEntreprise(e) {
    e.preventDefault();
    this.setState({ currentPage: 0 },() => {this.retrieveEntreprise();});
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "searchExpression") {
      this.setState({searchExpression: value}) 
    }
    if( name === "nbPage"){
      this.setState({itemsPerPage: value}, () => {this.retrieveEntreprise();}) 
    }
  }


  render() {
    const { entreprises } = this.state;
    return (
      <>
        <div className="row justify-content-between mt-4">
          <form name="searchEmployee" onSubmit={this.searchEntreprise} className="col-md-8">
            <div className="input-group mb-2">
              <input type="text" id="search-expression"
                name="searchExpression" placeholder="Saisir votre recherche.." onChange={this.handleChange} className="form-control" />
              <span className="input-group-prepend">
              <CButton type="submit" block color="info">
                Recherche
              </CButton>
              </span>
            </div>
          </form>
          <form name="nbPageForm" className="col-md-2 ">
          <CSelect
                    custom
                    name="nbPage"
                    id="nbPage"
                    onChange={this.handleChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </CSelect>
          </form>
        </div>
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
              forcePage={this.state.currentPage}
            />
          </div>
        </div>
      </>
    );

  }
}

export default ListEntreprise;