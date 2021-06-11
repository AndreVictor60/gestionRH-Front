import { CSelect } from '@coreui/react';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PosteService from "../../services/poste.service";

class UpdatePoste extends Component {
  constructor(props){
      super(props);
      this.onGetPoste = this.onGetPoste.bind(this);

      this.state = {
        posteId: this.props.posteId.id,
        salaries: [],
        currentPoste: {
          id: null,
          dateDebut: null,
          dateFin: null,
          volumeHoraire: null,
          volumeJournalier: null,
          fichierContrat: null,
          titrePoste: {
            id: null
          },
          salarie: {
            id: null
          },
          typeContrat: {
            id: null
          },
          manager: {
            id: null
          },
          lieuTravail: {
            id: null
          },
          competencesRequises: [],
          maitreAppretissage: {
            id: null
          },
        }
      };
  }

  componentDidMount() {
    console.log("id psote : ",this.props.posteId.id,"()");
    this.onGetPoste(this.props.posteId.id);
  }

  onGetPoste(id){
    PosteService.getPosteById(id)
      .then(response => {
        this.setState({
          currentPoste:  response.data
        });
        console.log("data : ",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const {posteId} = this.state;
      return (
          <>
            Modif : {posteId}
          </>
      )
  }
}
export default withRouter(UpdatePoste);
