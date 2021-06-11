import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PosteService from "../../services/poste.service";

/*function compareDateStringWithDateCurrent(string){
  let datePoste = new Date(string).getTime();
  let dateCurrent = new Date().getTime();
  if(datePoste < dateCurrent){
    return false;
  }else{
    return true;
  }
}*/

class ListPoste extends Component {
  constructor(props) {
    super(props);
    //this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePoste = this.retrievePoste.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    //this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      postes: []
    };
  }

  componentDidMount() {
    this.retrievePoste();
  }

  /* onChangeSearchTitle(e) {
     const searchTitle = e.target.value;
 
     this.setState({
       searchTitle: searchTitle
     });
   }*/

  retrievePoste() {
    PosteService.getAllPoste()
      .then(response => {
        this.setState({
          postes: response.data
        });
        console.log("response.data", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*searchTitle() {
      SalariesService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/

  render() {
    const { postes } = this.state;
    console.log("postes : ", postes)
    //TODO: De base poste en cours et checkbox pour archive
    return (
      <>
        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nom prénom</th>
                  <th>Poste</th>
                  <th>Type de contrat</th>
                  <th>Manager</th>
                  <th>Entreprise</th>
                  <th>Date du contrat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {postes.map(poste =>
                  <tr key={poste.id}>
                    <td>{poste.salarie.nom + " " + poste.salarie.prenom}</td>
                    <td>{poste.titrePoste.intitule}</td>
                    <td>{poste.typeContrat.type}</td>
                    <td>{poste.manager != null ? poste.manager.nom + " " + poste.manager.prenom : ""}</td>
                    <td>{poste.salarie.entreprise.nom}</td>
                    <td>{poste.dateDebut + " - " + poste.dateFin}</td>
                    <td><Link to={"/poste/modification/" + poste.id}><CButton className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );

  }
}

export default ListPoste;