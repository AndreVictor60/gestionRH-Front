import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import TitrePosteService from "../../services/titre-poste.service";
import ReactPaginate from "react-paginate";
class ListTitrePoste extends Component {
  constructor(props) {
    super(props);
    this.retrieveTitrePoste = this.retrieveTitrePoste.bind(this);
    this.ifdelete = this.ifdelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      titresPostes: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveTitrePoste();
  }

  retrieveTitrePoste() {
    TitrePosteService.countTitrePoste()
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    TitrePosteService.getAllTitrePosteByPage(
      this.state.currentPage,
      this.state.itemsPerPage
    )
      .then((response) => {
        this.setState({
          titresPostes: response.data,
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
      this.retrieveTitrePoste();
    });
  };

  ifdelete(titrePoste) {
    swal({
      title: "Êtes-vous sûrs ?",
      text:
        "Voulez-vous supprimer cet intitulé de poste : '" +
        titrePoste.intitule +
        "' ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        TitrePosteService.deleteTitrePosteById(titrePoste.id)
          .then((resp) => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveRole: resp.data, //suppression OK
              titresPostes: this.state.titresPostes.filter(
                (tp) => tp.id !== titrePoste.id
              ),
            });
          })
          .catch((e) => {
            swal(e + "\nCet intitulé de poste est utilisé.", {
              icon: "error",
            });
            this.setState({
              message: e.message,
            });
            console.log("erreur supression : ", e);
          });
      }
    });
  }

  render() {
    const { titresPostes } = this.state;
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
                {titresPostes.map((titrePoste) => (
                  <tr key={titrePoste.id}>
                    <td>{titrePoste.intitule}</td>
                    <td>
                      <Link to={"/titre-poste/modification/" + titrePoste.id}>
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
                        onClick={() => this.ifdelete(titrePoste)}
                      >
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

export default ListTitrePoste;
