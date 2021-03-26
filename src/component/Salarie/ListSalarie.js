import React, { Component } from "react";
import SalariesService from "../../services/salaries.service";
function formatDate(string){
  let datePoste = new Date(string).getTime();
  let dateCurrent = new Date().getTime();
  console.log("dateCurrent",dateCurrent)
  if(datePoste < dateCurrent){
    return false;
  }else{
    return true;
  }
}
class ListSalarie extends Component {
    constructor(props) {
      super(props);
      //this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.retrieveSalaries = this.retrieveSalaries.bind(this);
      //this.refreshList = this.refreshList.bind(this);
      this.setActiveSalarie = this.setActiveSalarie.bind(this);
      //this.searchTitle = this.searchTitle.bind(this);

      this.state = {
        salaries: []
      };
    }
    
    componentDidMount() {
      this.retrieveSalaries();
    }
  
   /* onChangeSearchTitle(e) {
      const searchTitle = e.target.value;
  
      this.setState({
        searchTitle: searchTitle
      });
    }*/
  
    retrieveSalaries() {
        SalariesService.getAll()
        .then(response => {
          this.setState({
            salaries: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
   /* refreshList() {
      this.retrieveSalaries();
      this.setState({
        currentSalarie: null,
        currentIndex: -1
      });
    }*/
  
    setActiveSalarie(salarie, index) {
      this.setState({
        currentSalarie: salarie,
        currentIndex: index
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
        const { salaries } = this.state;
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Nom prénom</th>
                      <th>Type de contrat</th>
                        <th>Poste</th>
                        <th>Manager</th>
                        <th>Entreprise</th>
                      </tr>
                    </thead>
                    <tbody>
                    {salaries.map( salarie => 
                      <tr key={salarie.id}>
                        <td>{salarie.nom + " " + salarie.prenom}</td>
                        {console.log(salarie.postes.length,"salarie.postes.length")}
                          {salarie.postes.length !== 0 ? salarie.postes.map(poste => 
                            <>
                            {(poste.dateFin === null || formatDate(poste.dateFin)) && (
                              <>
                              <td>{poste.typeContrat.type}</td>
                              <td>{poste.titrePoste.intitule}</td>
                              <td>{poste.manager !== null ? (poste.manager.nom + " " + poste.manager.prenom) : ' '}</td>
                              </>
                              )
                                
                              }
                            </>
                          ):(
                            <>
                              <td></td>
                              <td></td>
                              <td></td>
                            </>
                          )}
                            <td>{salarie.entreprise.nom}</td>
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

export default ListSalarie;