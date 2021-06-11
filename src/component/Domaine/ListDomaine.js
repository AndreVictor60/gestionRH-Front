import { CButton } from "@coreui/react";
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
        this.ifdelete = this.ifdelete.bind(this);
        this.getNbTotalDomaine = this.getNbTotalDomaine.bind(this);
        this.state = {
          domaines: [],
          currentPage: 0,
          sizePage: 20,
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
        DomaineService.getAllDomaineByPage(pageNum,this.state.sizePage)
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
          DomaineService.delete(domaine.id).then(resp => {
            swal("Suppression bien prise en compte !", {
              icon: "success",
            });
            this.setState({
              retrieveDomaine: resp.data,//suppression OK
              domaines: this.state.domaines.filter(d => d.id !== domaine.id)
            });
          }).catch((e) => {
            swal(e+"\nCe domaine est utilisé.", {
              icon: "error",
            });
            this.setState({
              message: e.message
            });
            console.log("erreur supression : ",e)
          });
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
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
                          <td><Link to={"/domaine/modification/" + domaine.id}><CButton  className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link>
                          <CButton color="danger" onClick={() => this.ifdelete(domaine)}>Supprimer</CButton></td>
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