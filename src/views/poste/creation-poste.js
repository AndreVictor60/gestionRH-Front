import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CreatePoste from '../../component/Poste/CreatePoste';

const CreationPoste = () => {
  return (
    <>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Création d'un poste
          </CCardHeader>
          <CCardBody>
            <CreatePoste />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </>
  )
}

export default CreationPoste
