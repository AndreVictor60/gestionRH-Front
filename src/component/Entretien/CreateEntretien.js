import { CButton,CAlert} from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import "moment/locale/fr";
import entretienService from "src/services/entretien.service";
import salariesService from "src/services/salaries.service";
import { AsyncPaginate } from "react-select-async-paginate";


var yesterday = moment();
function valid(current) {
  return current.isAfter(yesterday);
}
class CreateEntretien extends Component {
  constructor(props) {
    super(props);
    this.saveInterview = this.saveInterview.bind(this);
    this.onChangeSalarie = this.onChangeSalarie.bind(this);
    this.onChangeManagerEntretien = this.onChangeManagerEntretien.bind(this);
    this.onChangeDateEntretien = this.onChangeDateEntretien.bind(this);
    this.validationForm = this.validationForm.bind(this);
    this.loadSalarie = this.loadSalarie.bind(this);
    this.loadSalarieManager = this.loadSalarieManager.bind(this);
    this.onChangeInputSalarie = this.onChangeInputSalarie.bind(this);
    this.onChangeInputSalarieManager = this.onChangeInputSalarieManager.bind(this);
    this.state = {
      nomSalarie: "",
      nomManager: "",
      message: null,
      ifError: null,
      currentErrors: {
          dateEntretien: null,
          dateEntretienBool: false,
          salarie: null,
          salarieBool: false,
          managerEntretien: null,
          managerEntretienBool: false
      },
      validateForm: false,
      salaries: [],
      currentInterview: {
        dateEntretien: new Date(Date.now() + ( 3600 * 1000 * 24)),
        salarie: {
        },
        managerEntretien: {},
      },
    };
  }

  componentDidMount() {
    //this.getAllSalarie();
  }  

  onChangeSalarie(e) {
    if(e.length === 0){
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          salarie: "Veuillez séléctionner un salarie",
          salarieBool: true
        },
        currentInterview: {
          ...prevState.currentInterview,
          salarie: e,
        },
      }));
    }else{
      if(e.id === parseInt(this.state.currentInterview.managerEntretien.id)){
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            salarie: "Veuillez séléctionner un salarié qui n'est pas le manager",
            salarieBool: true
          },
          currentInterview: {
            ...prevState.currentInterview,
            salarie: e,
          },
        }));
      }else {
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          salarie: null,
          managerEntretien: null,
          managerEntretienBool: true,
          salarieBool: true
        },
        currentInterview: {
          ...prevState.currentInterview,
          salarie: e,
        },
      }));
    }
    }
  }

  onChangeManagerEntretien(e){
    if(e.length === 0){
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            managerEntretien: "Veuillez séléctionner un salarie",
            managerEntretienBool: true
          },
          currentInterview: {
            ...prevState.currentInterview,
            managerEntretien: e,
          },
        }));
    }else{
      if(e.id === parseInt(this.state.currentInterview.salarie.id)){
        console.log("if")
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            managerEntretien: "Veuillez séléctionner un manager qui n'est pas le salarié",
            managerEntretienBool: true
          },
          currentInterview: {
            ...prevState.currentInterview,
            managerEntretien: e,
          },
        }));
      }else {
        this.setState((prevState) => ({
          currentErrors:{
            ...prevState.currentErrors,
            managerEntretien: null,
            salarie:null,
            salarieBool : true,
            managerEntretienBool: true
          },
          currentInterview: {
            ...prevState.currentInterview,
            managerEntretien: e,
          },
        }));
      }
    }
  }

  onChangeDateEntretien(e){
    // TODO: Vérification de la date
    if(e.length === 0){   
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          dateEntretien: "Veuillez saisir une date / heure ",
          dateEntretienBool: true
        },
        currentInterview: {
          ...prevState.currentInterview,
          dateEntretien: e,
        },
      }));
    }else{
      this.setState((prevState) => ({
        currentErrors:{
          ...prevState.currentErrors,
          dateEntretien: null,
          dateEntretienBool: true
        },
        currentInterview: {
          ...prevState.currentInterview,
          dateEntretien: e,
        },
      }));
    }
  }

  validationForm(){
    const {salarie,managerEntretien} = this.state.currentInterview;
    console.log()
    if(Object.keys(managerEntretien).length !== 0 && Object.keys(salarie).length !== 0){
      if(managerEntretien.id !== salarie.id ){
        return true;
      }else{
        this.setState({
          message: "Le manager ne peut être aussi le salarie",
          ifError: true
        });
        return false
      }
    }else{
      console.log("null")
      return false
    }

  }

  onChangeInputSalarie(e){
    this.setState({ nomSalarie : e})
  }

  onChangeInputSalarieManager(e){
    this.setState({ nomManager : e})
  }

  async loadSalarie (search, prevOptions, { page },e) {
    const response = await salariesService.getAllSalariesByKeywordPerPage(page,10,this.state.nomSalarie);
    const responseJSON = await response.data;
    return {
        options: responseJSON,
        hasMore: responseJSON.length >= 1,
        additional: {
            page: search ? 2 : page + 1,
        }
    };
  };

  async loadSalarieManager (search, prevOptions, { page },e) {
    const response = await salariesService.getAllSalariesByKeywordPerPage(page,10,this.state.nomManager);
    const responseJSON = await response.data;
    return {
        options: responseJSON,
        hasMore: responseJSON.length >= 1,
        additional: {
            page: search ? 2 : page + 1,
        }
    };
  };
  

  saveInterview(e) {
    e.preventDefault();
    if(this.validationForm()){
    entretienService.save(this.state.currentInterview)
        .then((resp) => {
          this.setState({
            message: "Création de l'entretien bien prise en compte ! Redirection vers la liste des entretiens.",
            ifError: false
        });
        window.setTimeout(() => {this.props.history.push('/entretiens')}, 5000)
        })
        .catch((e) => {
          this.setState({
            message: e,
            ifError: true
          });
        });
    }else{
      this.setState({
        message: "Une erreur s'est produite ! veuillez ré-essayer.",
        ifError: true
      });
    }
  }

  render() {
    const { currentErrors,currentInterview,message,ifError } = this.state;
    const dateNow = new Date(Date.now() + ( 3600 * 1000 * 24));
    return (
      <div className="submit-form">
        <div>
          <form name="createInterview" onSubmit={this.saveInterview}>
          <div className="row">
              <div className="col">
                <div className="form-group">
                <label htmlFor="dateEntretien">Date/heure de l'entretien *</label>
                    <Datetime 
                    name="dateEntretien"
                    locale="fr" 
                    initialValue={dateNow} 
                    value={currentInterview.dateEntretien} 
                    isValidDate={valid} 
                    onChange={this.onChangeDateEntretien}
                    onBlur={this.onChangeDateEntretien}
                    timeConstraints={{
                      hours: { min: 8, max: 20 },
                      minutes: { min: 0, max: 59 }
                    }}
                    />
                  <span className="text-danger">{currentErrors.dateEntretien}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="salarie">Salarie *</label>
                  <AsyncPaginate
                      value={Object.entries(currentInterview.salarie).length === 0? null: currentInterview.salarie}
                      loadOptions={this.loadSalarie}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.prenom + ' ' + option.nom}
                      onChange={this.onChangeSalarie}
                      isSearchable={true}
                      onInputChange={this.onChangeInputSalarie}
                      placeholder="Selectionner un salarie"
                      additional={{
                        page: 0,
                      }}
                    />
                  <span className="text-danger">{currentErrors.salarie}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="managerEntretien">Manager entretien *</label>
                  <AsyncPaginate
                      value={Object.entries(currentInterview.managerEntretien).length === 0? null: currentInterview.managerEntretien}
                      loadOptions={this.loadSalarieManager}
                      getOptionValue={(option) => option.id}
                      getOptionLabel={(option) => option.prenom + ' ' + option.nom}
                      onChange={this.onChangeManagerEntretien}
                      isSearchable={true}
                      onInputChange={this.onChangeInputSalarieManager}
                      placeholder="Selectionner un salarie"
                      additional={{
                        page: 0,
                      }}
                    />
                  <span className="text-danger">{currentErrors.managerEntretien}</span>
                </div>
              </div>
            </div>
            <CButton type="submit" block color="info">
              Ajout d'un entretien
            </CButton>
          </form>
          {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
        </div>
      </div>
    );
  }
}

export default withRouter(CreateEntretien);
