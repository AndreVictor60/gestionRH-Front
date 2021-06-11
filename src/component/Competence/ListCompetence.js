import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import CompetenceService from "../../services/competence.service";
import ReactPaginate from "react-paginate";

class ListCompetence extends Component {
  constructor(props) {
    super(props);
    this.retrieveCompetence = this.retrieveCompetence.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.ifdelete = this.ifdelete.bind(this);
    this.state = {
      competences: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveCompetence();
  }

  retrieveCompetence() {
    CompetenceService.countCompetence()
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    CompetenceService.getAllComptenceByPage(
      this.state.currentPage,
      this.state.itemsPerPage
    )
      .then((response) => {
        this.setState({
          competences: response.data,
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
      this.retrieveCompetence();
    });
  };

  ifdelete(competence) {
    swal({
      title: "Êtes-vous sûrs ?",
      text:
        "Voulez-vous supprimer cette compétence : '" +
        competence.nom +
        "' appartenant au(x) dommaine(s) : " +
        competence.domaines.map((domaine) => domaine.titre + ", ") +
        "?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        CompetenceService.deleteById(competence.id)
          .then((resp) => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveCompetence: resp.data, //suppression OK
              competences: this.state.competences.filter(
                (c) => c.id !== competence.id
              ),
            });
          })
          .catch((e) => {
            swal(e + "\nCette compétence est utilisée.", {
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
    const { competences } = this.state;
    return (
      <>
        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Compétence</th>
                  <th>Domaine</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {competences.map((competence) => (
                  <tr key={competence.id}>
                    <td>{competence.nom}</td>
                    <td>
                      {competence.domaines.map(
                        (domaine) => domaine.titre + ", "
                      )}
                    </td>
                    <td>
                      <Link to={"/competence/modification/" + competence.id}>
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
                        onClick={() => this.ifdelete(competence)}
                        title="Vous voulez supprimer cette ligne ?"
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

export default ListCompetence;
