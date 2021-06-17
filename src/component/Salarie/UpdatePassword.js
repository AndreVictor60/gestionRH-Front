import React, { Component } from 'react';
import { withRouter } from "react-router";
import { CButton, CAlert } from "@coreui/react";
// eslint-disable-next-line no-unused-vars
import SalariesService from "../../services/salaries.service";

class UpdatePassword extends Component {
    constructor(props) {
        super(props)
        this.updatePassword = this.updatePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validationForm = this.validationForm.bind(this);
        this.state = {
            currentErrors: {
                password: null,
                passwordMatch: null,
                passwordC: null,
                passwordMatchBool: null,
                passwordBool: null,
                passwordCBool: null,
            },
            password: "",
            passwordC: "",
            currentUser: {},
            message: "",
            ifError: null
        };
    }

    componentDidMount() {
        const { state } = this.props.location;
        this.setState({ currentUser: state })
        if(state === undefined){
            this.props.history.push("/home");
        }
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        if (name === "password") {
            if (value === "" || value === null || value.length === 0) {
                console.log(value.length, "le mot de passe est vide")
                this.setState((prevState) => ({
                    currentErrors: {
                        ...prevState.currentErrors,
                        password: "Ce champ est requis.",
                        passwordBool: true,
                    }
                }));

            } else {
                this.setState((prevState) => ({
                    password: value,
                    currentErrors: {
                        ...prevState.currentErrors,
                        password: null,
                        passwordBool: false,
                        passwordMatch: null,
                        passwordMatchBool: false,
                    }
                }));
            }
        }
        if (name === "passwordC") {
            if (value === "" || value === null || value.length === 0) {
                this.setState((prevState) => ({
                    currentErrors: {
                        ...prevState.currentErrors,
                        passwordC: "Ce champ est requis.",
                        passwordCBool: true,
                    }
                }));
            } else {
                this.setState((prevState) => ({
                    currentErrors: {
                        ...prevState.currentErrors,
                        passwordC: null,
                        passwordCBool: false,
                        passwordMatch: null,
                        passwordMatchBool: false,
                    },
                    passwordC: value
                }));
            }
        }
    }

    validationForm() {
        const { password, passwordC } = this.state
        console.log(password, passwordC)
        if (password !== passwordC) {
            this.setState((prevState) => ({
                currentErrors: {
                    ...prevState.currentErrors,
                    passwordMatch: "Les mots de passe ne correspondent pas.",
                    passwordMatchBool: true,
                    passwordCBool: true,
                    passwordBool: true
                }
            }));
            console.log("errur")
            return false
        } else {
            this.setState((prevState) => ({
                currentErrors: {
                    ...prevState.currentErrors,
                    passwordMatch: null,
                    passwordMatchBool: false,
                }
            }));
            console.log("passe")
            return true
        }
    }

    updatePassword(e) {
        e.preventDefault();
        if(this.validationForm()){
            console.log(this.state.currentUser.id,this.state.password);
            SalariesService.updatePassword(this.state.currentUser.id,this.state.password)
            .then((resp) => console.log(resp))
            .catch((error) => console.log(error))
        }else{
            console.log("erreur")
        }
    }


    render() {
        const { currentUser, currentErrors, ifError, message } = this.state;
        return (
            <div>
                {(currentUser !== undefined ? (
                    <>
                        <div className="submit-form">
                            <form name="updatePasswordForm" onSubmit={this.updatePassword}>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="password" className={currentErrors.passwordBool ? "font-weight-bold text-danger" : "font-weight-bold"}
                                            >Mot de passe *</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className={currentErrors.passwordBool ? "form-control is-invalid" : "form-control"}
                                                id="password"
                                                onChange={this.handleChange}
                                                required
                                            />
                                            <span className="text-danger">{currentErrors.password}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="passwordC" className={currentErrors.passwordCBool ? "font-weight-bold text-danger" : "font-weight-bold"}>
                                                Confirmation du mot de passe *
                                            </label>
                                            <input
                                                type="password"
                                                name="passwordC"
                                                className={currentErrors.passwordCBool ? "form-control is-invalid" : "form-control"}
                                                id="passwordC"
                                                onChange={this.handleChange}
                                                required
                                            />
                                            <span className="text-danger">{currentErrors.passwordC}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-danger">{currentErrors.passwordMatch}</p>
                                <CButton type="submit" block color="info">
                                    Modification du mot de passe
                                </CButton>
                            </form>
                            {ifError != null && <CAlert color={ifError ? "danger" : "success"}>{message}</CAlert>}
                        </div>
                    </>
                ) : (
                    // TODO: Retourne au dernier element
                    <>
                        <p>Il y a pas utilisateur</p>
                    </>
                ))}


            </div>
        )
    }
}
export default withRouter(UpdatePassword);