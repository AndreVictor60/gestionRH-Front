import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import UpdatePassword from '../../component/Salarie/UpdatePassword';

class updatePassword extends Component {

  render() {
    return(
      <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Modification du mot de passe
            </CCardHeader>
            <CCardBody>
              <UpdatePassword/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
    )
  }
}

export default updatePassword
