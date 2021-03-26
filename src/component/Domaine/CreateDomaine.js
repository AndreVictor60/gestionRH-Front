import { CButton } from "@coreui/react";
import React, { Component } from "react";
import DomaineService from "../../services/domaine.service";

export default class CreateDomaine extends Component {
  constructor(props) {
    super(props);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);
    this.createDomaine = this.createDomaine.bind(this);
    this.getDomaine = this.getDomaine.bind(this);

    this.state = {
      currentDomaine: {
        id: null,
        titre: ""
      },
      message: ""
    };
  }

  componentDidMount() {
   
  }
  onChangeDomaine(e){
    const domaine = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDomaine: {
          ...prevState.currentDomaine,
          titre: domaine
        }
      };
    });
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

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/domaine/liste');
    }, 1000);
  }

  createDomaine() {
    DomaineService.save(
      this.state.currentDomaine
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          currentDomaine: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de domaine."
        });
        //redirection vers liste domaines
        this.redirectionApresValidation();
      })
      .catch(e => {
        this.setState({
            message: e.message
          });
        console.log(e);
      });
  }

  render() {
    const { currentDomaine } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="titre">Créer un nouveau domaine</label>
                <input type="text" className="form-control" id="titre" value={currentDomaine.titre} onChange={this.onChangeDomaine}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.createDomaine}>
                Créer
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}