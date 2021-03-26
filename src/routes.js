import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const AllSalaries = React.lazy(() => import('./views/salaries/allSalaries'));
const AddSalarie = React.lazy(() => import('./views/salaries/addSalarie'));
const ProfilSalarie = React.lazy(() => import('./views/salaries/profilSalarie'));
const AllAdresses = React.lazy(() => import('./views/adresses/allAdresses'));
const Adresse = React.lazy(() => import('./views/adresses/Adresse'));
const AllTypeContrat = React.lazy(() => import('./views/type-contrat/allTypeContrat'));
const UpdateTypeContrat = React.lazy(() => import('./views/type-contrat/modification-type-contrat'));
const CreateTypeContrat = React.lazy(() => import('./views/type-contrat/creation-type-contrat'));
const AllDomaine = React.lazy(() => import('./views/domaine/allDomaine'));
const UpdateDomaine = React.lazy(() => import('./views/domaine/modification-domaine'));
const CreateDomaine = React.lazy(() => import('./views/domaine/creation-domaine'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/salaries', exact: true, name: 'Salaries', component: AllSalaries },
  { path: '/salaries/liste', name: 'Listes des salaries', component: AllSalaries },
  { path: '/salaries/add-salarie', name: 'Ajout dun salarie', component: AddSalarie },
  { path: '/salaries/profil/:id', exact: true, name: 'Profil', component: ProfilSalarie },
  { path: '/adresses', exact: true, name: 'Adresses', component: AllAdresses },
  { path: '/adresses/liste',exact: true, name: 'Listes des adresses', component: AllAdresses },
  { path: '/adresses/:id',exact: true, name: 'Une adresse', component: Adresse },
  { path: '/type-contrat', exact: true, name: 'Type de contrat', component: AllTypeContrat },
  { path: '/type-contrat/liste',exact: true, name: 'Liste des types de contrat', component: AllTypeContrat },
  { path: '/type-contrat/modification/:id',exact: true, name: 'Modifier un type de contrat', component: UpdateTypeContrat },
  { path: '/type-contrat/creation',exact: true, name: 'Créer un nouveau type de contrat', component: CreateTypeContrat },
  { path: '/domaine', exact: true, name: 'Domaine', component: AllTypeContrat },
  { path: '/domaine/liste',exact: true, name: 'Liste des domaines', component: AllDomaine },
  { path: '/domaine/modification/:id',exact: true, name: 'Modification d\'un domaine', component: UpdateDomaine },
  { path: '/domaine/creation',exact: true, name: 'Creation d\'un domaine', component: CreateDomaine }
];

export default routes;
