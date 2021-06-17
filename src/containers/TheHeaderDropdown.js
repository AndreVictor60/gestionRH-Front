import React, { Component } from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthService from "../services/auth.service";
import { withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class TheHeaderDropdown extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      user: {}
    };
  }

  componentDidMount(){
    const token = JSON.parse(localStorage.getItem('token'));
    this.setState({user:jwt_decode(token)})
  }

  logOutClick () {
    AuthService.logout();
    window.location = "/login";
  }
  
  render() {
    const { user } = this.state;
    console.log("user",user);
    return (
      <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div>
          <p>{user.email}</p>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <Link to={`/salaries/profil/${user.id}`}><CIcon name="cil-user" className="mfe-2" />Profile</Link>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={ () => this.logOutClick()} to="/login">
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Deconnexion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    )
  }
}

export default withRouter(TheHeaderDropdown)