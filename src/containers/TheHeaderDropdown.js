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

class TheHeaderDropdown extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  logOutClick () {
    AuthService.logout();
    window.location = "/login";
  }
  
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div>
          <p>{user}</p>
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
          <CIcon name="cil-user" className="mfe-2" />Profile
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
/**
 * TODO
 * 
 * mettre un lien deconnexion avec redirect vers la page Login
 */