import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CompetenceService from "../../services/competence.service";
import Pagination from "../Pagination/Pagination";

class ListCompetence extends Component {
    constructor(props) {
        super(props);
        this.retrieveCompetence = this.retrieveCompetence.bind(this);
        this.getNbTotalCompetence = this.getNbTotalCompetence.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.ifdelete = this.ifdelete.bind(this);
        this.state = {
          competences: [],
          currentPage: 0,
          sizePage: 10,
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
        CompetenceService.getAllComptenceByPage(pageNum,this.state.sizePage)
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
        text: "Voulez-vous supprimer cette compétence : '"+competence.nom+"' appartenant au(x) dommaine(s) : "+competence.domaines.map(domaine => domaine.titre + ", ")+"?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          CompetenceService.deleteById(competence.id).then(resp => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveCompetence: resp.data,//suppression OK
              competences: this.state.competences.filter(c => c.id !== competence.id)
            });
          }).catch((e) => {
            swal(e+"\nCette compétence est utilisée.", {
              icon: "error",
            });
            this.setState({
              message: e.message
            });
            console.log("erreur supression : ",e)
          });
        }
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
                      <th>Compétence</th>
                      <th>Domaine</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {competences.map( competence => 
                      <tr key={competence.id}>
                          <td>{competence.nom}</td>
                          <td>{competence.domaines.map(domaine => domaine.titre + ", ")}</td>
                          <td><Link to={"/competence/modification/" + competence.id}><CButton  className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link>
                          <CButton  color="danger" onClick={() => this.ifdelete(competence)} title="Vous voulez supprimer cette ligne ?">Supprimer</CButton></td>
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