import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import DomaineService from "../../services/domaine.service";

class CreateDomaine extends Component {
  constructor(props) {
    super(props);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);
    this.createDomaine = this.createDomaine.bind(this);
    this.getDomaine = this.getDomaine.bind(this);

    this.state = {
      currentErrors:{
        title: null,
        titleBool: false
      },
      currentDomaine: {
        id: null,
        titre: ""
      },
      message: null,
      ifError: null
    };
  }

  onChangeDomaine(e){
    const domaine = e.target.value;
    if(domaine === "" || domaine === null || domaine.length === 0 ){
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          title: "Le champ titre est requis.",
          titleBool: true
        },
        currentDomaine: {
          ...prevState.currentDomaine,
          titre: domaine
        }
      }));
    }else{
      this.setState((prevState) => ({
        currentErrors: {
          ...prevState.currentErrors,
          title: null,
          titleBool: false
        },
        currentDomaine: {
          ...prevState.currentDomaine,
          titre: domaine
        }
      }));
    }
  }
  
  getDomaine(id) {
    DomaineService.getDomaineById(id)
      .then(response => {
        this.setState({
          currentDomaine: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  createDomaine(e) {
    e.preventDefault();
    if(!this.state.currentErrors.titleBool){
      DomaineService.save(this.state.currentDomaine)
      .then(response => {
        console.log(response.data);
        this.setState({
            currentDomaine: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de domaine.",
            ifError: false
        });
        window.setTimeout(() => {this.props.history.push("/domaine/liste")}, 3000);
      })
      .catch(e => {
        this.setState({
            message: e.message,
            ifError: true
          });
      });
    }else {
      this.setState({
          message: "Une erreur est présente dans votre formulaire.",
          ifError: true
      });
    }
    
  }

  render() {
    const { currentDomaine,currentErrors,message,ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form name="createDomain" onSubmit={this.createDomaine}>
              <div className="form-group">
                <label htmlFor="title">Créer un nouveau domaine</label>
                <input type="text" name="title" className="form-control" id="title" value={currentDomaine.titre} onChange={this.onChangeDomaine}/>
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

export default withRouter(CreateDomaine)