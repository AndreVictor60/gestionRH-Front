import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { connect } from "react-redux";
import { login } from "../redux/actions/actionCreatorAuthentification";

class Authentification extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("submit");
    this.setState({
      loading: true,
    });
    const { dispatch, history } = this.props;
    dispatch(login(this.state.email, this.state.password))
      .then(() => {
        if (this._isMounted) {
        history.push("/");
        window.location.reload();
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <CForm onSubmit={this.handleLogin}>
          <h1>S'identifier</h1>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <p className="text-muted">Veuillez saisir vos identifiants</p>
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Adresse email"
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-lock-locked" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Mot de passe"
            />
          </CInputGroup>
          <CRow>
            <CCol xs="6">
              <CButton type="submit" color="primary" className="px-4">
                Connexion
              </CButton>
            </CCol>
            <CCol xs="6" className="text-right">
              <CButton color="link" className="px-0">
                Mot de passe oublié?
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authen;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Authentification);
