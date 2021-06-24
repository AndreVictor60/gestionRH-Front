import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import logos from "../assets/icons/logo.png";
import CIcon from '@coreui/icons-react'
// sidebar nav config
import {navAdmin, navRH,navManager,navEmployee} from './_nav';
import jwt_decode from 'jwt-decode';




const TheSidebar = () => {
  
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeStateReducer.sidebarShow)
  const authen = useSelector(state => state.authen);
  const user = jwt_decode(authen.user);
  const isAdmin = user.roles.some(e => e.titre === "ADMIN");
  const isRH = user.roles.some(e => e.titre === "RH");
  const isManager = user.roles.some(e => e.titre === "MANAGER");
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          src={logos}
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          src={logos}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={isAdmin ? navAdmin : isRH ? navRH : isManager ? navManager : navEmployee }
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
