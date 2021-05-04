import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CreateSalarie from '../../component/Salarie/CreateSalarie';

const AddSalarie = () => {
  return (
    <>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Création d'une salarié
          </CCardHeader>
          <CCardBody>
            <CreateSalarie />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </>
  )
}

export default AddSalarie
