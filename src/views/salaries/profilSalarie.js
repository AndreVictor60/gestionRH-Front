import React from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from '../users/UsersData'

const ProfilSalarie = ({match}) => {
  const user = usersData.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
          <CCardFooter>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="info" aria-pressed="true">Modifier</CButton>
            </CCol>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Liste des formations
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
              <thead>
                    <tr>
                    <th>Titre</th>
                    <th>Date de début </th>
                    <th>Date de fin</th>
                    <th>Volume horaire</th>
                    <th>Forfait jour</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Développeur J2EE</td>
                    <td>28/11/2020</td>
                    <td>25/02/2021</td>
                    <td>399</td>
                    <td></td>
                    </tr>
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProfilSalarie
