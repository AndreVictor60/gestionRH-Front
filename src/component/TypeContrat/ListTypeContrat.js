import { CButton, CSelect } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import TypeContratService from "../../services/type-contrat.service";
import ReactPaginate from "react-paginate";

class ListTypeContrat extends Component {
  constructor(props) {
    super(props);
    this.retrieveTypeContrat = this.retrieveTypeContrat.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.searchType = this.searchType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      typescontrat: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
      searchExpression: ""
    };
  }

  componentDidMount() {
    this.retrieveTypeContrat();
  }

  retrieveTypeContrat() {
    TypeContratService.count(this.state.searchExpression)
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    TypeContratService.getAllTypeContratByPageAndKeyword(
      this.state.currentPage,
      this.state.itemsPerPage,
      this.state.searchExpression
    )
      .then((response) => {
        this.setState({
          typescontrat: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({ currentPage: selected }, () => {
      this.retrieveTypeContrat();
    });
  };

  searchType(e) {
    e.preventDefault();
    this.setState({ currentPage: 0 }, () => {
      this.retrieveTypeContrat();
    });
  }

  ifdelete(typecontrat) {
    swal({
      title: "Êtes-vous sûrs ?",
      text:
        "Voulez-vous supprimer se type de contrat : '" +
        typecontrat.type +
        "' ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.deleteTypeContrat(typecontrat.id);
        swal("Suppression bien prise en compte !", {
          icon: "success",
        });
      }
    });
  }

  deleteTypeContrat(id) {
    TypeContratService.delete(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          retrieveTypeContrat: response.data, //suppression OK
          typescontrat: this.state.typescontrat.filter((tp) => tp.id !== id),
        });
      })
      .catch((e) => {
        this.setState({
          message: e.message,
        });
        console.log(e);
      });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "searchExpression") {
      this.setState({searchExpression: value}) 
    }
    if( name === "nbPage"){
      this.setState({itemsPerPage: value}, () => {this.retrieveTypeContrat();}) 
    }
  }

  render() {
    const { typescontrat } = this.state;
    return (
      <>
      <div className="row justify-content-between mt-4">
          <form name="searchEmployee" onSubmit={this.searchType} className="col-md-8">
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {typescontrat.map((typecontrat) => (
                  <tr key={typecontrat.id}>
                    <td>{typecontrat.type}</td>
                    <td>
                      <Link to={"/type-contrat/modification/" + typecontrat.id}>
                        <CButton
                          className="mr-2"
                          color="info"
                          title="Vous voulez modifier cette ligne ?"
                        >
                          Modifier
                        </CButton>
                      </Link>
                      <CButton
                        color="danger"
                        onClick={() => this.ifdelete(typecontrat)}
                        title="Vous voulez supprimer cette ligne ?"
                      >
                        {" "}
                        Supprimer
                      </CButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"Précédent"}
              nextLabel={"Suivant"}
              breakLabel={"..."}
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

export default ListTypeContrat;
