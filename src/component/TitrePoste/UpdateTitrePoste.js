import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TitrePosteService from "../../services/titre-poste.service";

class UpdateTitrePoste extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitrePoste = this.onChangeTitrePoste.bind(this);
    this.updateTitrePoste = this.updateTitrePoste.bind(this);
    this.getTitrePoste = this.getTitrePoste.bind(this);
    this.state = {
      currentErrors:{
        intitule: null,
        intituleBool: true
      },
      currentTitrePoste: {
        id: null,
        intitule: ""
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
   this.getTitrePoste(this.props.titrePosteId.id);
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
  
  getTitrePoste(id) {
    TitrePosteService.getTitrePosteById(id)
      .then(response => {
        this.setState({
            currentTitrePoste: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTitrePoste(e) {
    e.preventDefault();
    if(this.state.currentErrors.titleBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      TitrePosteService.updateTitrePoste(this.state.currentTitrePoste)
      .then(response => {
        console.log(response.data);
        this.setState({
            currentTitrePoste: response.data,
            message: 'Modification bien prise en compte !',
            ifError: false
        });
        //redirection vers liste des rôles
        setTimeout(function() {window.location.replace('/titre-poste/liste');}, 1000);
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
    const { currentTitrePoste,currentErrors, ifError, message } = this.state;
    return (
      <div>
          <div className="edit-form">
            <form name="updateTitlePoste" onSubmit={this.updateTitrePoste}>
              <div className="form-group">
                <label htmlFor="intitule">Nom de l'intitulé du poste</label>
                <input type="text" name="intitule" className="form-control" id="intitule" value={currentTitrePoste.intitule} onChange={this.onChangeTitrePoste}/>
                <span className="text-danger">{currentErrors.intitule}</span>
              </div>
              <CButton type="submit" block  color="info">
                Modifier
              </CButton>
            </form>
          </div>
          {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
      </div>
    );
  }
}

export default withRouter(UpdateTitrePoste);