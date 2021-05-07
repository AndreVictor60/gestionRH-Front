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
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listes des salaries',
        to: '/salaries/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout d\'un salarie',
        to: '/salaries/creation',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Adresse',
    route: '/adresses',
    icon: 'cil-home',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listes des adresses',
        to: '/adresses/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout d\'une adresse',
        to: '/adresses/creation',
      },
    ],
  },{
    _tag: 'CSidebarNavDropdown',
    name: 'Entreprise',
    route: '/entreprises',
    icon: 'cil-list',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listes des entreprises',
        to: '/entreprises/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Ajout d\'une entreprise',
        to: '/entreprises/creation',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Type de contrat',
    route: '/type-contrat',
    icon: 'cil-spreadsheet',
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
    icon: 'cil-people',
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
    _tag: 'CSidebarNavDropdown',
    name: 'Rôle',
    route: '/role',
    icon: 'cil-badge',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des rôles',
        to: '/role/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'un rôle',
        to: '/role/creation',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Compétences',
    route: '/competence',
    icon: 'cil-school',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des compétences',
        to: '/competence/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'une compétence',
        to: '/competence/creation',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Intitulés de poste',
    route: '/titre-poste',
    icon: 'cil-bookmark',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des intitulés de poste',
        to: '/titre-poste/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'un intitulés de poste',
        to: '/titre-poste/creation',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Formations',
    route: '/formations',
    icon: 'cil-bookmark',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des formations',
        to: '/formations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'une formation',
        to: '/formations/creation',
      }
      ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Poste',
    route: '/poste',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Liste des postes',
        to: '/poste/liste',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Création d\'un poste',
        to: '/poste/creation',
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
    icon: 'cil-bookmark',
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
