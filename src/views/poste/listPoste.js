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
import ListPoste from '../../component/Poste/ListPoste';

class AllPoste extends Component {
  constructor(props) {
    super(props);
    this.state = {
         postes: [],
         };
  }

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Listes des postes
              </CCardHeader>
              <CCardBody>
              <CRow className="align-items-right mt-3">
                <CCol xl md={{ span: 2, offset: 10 }}>
                    <CButton className="float-right" block variant="outline" color="info" to="/poste/creation">
                      <CIcon name="cil-user" />  Ajout d'un poste
                    </CButton>
                </CCol>
              </CRow>
              <ListPoste />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default AllPoste
