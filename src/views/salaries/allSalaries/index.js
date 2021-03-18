import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
import usersData from '../../users/UsersData'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
const fields = [
  { key: 'Nom', _style: { width: '40%'} },
  { key: 'Poste', _style: { width: '40%'} },
  { key: 'Manager', _style: { width: '20%'} },
  { key: 'Implatation', _style: { width: '20%'}, sorter: false },
]

const perPageLabel = { label: 'Salarie par page :'}
const filterLabel = { label: 'Recherche :',placeholder: 'Votre recherche...'}

const AllSalaries = () => {
  return (<>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Listes des salaries
          </CCardHeader>
          <CCardBody>
          <CRow className="align-items-right mt-3">
            <CCol xl md={{ span: 2, offset: 10 }}>
                <CButton className="float-right" block variant="outline" color="info">
                  <CIcon name="cil-user" />  Ajout d'un salarié
                </CButton>
            </CCol>
          </CRow>
          <CDataTable
              items={usersData}
              fields={fields}
              tableFilter={filterLabel}
              itemsPerPageSelect={perPageLabel}
              itemsPerPage={10}
              sorter
              hover
              clickableRows
              pagination
              scopedSlots = {{
                'Nom':
                    (item, index)=>{
                      return (
                        <td className="py-2">
                         <Link to={`/salarie/profil/${item.id}`}>{item.Nom}</Link>
                        </td>
                    )
                  }
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default AllSalaries
