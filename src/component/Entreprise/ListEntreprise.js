import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntreprisesService from "../../services/entreprises.service";
import Pagination from "../Pagination/Pagination";
class ListEntreprise extends Component {
    constructor(props) {
      super(props);
      this.retrieveEntreprise = this.retrieveEntreprise.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
      this.state = {
        entreprises: [],
        currentPage: 0,
        sizePage: 2,
        nbTotalEntreprise: null,
        nbTotalPage: null
      };
    }

    componentDidMount() {
        this.retrieveEntreprise(this.state.currentPage);
        this.getNbTotalEntreprise();
    }

    getNbTotalEntreprise(){
      EntreprisesService.countEntreprise().then(resp => {
        this.setState({
          nbTotalEntreprise: resp.data.length
        }); 
      })
    }
    handleClick(pageNum) {
        this.setState({ currentPage: pageNum });
        this.retrieveEntreprise(pageNum);
    }
    nextPage(){
      this.setState({ currentPage: this.state.currentPage + 1 })
      this.retrieveEntreprise(this.state.currentPage);
    }

    prevPage(){
      this.setState({ currentPage: this.state.currentPage - 1 })
      console.log(this.state.currentPage)
      this.retrieveEntreprise(this.state.currentPage);
    }

    /*componentDidUpdate(){
      this.retrieveEntreprise();
    }*/

    retrieveEntreprise(pageNum) {
        EntreprisesService.getAllEntreprisesPage(pageNum,2)
        .then(response => {
          this.setState({
            entreprises: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    render() {
        const { entreprises,currentPage,nbTotalEntreprise,sizePage } = this.state;
        const nbPage = Math.ceil(nbTotalEntreprise / sizePage);
        return (
            <>
            <div className="row mt-4">
              <div className="col-lg-12">
                <table className="table table-hover table-striped table-bordered">
                  <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Complément</th>
                        <th>Ville</th>
                        <th>Pays</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {entreprises.map( entreprises => 
                        <tr key={entreprises.id}>
                            <td>{entreprises.nom}</td>
                            <td>{entreprises.adresse.numero + " " + entreprises.adresse.voie}</td>
                            <td>{entreprises.adresse.complementAdresse}</td>
                            <td>{entreprises.adresse.ville + " " + entreprises.adresse.codePostal}</td>
                            <td>{entreprises.adresse.pays}</td>
                            <td><Link to={"/entreprises/modification/" + entreprises.id}>Modifier</Link></td>
                        </tr>
                      )}
                      </tbody>
                  </table>
                  <Pagination totalPages={nbPage} currentPage={currentPage}  paginate={this.handleClick} nextPage={this.nextPage} prevPage={this.prevPage} ></Pagination>
                </div>
            </div>
          </>
      );
        
    }
}

export default ListEntreprise;