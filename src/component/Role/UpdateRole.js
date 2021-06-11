import { CAlert, CButton } from "@coreui/react";
import React, { Component } from "react";
import { withRouter } from "react-router";
import RoleService from "../../services/role.service";

class UpdateRole extends Component {
  constructor(props) {
    super(props);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.getRole = this.getRole.bind(this);
    this.state = {
      currentErrors:{
        title: null,
        titleBool: true
      },
        currentRole: {
        id: 0,
        titre: ""
      },
      message: "",
      ifError: null
    };
  }

  componentDidMount() {
   this.getRole(this.props.roleId.id);
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
  
  getRole(id) {
    RoleService.getRoleById(id)
      .then(response => {
        this.setState({
            currentRole: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateRole(e) {
    e.preventDefault();
    console.log("condition",this.state.currentErrors.titleBool)
    if(this.state.currentErrors.titleBool){
      console.log("dans le if");
      this.setState({
        message: "Une erreur est présente dans votre formulaire.",
        ifError: true
      });
    }else{
      RoleService.updateRole(this.state.currentRole)
      .then(response => {
        console.log(response.data);
        this.setState({
            currentRole: response.data,
            message: 'Modification bien prise en compte ! Redirection vers la liste de role.',
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
    const { currentRole,currentErrors, ifError,message } = this.state;
    console.log(this.state.currentRole);
    return (
      <div>
          <div className="edit-form">
            <form name="updateRole" onSubmit={this.updateRole}>
              <div className="form-group">
                <label htmlFor="role">Nom du rôle</label>
                <input type="text" name="role" className="form-control" id="role" value={currentRole.titre} onChange={this.onChangeRole}/>
                <span className="text-danger">{currentErrors.title}</span>
              </div>
              <CButton type="submit" block  color="info">
                Modifier
              </CButton>
            </form>
          </div>
          {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
      </div>
    );
  }
}

export default withRouter(UpdateRole)