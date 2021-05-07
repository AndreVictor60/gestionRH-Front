import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CompetenceService from "../../services/competence.service";
import Pagination from "../Pagination/Pagination";

class ListCompetence extends Component {
    constructor(props) {
        super(props);
        this.retrieveCompetence = this.retrieveCompetence.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          competences: [],
          currentPage: 0,
          sizePage: 2,
          nbTotalCompetence: null,
          nbTotalPage: null
        };
    }

    componentDidMount() {
        this.retrieveCompetence(this.state.currentPage);
        this.getNbTotalCompetence();
    }

    getNbTotalCompetence(){
      CompetenceService.countCompetence().then(resp => {
        this.setState({
          nbTotalCompetence: resp.data
        }); 
      })
    }

    handleClick(pageNum) {
      this.setState({ currentPage: pageNum });
      this.retrieveCompetence(pageNum);
    }

    retrieveCompetence(pageNum) {
        CompetenceService.getAllComptenceByPage(pageNum,2)
        .then(response => {
          this.setState({
            competences: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    ifdelete(competence){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer cette compétence : '"+competence.nom+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteCompetence(competence.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
    }

    deleteCompetence(id) {
        CompetenceService.deleteById(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveCompetence: response.data,//suppression OK
            competences: this.state.competences.filter(c => c.id !== id)
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
      const { competences, currentPage, nbTotalCompetence, sizePage } = this.state;
      const nbPage = Math.ceil(nbTotalCompetence / sizePage);
      return (
          <>
          <div className="row mt-4">
            <div className="col-lg-12">
              <table className="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                      <th>Nom</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {competences.map( competence => 
                      <tr key={competence.id}>
                          <td>{competence.nom}</td>
                          <td><Link to={"/competence/modification/" + competence.id}>Modifier</Link> / <Link onClick={() => this.ifdelete(competence)}>Supprimer</Link></td>
                      </tr>
                    )}
                    </tbody>
                </table>
                <Pagination totalPages={nbPage} currentPage={currentPage}  paginate={this.handleClick} ></Pagination>
              </div>
          </div>
        </>
    );
      
  }
}

export default ListCompetence;