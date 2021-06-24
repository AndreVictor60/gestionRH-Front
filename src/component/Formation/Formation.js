import React, { Component } from 'react'
import FormationService from '../../services/formations.service';
import moment from 'moment';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
class Formation extends Component {
    constructor(props) {
        super(props);
        this.getAllEmployeeFormation = this.getAllEmployeeFormation.bind(this);
        this.state = {
            employeeFormation: [],
            formation: {
                dateDebut: null,
                dateFin: null,
                domaine: {
                    id: 0,
                    titre: null
                },
                duree: 0,
                prix: 0,
                titre: null,
                competences: [{
                    id: 0,
                    nom: null
                }]
            }
        }
    }

    componentDidMount() {
        this.retrieveFormation(this.props.formationId.id);
        this.getAllEmployeeFormation(this.props.formationId.id);
    }

    retrieveFormation(id) {
        FormationService.getFormationById(id)
            .then(response => {
                this.setState({
                    formation: response.data
                })
            })
            .catch(e => {
                console.log(e);
            });
    }

    getAllEmployeeFormation(idFormation) {
        FormationService.getSalarieByIdFormation(idFormation).then((response) => {
            this.setState({ employeeFormation: response.data });
            console.log("employee formation : ", response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { formation, employeeFormation } = this.state;
        const competences = formation.competences
        return (
            <>
                <CRow>
                    <CCol lg={6}>
                        <CCard>
                            <CCardHeader>{formation.titre}</CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody >
                                        <tr>
                                            <td className="font-weight-bold">Date de début</td>
                                            <td>{moment(formation.dateDebut).format('DD/MM/YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Date de fin</td>
                                            <td>{moment(formation.dateFin).format('DD/MM/YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Prix <small>(HT)</small></td>
                                            <td>{formation.prix} €</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Durée</td>
                                            <td>{formation.duree}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-bold">Domaine</td>
                                            <td>{formation.domaine.titre}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol lg={6}>
                        <CRow>
                            <CCol lg={12}>
                                <CCard>
                                    <CCardHeader>Compétences à promouvoir lors cette formation</CCardHeader>
                                    <CCardBody>
                                        <table className="table table-striped table-hover">
                                            <tbody>
                                                {competences && competences.map(competence =>
                                                    <tr key={competence.id}>
                                                        <td>{competence.nom}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                {employeeFormation.length !== 0 && (
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>Liste des salariés participants à la formation</CCardHeader>
                                <CCardBody>
                                    <table className="table table-striped table-hover">
                                        <tbody >
                                            {employeeFormation.map(employee =>
                                                <tr key={employee.id}>
                                                    <td><Link to={`/salaries/profil/${employee.id}`}>{employee.nom + " " + employee.prenom}</Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>)}
            </>
        )
    }
}

export default Formation
