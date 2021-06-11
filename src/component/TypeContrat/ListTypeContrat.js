import { CButton } from "@coreui/react";
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
    this.state = {
      typescontrat: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveTypeContrat();
  }

  retrieveTypeContrat() {
    TypeContratService.count()
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    TypeContratService.getAllTypeContratByPage(
      this.state.currentPage,
      this.state.itemsPerPage
    )
      .then((response) => {
        this.setState({
          typescontrat: response.data,
        });
        console.log(response.data);
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

  render() {
    const { typescontrat } = this.state;
    return (
      <>
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
            />
          </div>
        </div>
      </>
    );
  }
}

export default ListTypeContrat;
