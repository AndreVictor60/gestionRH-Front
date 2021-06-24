import React, { Component } from "react";
import { withRouter } from "react-router";
import SalariesService from "../../services/salaries.service";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from 'moment';
import momentFR from 'moment/locale/fr';
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';

class Salarie extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.changeProfil = this.changeProfil.bind(this);
    this.state = {
      currentSalarie: {
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        dateNaissance: "",
        telPersonnel: "",
        mobilPersonnel: "",
        telProfessionnel: "",
        mobileProfessionnel: "",
        adresse: {
          id: 0,
          version: null,
        },
        domaine: {
          id: 0,
          version: null,
        },
        entreprise: {
          id: 0,
          version: null,
        },
        postes: [],
        roles: [],
        competences: [],
        formations: [],
        siManager: false,
        version: null,
      },
      errors: {},
      offsetSkill: 0,
      perPageSkill: 5,
      pageCountSkill: 0,
      offsetTraining: 0,
      perPageTraining: 5,
      pageCountTraining: 0,
    };
    moment.locale('fr', momentFR);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getSalarie(this.props.salarieId.id);
    this.unlisten = this.props.history.listen((location, action) => {
      if (location !== null && location !== undefined) {
        if (location.state !== this.state.currentSalarie.id) {
          this.getSalarie(location.state);
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getSalarie(id) {
    SalariesService.getSalarieById(id)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            currentSalarie: response.data,
          });
          const displaySkill = this.getPaginatedItems(this.state.currentSalarie.competences, 1);
          const displayTraining = this.getPaginatedItems(this.state.currentSalarie.formations, 2);
          const pageCountSkill = Math.ceil(this.state.currentSalarie.competences.length / this.state.perPageSkill);
          const pageCountTraining = Math.ceil(this.state.currentSalarie.formations.length / this.state.perPageTraining);
          this.setState({
            displaySkill,
            displayTraining,
            pageCountSkill,
            pageCountTraining
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getPaginatedItems(items, type) {

    if (type === 1) {
      return items.slice(this.state.offsetSkill, this.state.offsetSkill + this.state.perPageSkill);
    } else {
      return items.slice(this.state.offsetSkill, this.state.offsetSkill + this.state.perPageTraining);
    }

  }

  changeProfil(e) {
    const target = e.target;
    this.props.history.push(`${target.pathname}`);
    this.getSalarie(parseInt(target.id));
  }

  handlePageClickSkill(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPageSkill);
    this.setState({ offsetSkill: offset }, () => {
      const displaySkill = this.getPaginatedItems(this.state.currentSalarie.competences);
      this.setState({
        displaySkill,
      });
    });
  };

  handlePageClickTraining(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPageTraining);
    this.setState({ offsetTraining: offset }, () => {
      const displayTraining = this.getPaginatedItems(this.state.currentSalarie.formations);
      this.setState({
        displayTraining,
      });
    });
  }

  render() {
    const { currentSalarie, displaySkill, displayTraining } = this.state;
    const { isRole,user } = this.props;
    const userDecode = jwt_decode(user);
    console.log(userDecode);
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h3>Profil de {currentSalarie.prenom + " " + currentSalarie.nom}</h3>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg={6}>
                  <CCard>
                    <CCardHeader>
                      <h4><FontAwesomeIcon icon={["far", "address-card"]} /> Description</h4>
                    </CCardHeader>
                    <CCardBody>
                      <table className="table table-striped table-hover">
                        <tbody>
                          <tr>
                            <td className="font-weight-bold">Nom</td>
                            <td>{currentSalarie.nom}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Prenom</td>
                            <td>{currentSalarie.prenom}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Email (pro)</td>
                            <td>{currentSalarie.email}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Date de naissance</td>
                            <td>{moment(currentSalarie.dateNaissance).format("ll")}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Poste</td>
                            <td>
                              {currentSalarie.postes.map(
                                (value, indexObject) => {
                                  if (indexObject === 0) {
                                    return (
                                      <div key={value.id}>
                                        {value.titrePoste.intitule}
                                      </div>
                                    );
                                  }
                                  return <div key={value.id}></div>;
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Type de contrat</td>
                            <td>
                              {currentSalarie.postes.map(
                                (value, indexObject) => {
                                  if (indexObject === 0) {
                                    return (
                                      <div key={value.id}>
                                        {value.typeContrat.type}
                                      </div>
                                    );
                                  }
                                  return <div key={value.id}></div>;
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Manager</td>
                            <td>
                              {currentSalarie.postes.map(
                                (value, indexObject) => {
                                  if (indexObject === 0) {
                                    if (value.manager !== null) {
                                      return (
                                        <div key={value.id}>
                                          <Link id={value.manager.id} to={"/salaries/profil/" + value.manager.id} onClick={this.changeProfil}>{value.manager.prenom +
                                            " " +
                                            value.manager.nom}
                                          </Link>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div key={value.id}>
                                          Aucun manager
                                        </div>
                                      )
                                    }
                                  }
                                  return <div key={value.id}></div>;
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Tel (pro)</td>
                            <td>{currentSalarie.telProfessionnel}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Mobil (pro)</td>
                            <td>{currentSalarie.mobileProfessionnel}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Tel (personnel)</td>
                            <td>{currentSalarie.telPersonnel}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Mobil (personnel)</td>
                            <td>{currentSalarie.mobilPersonnel}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Adresse</td>
                            <td>{`${currentSalarie.adresse.numero} ${currentSalarie.adresse.voie
                              } ${currentSalarie.adresse.codePostal} ${currentSalarie.adresse.ville
                              } ${currentSalarie.adresse.complementAdresse || ""
                              } `}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Companie</td>
                            <td>{currentSalarie.entreprise.nom}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Implantation</td>
                            <td>{currentSalarie.entreprise.nom}</td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Rôle</td>
                            <td>
                              {currentSalarie.roles.map((d) => {
                                return <div key={d.id}>{d.titre}</div>;
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-weight-bold">Domaine</td>
                            <td>{currentSalarie.domaine.titre}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CCardBody>
                    <CCardFooter>
                      <CRow>
                      {(isRole === 1 || isRole === 2) && (<CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                          <CButton active block color="info" aria-pressed="true" to={"/salaries/modification/" + currentSalarie.id}>
                            <FontAwesomeIcon icon={["far", "edit"]} /> Modifier
                          </CButton>
                        </CCol>)}
                        {(isRole === 1 || currentSalarie.id === userDecode.id) && (<CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                          <Link to={{ pathname: "/salaries/updatePassword", state: currentSalarie }}>
                            <CButton type="button" block color="info">
                              <FontAwesomeIcon icon={["fas", "lock"]} /> Modifier le mot de passe
                            </CButton>
                          </Link>
                        </CCol>)}

                      </CRow>
                    </CCardFooter>
                  </CCard>
                </CCol>
                <CCol lg={6}>
                  <CRow>
                    <CCol lg={12}>
                      <CCard>
                        <CCardHeader><h4><FontAwesomeIcon icon={["fas", "align-justify"]} /> Liste des formations</h4></CCardHeader>
                        <CCardBody>
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Titre</th>
                                <th>Date de début </th>
                                <th>Date de fin</th>
                                <th>Volume horaire</th>
                                <th>Prix <small>(HT)</small></th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayTraining &&
                                displayTraining.map((t) => {
                                  return (
                                    <tr key={t.id}>
                                      <td><Link to={`/formations/voir/${t.id}`}>{t.titre}</Link></td>
                                      <td>{moment(t.dateDebut).format("ll")}</td>
                                      <td>{moment(t.dateFin).format("ll")}</td>
                                      <td>{t.duree}</td>
                                      <td>{t.prix}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <ReactPaginate
                            name="test"
                            previousLabel={'Précédent'}
                            nextLabel={'Suivant'}
                            breakLabel={'...'}
                            pageCount={this.state.pageCountTraining}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            onPageChange={this.handlePageClickTraining.bind(this)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            pageLinkClassName="page-link"
                            breakLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            pageClassName="page-item"
                            breakClassName="page-item"
                            nextClassName="page-item"
                            previousClassName="page-item"
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg={12}>
                      <CCard className=" mt-3">
                        <CCardHeader><h4><FontAwesomeIcon icon={["fas", "list"]} /> Liste des competences</h4></CCardHeader>
                        <CCardBody>
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Nom de la compétence</th>
                              </tr>
                            </thead>
                            <tbody>
                              {displaySkill &&
                                displaySkill.map((d) => {
                                  return (
                                    <tr key={d.id}>
                                      <td>{d.nom}</td>
                                    </tr>
                                  );
                                })
                              }
                            </tbody>
                          </table>
                          <ReactPaginate
                            previousLabel={'Précédent'}
                            nextLabel={'Suivant'}
                            breakLabel={'...'}
                            pageCount={this.state.pageCountSkill}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            onPageChange={this.handlePageClickSkill.bind(this)}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            pageLinkClassName="page-link"
                            breakLinkClassName="page-link"
                            nextLinkClassName="page-link"
                            previousLinkClassName="page-link"
                            pageClassName="page-item"
                            breakClassName="page-item"
                            nextClassName="page-item"
                            previousClassName="page-item"
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}
function mapStateToProps(state) {
  const { isRole,user } = state.authen;
  return {
    isRole,
    user
  };
}
export default withRouter(connect(mapStateToProps)(Salarie));
