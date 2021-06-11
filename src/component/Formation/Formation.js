import React, { Component } from 'react'
import FormationService from '../../services/formations.service';
import moment from 'moment';
class Formation extends Component {
    constructor(props) {
        super(props);
        this.state={
            formation: {
                dateDebut: null,
                dateFin: null,
                domaine: {
                    id:0,
                    titre: null
                },
                duree: 0,
                prix: 0,
                titre: null,
                competences: [{
                    id:0,
                    nom: null
                }]
            }
        }
    }

    componentDidMount(){
        this.retrieveFormation(this.props.formationId.id);
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
    
    render() {
        const {formation} = this.state;
        const competences = formation.competences
        return (
            <div>
                <p>{formation.titre}<br />
                    Date du début : {moment(formation.dateDebut).format('DD/MM/YYYY')} <br />
                     Date de fin : {moment(formation.dateFin).format('DD/MM/YYYY')}<br />
                     Prix: {formation.prix} €<br />
                     Durée : {formation.duree}<br />
                     Domaine : {formation.domaine.titre}</p>
                <fieldset>
                    <legend>Compétences à promouvoir lors cette formation :</legend>
                <ul>
                    {competences.map(competence => 
                    <div key={competence.id}>
                        <li>{competence.nom}</li>
                    </div>
                    )}
                </ul>
                </fieldset>
            </div>
        )
    }
}

export default Formation
