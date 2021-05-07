import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DomaineService from "../../services/domaine.service";
import Pagination from "../Pagination/Pagination";

class ListDomaine extends Component {
    constructor(props) {
        super(props);
        this.retrieveDomaine = this.retrieveDomaine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          domaines: [],
          currentPage: 0,
          sizePage: 2,
          nbTotalDomaine: null,
          nbTotalPage: null,
          nbPage: null
        };
    }

    componentDidMount() {
        this.retrieveDomaine(this.state.currentPage);
        this.getNbTotalDomaine();
    }

    getNbTotalDomaine(){
      DomaineService.countDomaine().then(resp => {
        this.setState({
          nbTotalDomaine: resp.data
        }); 
        console.log("resp : ",resp);        
      })
    }

    handleClick(pageNum) {
      this.setState({ currentPage: pageNum });
      this.retrieveDomaine(pageNum);
    }

    retrieveDomaine(pageNum) {
        DomaineService.getAllDomaineByPage(pageNum,2)
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

    ifdelete(domaine){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer se domaine : '"+domaine.titre+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteDomaine(domaine.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
      /*window.confirm("Voulez-vous supprimer se domaine : '"+domaine.titre+"' ?") &&
        this.deleteDomaine(domaine.id)*/
    }

    deleteDomaine(id) {
      DomaineService.delete(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveDomaine: response.data,//suppression OK
            domaines: this.state.domaines.filter(d => d.id !== id)
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
      const { domaines, currentPage, nbTotalDomaine, sizePage } = this.state;
      const nbPage = Math.ceil(nbTotalDomaine / sizePage);
      console.log("nbPage : ",nbPage);
      console.log("nbTotalDomaine : ",nbTotalDomaine);
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
                  {domaines.map( domaine => 
                      <tr key={domaine.id}>
                          <td>{domaine.titre}</td>
                          <td><Link to={"/domaine/modification/" + domaine.id}>Modifier</Link> / <Link onClick={() => this.ifdelete(domaine)}>Supprimer</Link></td>
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

export default ListDomaine;