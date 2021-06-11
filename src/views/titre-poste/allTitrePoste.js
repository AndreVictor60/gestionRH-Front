import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
//import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import ListTitrePoste from '../../component/TitrePoste/ListTitrePoste';


class AllTitrePoste extends Component {
    render() {
      return(
        <>
          <CRow>
            <CCol lg="12">
              <CCard>
                <CCardHeader>
                  Listes des intitulés de poste
                </CCardHeader>
                <CCardBody>
                <CRow className="align-items-right mt-3">
                  <CCol xl md={{ span: 2, offset: 10 }}>
                      <CButton to={"/titre-poste/creation"} className="float-right" block variant="outline" color="info">
                        <CIcon name="cil-user" />  Ajout d'un intitulé de poste
                      </CButton>
                  </CCol>
                </CRow>
                <ListTitrePoste />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )
    }
  }
  
  export default AllTitrePoste