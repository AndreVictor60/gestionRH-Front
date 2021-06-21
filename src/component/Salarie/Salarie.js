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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
        siManager: false,
        version: null,
      },
      errors: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getSalarie(this.props.salarieId.id);
  }

  componentDidUpdate(){
    this._isMounted = true;
    //this.getSalarie(this.props.salarieId.id);
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  getSalarie(id) {
    SalariesService.getSalarieById(id)
      .then((response) => {
        if(this._isMounted){
          this.setState({
            currentSalarie: response.data,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  changeProfil(e){
    const target = e.target;
    this.props.history.push(`${target.pathname}`);
    this.getSalarie(parseInt(target.id));
  }

  render() {
    const { currentSalarie } = this.state;
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
                            <td>{currentSalarie.dateNaissance}</td>
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
                                    if(value.manager !== null){
                                    return (
                                      <div key={value.id}>
                                        <Link id={value.manager.id} to={ "/salaries/profil/" + value.manager.id} onClick={this.changeProfil}>{value.manager.prenom +
                                          " " +
                                          value.manager.nom}
                                          </Link>
                                      </div>
                                    );
                                    }else{
                                      return(
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
                            <td>{`${currentSalarie.adresse.numero} ${
                              currentSalarie.adresse.voie
                            } ${currentSalarie.adresse.codePostal} ${
                              currentSalarie.adresse.ville
                            } ${
                              currentSalarie.adresse.complementAdresse || ""
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
                        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                          <CButton active block color="info" aria-pressed="true"to={"/salaries/modification/" + currentSalarie.id}>
                          <FontAwesomeIcon icon={["far", "edit"]} /> Modifier
                          </CButton>
                        </CCol>
                        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                          <Link to={{pathname: "/salaries/updatePassword", state: currentSalarie}}>
                            <CButton type="button" block color="info">
                            <FontAwesomeIcon icon={["fas", "lock"]} /> Modifier le mot de passe
                            </CButton>
                          </Link>
                        </CCol>
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
                                <th>Forfait jour</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Développeur J2EE</td>
                                <td>28/11/2020</td>
                                <td>25/02/2021</td>
                                <td>399</td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>Développeur J2EE</td>
                                <td>28/11/2020</td>
                                <td>25/02/2021</td>
                                <td>399</td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>Développeur J2EE</td>
                                <td>28/11/2020</td>
                                <td>25/02/2021</td>
                                <td>399</td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol lg={12}>
                      <CCard>
                        <CCardHeader><h4><FontAwesomeIcon icon={["fas", "list"]} /> Liste des competences</h4></CCardHeader>
                        <CCardBody>
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Nom de la compétence</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentSalarie.competences.map((d) => {
                                return (
                                  <tr key={d.id}>
                                    <td>{d.nom}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
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

export default withRouter(Salarie);