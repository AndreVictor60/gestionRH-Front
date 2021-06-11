import { CButton, CAlert } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TitrePosteService from "../../services/titre-poste.service";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitrePoste = this.onChangeTitrePoste.bind(this);
    this.createTitrePoste = this.createTitrePoste.bind(this);
    this.state = {
      currentErrors:{
        title: null,
        titleBool: true
      },
      currentTitrePoste: {
        id: null,
        intitule: ""
      },
      message: "",
      ifError: null
    };
  }

  onChangeTitrePoste(e){
    const titrePoste = e.target.value;
    if (titrePoste === "" || titrePoste === null || titrePoste.length === 0) {
      this.setState((prevState) => ({
        currentTitrePoste: {
          ...prevState.currentTitrePoste,
          intitule: titrePoste,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: "Le champ nom est requis.",
          titleBool: true
        }
      }));
    }else{
      this.setState((prevState) => ({
        currentTitrePoste: {
          ...prevState.currentTitrePoste,
          intitule: titrePoste,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: null,
          titleBool: false
        }
      }));
    }
  }
  
  createTitrePoste(e) {
    e.preventDefault();
    if(this.state.currentErrors.titleBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      TitrePosteService.saveTitrePoste(this.state.currentTitrePoste)
      .then(response => {
        this.setState({
            currentTitrePoste: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste des intitulés de poste.",
            ifError: false
        });
        window.setTimeout(() => {this.props.history.push("/titre-poste/liste")}, 3000);
      })
      .catch(e => {
        this.setState({
            message: e.message,
            ifError: true
          });
      });
    }
  }

  render() {
    const { currentTitrePoste,currentErrors,ifError,message } = this.state;
    return (
      <div>
          <div className="edit-form">
            <form name="createTitlePoste" onSubmit={this.createTitrePoste}>
              <div className="form-group">
                <label htmlFor="title">Créer un nouveau intitulé de poste</label>
                <input type="text" name="title" className="form-control" id="title" value={currentTitrePoste.intitule} onChange={this.onChangeTitrePoste}/>
                <span className="text-danger">{currentErrors.title}</span>
              </div>
              <CButton type="submit" block  color="info">
                Créer
              </CButton>
            </form>
          </div>
          {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
      </div>
    );
  }
}

export default withRouter(CreateRole);