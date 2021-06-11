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
import CreateTitrePoste from '../../component/TitrePoste/CreateTitrePoste';

class createTitrePoste extends Component {

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Création d'un nouveau intitulé de poste
              </CCardHeader>
              <CCardBody>
                <CreateTitrePoste />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default createTitrePoste
