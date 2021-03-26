import { CButton } from "@coreui/react";
import React, { Component } from "react";
import TypeContratService from "../../services/type-contrat.service";

export default class UpdateTypeContrat extends Component {
  constructor(props) {
    super(props);
    this.onChangeTypeContrat = this.onChangeTypeContrat.bind(this);
    this.updateTypeContrat = this.updateTypeContrat.bind(this);
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
   this.getTypeContrat(this.props.typeContratId.id);
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


  updateTypeContrat() {
    TypeContratService.update(
      this.state.currentTypeContrat
    )
      .then(response => {
        console.log(response.data);
        this.setState({
            currentTypeContrat: response.data,
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
    const { currentTypeContrat } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="typeContrat">Nom du type de contrat</label>
                <input type="text" className="form-control" id="typeContrat" value={currentTypeContrat.type} onChange={this.onChangeTypeContrat}/>
              </div>
            </form>
            <CButton type="submit" block  color="info" onClick={this.updateTypeContrat}>
                Modifier
            </CButton>
            <p>{this.state.message}</p>
          </div>
      </div>
    );
  }
}