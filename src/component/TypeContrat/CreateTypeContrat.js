import { CButton } from "@coreui/react";
import React, { Component } from "react";
import TypeContratService from "../../services/type-contrat.service";

export default class CreateTypeContrat extends Component {
  constructor(props) {
    super(props);
    this.onChangeTypeContrat = this.onChangeTypeContrat.bind(this);
    this.createTypeContrat = this.createTypeContrat.bind(this);
    this.getTypeContrat = this.getTypeContrat.bind(this);

    this.state = {
        currentTypeContrat: {
        id: null,
        typeContrat: ""
      },
      message: ""
    };
  }

  componentDidMount() {
   
  }
  onChangeTypeContrat(e){
    const typeContrat = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTypeContrat: {
          ...prevState.currentTypeContrat,
          type: typeContrat
        }
      };
    });
  }
  
  getTypeContrat(id) {
    TypeContratService.getTypeContratById(id)
      .then(response => {
        this.setState({
            currentTypeContrat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  redirectionApresValidation(){
    setTimeout(function() {
      window.location.replace('/type-contrat/liste');
    }, 1000);
  }

  createTypeContrat() {
    TypeContratService.save(
      this.state.currentTypeContrat
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentTypeContrat: response.data,
            message: "Création bien prise en compte ! Redirection vers la liste de type de contrat."
        });
        //redirection vers liste type de contrat
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
    const { currentTypeContrat } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="typeContrat">Créer un nouveau type de contrat</label>
                <input type="text" className="form-control" id="typeContrat" value={currentTypeContrat.type} onChange={this.onChangeTypeContrat}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.createTypeContrat}>
                Créer
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}