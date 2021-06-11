import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
//import { Link } from 'react-router-dom'
import CreateTypeContrat from '../../component/TypeContrat/CreateTypeContrat';

class createTypeContrat extends Component {

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Création d'un nouveau type de contrat
              </CCardHeader>
              <CCardBody>
                <CreateTypeContrat />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default createTypeContrat
