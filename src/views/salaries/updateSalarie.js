import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import UpdateSalarie from '../../component/Salarie/UpdateSalarie';

class updateSalarie extends Component {

  render() {
    return(
      <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Modification du salarié
            </CCardHeader>
            <CCardBody>
              <UpdateSalarie salarieId={this.props.match.params} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
    )
  }
}

export default updateSalarie
