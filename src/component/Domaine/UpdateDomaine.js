import { CButton } from "@coreui/react";
import React, { Component } from "react";
import DomaineService from "../../services/domaine.service";

export default class UpdateDomaine extends Component {
  constructor(props) {
    super(props);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);
    this.updateDomaine = this.updateDomaine.bind(this);
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
   this.getDomaine(this.props.domaineId.id);
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


  updateDomaine() {
    DomaineService.update(
      this.state.currentDomaine
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          currentDomaine: response.data,
            message: "Modification bien prise en compte !"
        });
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
                <label htmlFor="titre">Nom du domaine</label>
                <input type="text" className="form-control" id="titre" value={currentDomaine.titre} onChange={this.onChangeDomaine}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateDomaine}>
                Modifier
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}