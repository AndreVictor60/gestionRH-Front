import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import RoleService from "../../services/role.service";
import ReactPaginate from "react-paginate";

class ListRole extends Component {
  constructor(props) {
    super(props);
    this.retrieveRole = this.retrieveRole.bind(this);
    this.ifdelete = this.ifdelete.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      roles: [],
      itemsPerPage: 5,
      currentPage: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    this.retrieveRole();
  }

  retrieveRole() {
    RoleService.countRole()
      .then((resp) => {
        let nbPage = Math.ceil(resp.data / this.state.itemsPerPage);
        this.setState({ pageCount: nbPage });
      })
      .catch((e) => {
        console.log(e);
      });
    RoleService.getAllRolesPage(this.state.currentPage, this.state.itemsPerPage)
      .then((response) => {
        this.setState({
          roles: response.data,
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
      this.retrieveRole();
    });
  };
  ifdelete(role) {
    swal({
      title: "Êtes-vous sûrs ?",
      text: "Voulez-vous supprimer se rôle : '" + role.titre + "' ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        RoleService.deleteById(role.id)
          .then((resp) => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveRole: resp.data, //suppression OK
              roles: this.state.roles.filter((r) => r.id !== role.id),
            });
          })
          .catch((e) => {
            swal(e + "\nCe rôle est utilisé.", {
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
    const { roles } = this.state;
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
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.titre}</td>
                    <td>
                      <Link to={"/role/modification/" + role.id}>
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
                        onClick={() => this.ifdelete(role)}
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

export default ListRole;
