import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import TypeContratService from "../../services/type-contrat.service";

class CreateTypeContrat extends Component {
  constructor(props) {
    super(props);
    this.onChangeTypeContrat = this.onChangeTypeContrat.bind(this);
    this.createTypeContrat = this.createTypeContrat.bind(this);

    this.state = {
      currentErrors: {
        title: null,
        titleBool: true
      },
        currentTypeContrat: {
        id: null,
        type: ""
      },
      message: "",
      ifError: null
    };
  }

  onChangeTypeContrat(e){
    const typeContrat = e.target.value;
    if (typeContrat === "" || typeContrat === null || typeContrat.length === 0) {
      this.setState((prevState) => ({
        currentTypeContrat: {
          ...prevState.currentTypeContrat,
          type: typeContrat,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: "Le champ nom est requis.",
          titleBool: true
        }
      }));
    }else{
      this.setState((prevState) => ({
        currentTypeContrat: {
          ...prevState.currentTypeContrat,
          type: typeContrat,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: null,
          titleBool: false
        }
      }));
    }
  }

  createTypeContrat(e) {
    e.preventDefault();
    if(this.state.currentErrors.titleBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      console.log("this.state.currentTypeContrat",this.state.currentTypeContrat)
      TypeContratService.save(this.state.currentTypeContrat)
      .then(response => {
        console.log(response.data);
        this.setState({
            currentTypeContrat: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de type de contrat.",
            ifError: false
        });
        window.setTimeout(() => {this.props.history.push('/type-contrat/liste')}, 3000);
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
    const { currentTypeContrat,currentErrors,message,ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form name="createTypeContrat" onSubmit={this.createTypeContrat}>
              <div className="form-group">
                <label htmlFor="typeContrat">Créer un nouveau type de contrat</label>
                <input type="text" className="form-control" id="typeContrat" value={currentTypeContrat.type} onChange={this.onChangeTypeContrat}/>
                <span className="text-danger">{currentErrors.title}</span>
              </div>
              <CButton type="submit" block  color="info">
                Créer
              </CButton>
            </form>
            {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
          </div>
      </div>
    );
  }
}

export default withRouter(CreateTypeContrat);