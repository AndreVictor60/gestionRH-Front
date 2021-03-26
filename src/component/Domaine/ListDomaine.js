import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DomaineService from "../../services/domaine.service";

class ListDomaine extends Component {
    constructor(props) {
        super(props);
        this.retrieveDomaine = this.retrieveDomaine.bind(this);
        this.state = {
          domaines: []
        };
    }

    componentDidMount() {
        this.retrieveDomaine();
    }

    retrieveDomaine() {
        DomaineService.getAllDomaine()
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
      const { domaines } = this.state;
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
                <p>{this.state.message}</p>
              </div>
          </div>
        </>
    );
      
  }
}

export default ListDomaine;