import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    /*badge: {
      color: 'info',
      text: 'NEW',
    }*/
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Salariés',
    route: '/salaries',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listes des salaries',
        to: '/salaries/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout d\'un salarie',
        to: '/salaries/add-salarie',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Adresse',
    route: '/adresses',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listes des adresses',
        to: '/adresses/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout d\'une adresse',
        to: '/adresses/add-adresse',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Type de contrat',
    route: '/type-contrat',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des types de contrat',
        to: '/type-contrat/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'un types de contrat',
        to: '/type-contrat/creation',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Domaine',
    route: '/domaine',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des domaines',
        to: '/domaine/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'un domaines',
        to: '/domaine/creation',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  }
]

export default _nav
