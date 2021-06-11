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
import ListCompetence from '../../component/Competence/ListCompetence';


class AllCompetence extends Component {
    render() {
      return(
        <>
          <CRow>
            <CCol lg="12">
              <CCard>
                <CCardHeader>
                  Listes des compétences
                </CCardHeader>
                <CCardBody>
                <CRow className="align-items-right mt-3">
                  <CCol xl md={{ span: 2, offset: 10 }}>
                      <CButton to={"/competence/creation"} className="float-right" block variant="outline" color="info">
                        <CIcon name="cil-user" />  Ajout d'une compétence
                      </CButton>
                  </CCol>
                </CRow>
                <ListCompetence />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )
    }
  }
  
  export default AllCompetence