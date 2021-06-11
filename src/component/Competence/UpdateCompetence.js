import { CButton } from "@coreui/react";
import React, { Component } from "react";
import Select from 'react-select';
import CompetenceService from "../../services/competence.service";
import domaineService from "src/services/domaine.service";
import { withRouter } from "react-router-dom";

class UpdateCompetence extends Component {
  constructor(props) {
    super(props);
    this.onChangeCompetence = this.onChangeCompetence.bind(this);
    this.updateCompetence = this.updateCompetence.bind(this);
    this.getCompetence = this.getCompetence.bind(this);
    this.getDomaine = this.getDomaine.bind(this);
    this.onChangeDomaine = this.onChangeDomaine.bind(this);
    this.ifcompetence = this.ifcompetence.bind(this);
    this.ifdomaine = this.ifdomaine.bind(this);

    this.state = {
      domaines: [],
      currentCompetence: {
       id: null,
       nom: "",
       domaines:[]
     },
      errors:{domaineNull: null, competenceNull: null, BdomaineNull: false, BcompetenceNull: false}
    };
  }

  componentDidMount() {
   this.getCompetence(this.props.competenceId.id);
   this.getDomaine();
  }
  
  ifcompetence(competence){
    if(competence !== ""){
      this.setState((prevState) => ({
        errors: {
            ...prevState.errors,
            competenceNull: null,
            BcompetenceNull: false,
        },
        currentCompetence: {
          ...prevState.currentCompetence,
          nom: competence
        }
      }));
    }else{
      this.setState((prevState) => ({
        errors: {
            ...prevState.errors,
            competenceNull: "Le nom de la compétence est obligatoire.",
            BcompetenceNull: true,
        },
        currentCompetence: {
          ...prevState.currentCompetence,
          nom: null
        }
      }));
    }
  }

  ifdomaine(e){  
    if(e.length !== 0){
      this.setState((prevState) => ({
        currentCompetence: {
          ...prevState.currentCompetence,
          domaines: e,
        },
        errors: {
          ...prevState.errors,
          domaineNull: null,
          BdomaineNull: false,
      }
      }));
    }else{
      this.setState((prevState) => ({
        errors: {
            ...prevState.errors,
            domaineNull: "La compétence doit avoir au moins un domaine.",
            BdomaineNull: true,
        },
        currentCompetence: {
          ...prevState.currentCompetence,
          domaines: e,
        },
      }));
    }
  }

  onChangeCompetence(e){
    const competence = e.target.value;
    this.ifcompetence(competence);
  }
  
  getCompetence(id) {
    CompetenceService.getCompetenceById(id)
      .then(response => {
        this.setState({
            currentCompetence: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeDomaine(e) {
    console.log("domaine : ",e)
    this.ifdomaine(e);
  }

  getDomaine() {
    domaineService.getAllDomaine()
    .then(response => {
      this.setState({
        domaines: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  updateCompetence(e) {
    e.preventDefault();
    this.ifcompetence(this.state.currentCompetence.nom);
    this.ifdomaine(this.state.currentCompetence.domaines);

    console.log("BdomaineNull : ",this.state.errors.BdomaineNull);
    console.log("BcompetenceNull : ",this.state.errors.BcompetenceNull);

    console.log("condition : ",!this.state.errors.BdomaineNull && !this.state.errors.BcompetenceNull);

    if(!this.state.errors.BdomaineNull && !this.state.errors.BcompetenceNull){
      CompetenceService.updateCompetence(
        this.state.currentCompetence
      )
        .then(response => {
          console.log(response.data);
          this.setState({
              currentCompetence: response.data,
              errors: {
                competenceNull: null,
                domaineNull: null,
                update: null,
              },
          });
          this.props.history.push("/competence/liste");
        })
        .catch(e => {
          this.setState({
            errors: {
              update: e,
            },
          });
          console.log(e);
        });
      }
  }

  render() {
    const { currentCompetence, domaines, errors } = this.state;
    console.log("errors : ",errors);

    return (
      <div>
          <div className="edit-form">
            <form name="updateCompetenceForm" onSubmit={this.updateCompetence}>
              <div className="form-group">
                <label htmlFor="nom">Nom de la compétence</label>
                <input type="text" className="form-control" id="nom" value={currentCompetence.nom} onChange={this.onChangeCompetence}/>
                <span className="text-danger">{errors.competenceNull}</span>
              </div>
              <div className="form-group">
                <label htmlFor="domaines">Domaines *</label>
                <Select 
                  name="domaines"
                  placeholder="Liste des domaines"
                  value={currentCompetence.domaines === null ? "" : currentCompetence.domaines }
                  getOptionLabel={option => option.titre}
                  getOptionValue={option => option.id}
                  options={domaines.map(e => ({ titre: e.titre, id: e.id}))}
                  onChange={this.onChangeDomaine}
                  isMulti
                  required
                />
                <span className="text-danger">{errors.domaineNull}</span>
              </div>
              <CButton type="submit" block  color="info">
                Modifier
              </CButton>
            </form>
            <span className="text-danger">{errors.update}</span>
          </div>
      </div>
    );
  }
}
export default withRouter(UpdateCompetence);