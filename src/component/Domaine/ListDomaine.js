import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DomaineService from "../../services/domaine.service";
import ReactPaginate from "react-paginate";

class ListDomaine extends Component {
  constructor(props) {
    super(props);
    this.retrieveDomaine = this.retrieveDomaine.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.ifdelete = this.ifdelete.bind(this);
    this.state = {
      domaines: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveDomaine();
  }

  retrieveDomaine() {
    DomaineService.countDomaine()
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    DomaineService.getAllDomaineByPage(
      this.state.currentPage,
      this.state.itemsPerPage
    )
      .then((response) => {
        this.setState({
          domaines: response.data,
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
      this.retrieveDomaine();
    });
  };

  ifdelete(domaine) {
    swal({
      title: "Êtes-vous sûrs ?",
      text: "Voulez-vous supprimer se domaine : '" + domaine.titre + "' ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DomaineService.delete(domaine.id)
          .then((resp) => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveDomaine: resp.data, //suppression OK
              domaines: this.state.domaines.filter((d) => d.id !== domaine.id),
            });
          })
          .catch((e) => {
            swal(e + "\nCe domaine est utilisé.", {
              icon: "error",
            });
            this.setState({
              message: e.message,
            });
            console.log("erreur supression : ", e);
          });
        swal("Suppression bien prise en compte !", {
          icon: "success",
        });
      }
    });
  }

  render() {
    const { domaines } = this.state;
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
                {domaines.map((domaine) => (
                  <tr key={domaine.id}>
                    <td>{domaine.titre}</td>
                    <td>
                      <Link to={"/domaine/modification/" + domaine.id}>
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
                        onClick={() => this.ifdelete(domaine)}
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

export default ListDomaine;
