import { CButton } from "@coreui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import TypeContratService from "../../services/type-contrat.service";

class ListTypeContrat extends Component {
    constructor(props) {
        super(props);
        this.retrieveTypeContrat = this.retrieveTypeContrat.bind(this);
        this.state = {
          typescontrat: []
        };
    }

    componentDidMount() {
        this.retrieveTypeContrat();
    }

    retrieveTypeContrat() {
        TypeContratService.getAllTypeContrat()
        .then(response => {
          this.setState({
            typescontrat: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    ifdelete(typecontrat){
      swal({
        title: "Êtes-vous sûrs ?",
        text: "Voulez-vous supprimer se type de contrat : '"+typecontrat.type+"' ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteTypeContrat(typecontrat.id)
          swal("Suppression bien prise en compte !", {
            icon: "success",
          });
        }
      });
    }

    deleteTypeContrat(id) {
      TypeContratService.delete(id)
        .then(response => {
          console.log(response.data);
          this.setState({
            retrieveTypeContrat: response.data,//suppression OK
            typescontrat: this.state.typescontrat.filter(tp => tp.id !== id)
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
      const { typescontrat } = this.state;
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
                  {typescontrat.map( typecontrat => 
                      <tr key={typecontrat.id}>
                          <td>{typecontrat.type}</td>
                          <td><Link to={"/type-contrat/modification/" + typecontrat.id}><CButton  className="mr-2" color="info" title="Vous voulez modifier cette ligne ?">Modifier</CButton></Link>
                          <CButton  color="danger" onClick={() => this.ifdelete(typecontrat)} title="Vous voulez supprimer cette ligne ?"> Supprimer</CButton></td>
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

export default ListTypeContrat;