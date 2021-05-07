import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import TitrePosteService from "../../services/titre-poste.service";

export default class UpdateTitrePoste extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitrePoste = this.onChangeTitrePoste.bind(this);
    this.updateTitrePoste = this.updateTitrePoste.bind(this);
    this.getTitrePoste = this.getTitrePoste.bind(this);

    this.state = {
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

    this.setState(function(prevState) {
      return {
        currentTitrePoste: {
          ...prevState.currentTitrePoste,
          intitule: titrePoste
        }
      };
    });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/titre-poste/liste');
    }, 1000);
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


  updateTitrePoste() {
    TitrePosteService.updateTitrePoste(
      this.state.currentTitrePoste
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentTitrePoste: response.data,
            message: 'Modification bien prise en compte !',
            ifError: false
        });
        //redirection vers liste des rôles
        this.redirectionApresValidation();
      })
      .catch(e => {
        this.setState({
            message: e.message,
            ifError: true
          });
        console.log(e);
      });
  }


  render() {
    const { currentTitrePoste, ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="intitule">Nom de l'intitulé du poste</label>
                <input type="text" className="form-control" id="intitule" value={currentTitrePoste.intitule} onChange={this.onChangeTitrePoste}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateTitrePoste}>
                Modifier
            </CButton>
          </div>
          {ifError != null ? ifError ? <CAlert color="danger">{this.state.message}</CAlert> : <CAlert color="success">{this.state.message}</CAlert> : <CAlert></CAlert>}
      </div>
    );
  }
}