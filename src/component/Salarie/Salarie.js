import React, { Component } from "react";
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

export default class Salarie extends Component {
  constructor(props) {
    super(props);
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
    this.getSalarie(this.props.salarieId.id);
  }

  getSalarie(id) {
    SalariesService.getSalarieById(id)
      .then((response) => {
        this.setState({
          currentSalarie: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentSalarie } = this.state;
    console.log(currentSalarie.postes);
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Profil de {currentSalarie.prenom + " " + currentSalarie.nom}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol lg={6}>
                  <CCard>
                    <CCardHeader>
                      User id: {this.props.salarieId.id}
                    </CCardHeader>
                    <CCardBody>
                      <table className="table table-striped table-hover">
                        <tbody>
                          <tr>
                            <td>Nom</td>
                            <td>{currentSalarie.nom}</td>
                          </tr>
                          <tr>
                            <td>Prenom</td>
                            <td>{currentSalarie.prenom}</td>
                          </tr>
                          <tr>
                            <td>Email (pro)</td>
                            <td>{currentSalarie.email}</td>
                          </tr>
                          <tr>
                            <td>Date de naissance</td>
                            <td>{currentSalarie.dateNaissance}</td>
                          </tr>
                          <tr>
                            <td>Poste</td>
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
                            <td>Type de contrat</td>
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
                            <td>Manager</td>
                            <td>
                              {currentSalarie.postes.map(
                                (value, indexObject) => {
                                  if (indexObject === 0) {
                                    return (
                                      <div key={value.id}>
                                        {value.manager.prenom +
                                          " " +
                                          value.manager.nom}
                                      </div>
                                    );
                                  }
                                  return <div key={value.id}></div>;
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Tel (pro)</td>
                            <td>{currentSalarie.telProfessionnel}</td>
                          </tr>
                          <tr>
                            <td>Mobil (pro)</td>
                            <td>{currentSalarie.mobileProfessionnel}</td>
                          </tr>
                          <tr>
                            <td>Tel (personnel)</td>
                            <td>{currentSalarie.telPersonnel}</td>
                          </tr>
                          <tr>
                            <td>Mobil (personnel)</td>
                            <td>{currentSalarie.mobilPersonnel}</td>
                          </tr>
                          <tr>
                            <td>Adresse</td>
                            <td>{`${currentSalarie.adresse.numero} ${
                              currentSalarie.adresse.voie
                            } ${currentSalarie.adresse.codePostal} ${
                              currentSalarie.adresse.ville
                            } ${
                              currentSalarie.adresse.complementAdresse || ""
                            } `}</td>
                          </tr>
                          <tr>
                            <td>Companie</td>
                            <td>{currentSalarie.entreprise.nom}</td>
                          </tr>
                          <tr>
                            <td>Implantation</td>
                            <td>{currentSalarie.entreprise.nom}</td>
                          </tr>
                          <tr>
                            <td>Rôle</td>
                            <td>
                              {currentSalarie.roles.map((d) => {
                                return <div key={d.id}>{d.titre}</div>;
                              })}
                            </td>
                          </tr>
                          <tr>
                            <td>Domaine</td>
                            <td>{currentSalarie.domaine.titre}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CCardBody>
                    <CCardFooter>
                      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                        <CButton active block color="info" aria-pressed="true"to={"/salaries/modification/" + currentSalarie.id}>
                            Modifier
                        </CButton>
                      </CCol>
                    </CCardFooter>
                  </CCard>
                </CCol>
                <CCol lg={6}>
                  <CRow>
                    <CCol lg={12}>
                      <CCard>
                        <CCardHeader>Liste des formations</CCardHeader>
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
                        <CCardHeader>Liste des competences</CCardHeader>
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
