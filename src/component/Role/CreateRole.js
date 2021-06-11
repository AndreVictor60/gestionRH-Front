import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import RoleService from "../../services/role.service";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.createRole = this.createRole.bind(this);
    this.state = {
      currentErrors:{
        title: null,
        titleBool: true
      },
        currentRole: {
        id: null, 
        titre: ""
      },
      message: "",
      ifError: null
    };
  }

  onChangeRole(e){
    const role = e.target.value;
    if (role === "" || role === null || role.length === 0) {
      this.setState((prevState) => ({
        currentRole: {
          ...prevState.currentRole,
          titre: role,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: "Le champ nom est requis.",
          titleBool: true
        }
      }));
    }else{
      this.setState((prevState) => ({
        currentRole: {
          ...prevState.currentRole,
          titre: role,
        },
        currentErrors: {
          ...prevState.currentErrors,
          title: null,
          titleBool: false
        }
      }));
    }
  }

  createRole(e) {
    e.preventDefault();
    if(this.state.currentErrors.titleBool){
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      RoleService.saveRole(this.state.currentRole)
      .then(response => {
          this.setState({
              currentRole: response.data,
              message: "Création bien prise en compte ! Redirection vers la liste de role.",
              ifError: false
          });
          window.setTimeout(() => {this.props.history.push("/role/liste")}, 3000);
        })
        .catch(e => {
          this.setState({
              message: e.message,
              ifError: true
            });
        });
    }
    
  }

  render() {
    const { currentRole,currentErrors,message,ifError } = this.state;

    return (
      <div>
          <div className="edit-form">
            <form name="createRole" onSubmit={this.createRole}>
              <div className="form-group">
                <label htmlFor="title">Créer un nouveau rôle</label>
                <input type="text" name="title" className="form-control" id="title" value={currentRole.titre} onChange={this.onChangeRole}/>
                <span className="text-danger">{currentErrors.title}</span>
              </div>
              <CButton type="submit" block  color="info">
                Créer
              </CButton>
            </form>
            {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
          </div>
      </div>
    );
  }
}

export default withRouter(CreateRole);