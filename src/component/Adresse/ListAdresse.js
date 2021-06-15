import { CButton,CSelect } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdressesService from "../../services/adresses.service";
import ReactPaginate from 'react-paginate';

class ListAdresse extends Component {
  constructor(props) {
    super(props);
    this.retrieveAdresses = this.retrieveAdresses.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      adresses: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
      searchExpression: ""
    };
  }

  componentDidMount() {
    this.retrieveAdresses();
  }

  retrieveAdresses() {
    AdressesService.count(this.state.searchExpression).then((resp) => {
      let nbPage = Math.ceil(resp.data / this.state.itemsPerPage)
      this.setState({ pageCount: nbPage })
    }).catch((e) => { console.log(e) });
    AdressesService.getAllAdresseByPageAndKeyword(this.state.currentPage, this.state.itemsPerPage,this.state.searchExpression)
      .then(response => {
        this.setState({
          adresses: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchAddress(e) {
    e.preventDefault();
    this.setState({ currentPage: 0 },() => {this.retrieveAdresses();});
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentPage: selected }, () => {
      this.retrieveAdresses();
    });
  };

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "searchExpression") {
      this.setState({searchExpression: value}) 
    }
    if( name === "nbPage"){
      this.setState({itemsPerPage: value}, () => {this.retrieveAdresses();}) 
    }
  }

  render() {
    const { adresses } = this.state;
    return (
      <>
        <div className="row justify-content-between mt-4">
          <form name="searchEmployee" onSubmit={this.searchAddress} className="col-md-8">
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
                {adresses.map(adresse =>
                  <tr key={adresse.id}>
                    <td>{adresse.numero}</td>
                    <td>{adresse.voie}</td>
                    <td>{adresse.complementAdresse !== null ? adresse.complementAdresse : " "}</td>
                    <td>{adresse.ville}</td>
                    <td>{adresse.codePostal}</td>
                    <td>{adresse.pays}</td>
                    <td><Link to={"/adresses/modification/" + adresse.id}><CButton className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link></td>
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

export default ListAdresse;