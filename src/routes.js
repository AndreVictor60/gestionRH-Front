import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const AllSalaries = React.lazy(() => import('./views/salaries/listSalarie'));
const AddSalarie = React.lazy(() => import('./views/salaries/addSalarie'));
const ProfilSalarie = React.lazy(() => import('./views/salaries/profilSalarie'));
const UpdateSalarie = React.lazy(() => import('./views/salaries/updateSalarie'));
const AllAdresses = React.lazy(() => import('./views/adresses/allAdresses'));
const Adresse = React.lazy(() => import('./views/adresses/Adresse'));
//const UpdateAdresse = React.lazy(() => import('./views/adresses/Adresse'))
const AllEntreprise = React.lazy(() => import('./views/entreprise/allEntreprise'));
const UpdateEntreprise = React.lazy(() => import('./views/entreprise/updateEntreprise'));
const CreateEntreprise = React.lazy(() => import('./views/entreprise/createEntreprise'));
const CreateAdresse = React.lazy(() => import('./views/adresses/CreateAdresseV'));
const AllTypeContrat = React.lazy(() => import('./views/type-contrat/allTypeContrat'));
const UpdateTypeContrat = React.lazy(() => import('./views/type-contrat/modification-type-contrat'));
const CreateTypeContrat = React.lazy(() => import('./views/type-contrat/creation-type-contrat'));
const AllDomaine = React.lazy(() => import('./views/domaine/allDomaine'));
const UpdateDomaine = React.lazy(() => import('./views/domaine/modification-domaine'));
const CreateDomaine = React.lazy(() => import('./views/domaine/creation-domaine'));
const CreateRole = React.lazy(() => import('./views/role/creation-role'));
const AllRole = React.lazy(() => import('./views/role/allRole'));
const UpdateRole = React.lazy(() => import('./views/role/modification-role'));
const AllCompetence = React.lazy(() => import('./views/competence/allCompetence'));
const CreateCompetence = React.lazy(() => import('./views/competence/creation-competence'));
const UpdateCompetence = React.lazy(() => import('./views/competence/modification-competence'));
const AllTitrePoste = React.lazy(() => import('./views/titre-poste/allTitrePoste'));
const CreateTitrePoste = React.lazy(() => import('./views/titre-poste/creation-titre-poste'));
const ListFormation = React.lazy(() => import('./views/formation/listFormation'));
const Formation = React.lazy(() => import('./views/formation/formation'));
const CreateFormation = React.lazy(() => import('./views/formation/createFormation'));
const UpdateFormation = React.lazy(() => import('./views/formation/updateFormation'));
const UpdateTitrePoste = React.lazy(() => import('./views/titre-poste/modification-titre-poste'));
const AllPoste = React.lazy(() => import('./views/poste/listPoste'));
const CreatePoste = React.lazy(() => import('./views/poste/creation-poste'));
const UpdatePoste = React.lazy(() => import('./views/poste/modification-poste'));
const AllEntretien = React.lazy(() => import('./views/entretiens/allEntretiens'));
const CreateEntretien = React.lazy(() => import('./views/entretiens/createEntretien'));
const UpdateEntretien = React.lazy(() => import('./views/entretiens/updateEntretien'));
const AllSalariesTest = React.lazy(() => import('./views/salaries/listSalarieTest'));
const UpdatePassword = React.lazy(() => import('./views/salaries/updatePassword'));

const routes = [
  { path: '/', exact: true, name: 'Home',role:[], component: Dashboard },
  { path: '/dashboard', name: 'Dashboard',role:[], component: Dashboard },
  { path: '/salaries', exact: true, name: 'Salaries',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}],redirectTo:"/dashboard", component: AllSalaries },
  { path: '/salaries/liste', name: 'Listes des salaries',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], redirectTo:"/dashboard",component: AllSalaries },
  { path: '/salaries/listetest', name: 'Listes des salaries test',role:[{name:"RH"},{name:'ADMIN'}], component: AllSalariesTest },
  { path: '/salaries/creation', name: 'Ajout dun salarie',role:[{name:"RH"},{name:'ADMIN'}], component: AddSalarie },
  { path: '/salaries/profil/:id', exact: true, name: 'Profil',role:[{name:"RH"},{name:'ADMIN'},{name:"MANAGER"},{name:'EMPLOYEE'}], component: ProfilSalarie },
  { path: '/salaries/modification/:id', exact: true, name: 'Modification d\'un salarié',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateSalarie },
  { path: '/salaries/updatePassword', exact: true, name: 'Modification du mot de passe',role:[{name:"RH"},{name:'ADMIN'},{name:"MANAGER"},{name:'EMPLOYEE'}], component: UpdatePassword },
  { path: '/adresses', exact: true, name: 'Adresses',role:[{name:"RH"},{name:'ADMIN'}], component: AllAdresses },
  { path: '/adresses/liste',exact: true, name: 'Listes des adresses',role:[{name:"RH"},{name:'ADMIN'}], component: AllAdresses },
  { path: '/adresses/modification/:id',exact: true, name: 'Modification adresse',role:[{name:"RH"},{name:'ADMIN'}], component: Adresse },
  { path: '/adresses/creation',exact: true, name: 'Créer une adresse',role:[{name:"RH"},{name:'ADMIN'}], component: CreateAdresse },
  { path: '/entreprises/liste',exact: true, name: 'Listes des entreprises',role:[{name:"RH"},{name:'ADMIN'}], component: AllEntreprise },
  { path: '/entreprises/modification/:id',exact: true, name: 'Modifier une entreprises',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateEntreprise },
  { path: '/entreprises/creation',exact: true, name: 'Créer une entreprises',role:[{name:"RH"},{name:'ADMIN'}], component: CreateEntreprise },
  { path: '/type-contrat', exact: true, name: 'Type de contrat',role:[{name:"RH"},{name:'ADMIN'}], component: AllTypeContrat },
  { path: '/type-contrat/liste',exact: true, name: 'Liste des types de contrat',role:[{name:"RH"},{name:'ADMIN'}], component: AllTypeContrat },
  { path: '/type-contrat/modification/:id',exact: true, name: 'Modifier un type de contrat',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateTypeContrat },
  { path: '/type-contrat/creation',exact: true, name: 'Créer un nouveau type de contrat',role:[{name:"RH"},{name:'ADMIN'}], component: CreateTypeContrat },
  { path: '/domaine', exact: true, name: 'Domaine',role:[{name:"RH"},{name:'ADMIN'}], component: AllDomaine },
  { path: '/domaine/liste',exact: true, name: 'Liste des domaines',role:[{name:"RH"},{name:'ADMIN'}], component: AllDomaine },
  { path: '/domaine/modification/:id',exact: true, name: 'Modification d\'un domaine',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateDomaine },
  { path: '/domaine/creation',exact: true, name: 'Creation d\'un domaine',role:[{name:"RH"},{name:'ADMIN'}], component: CreateDomaine },
  { path: '/role/creation',exact: true, name: 'Creation d\'un role',role:[{name:"RH"},{name:'ADMIN'}], component: CreateRole },
  { path: '/role', exact: true, name: 'Rôle',role:[{name:"RH"},{name:'ADMIN'}], component: AllRole },
  { path: '/role/liste',exact: true, name: 'Liste des rôles',role:[{name:"RH"},{name:'ADMIN'}], component: AllRole },
  { path: '/role/modification/:id',exact: true, name: 'Modification d\'un rôle',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateRole },
  { path: '/competence', exact: true, name: 'Compétences',role:[{name:"RH"},{name:'ADMIN'}], component: AllCompetence },
  { path: '/competence/liste',exact: true, name: 'Liste des compétences',role:[{name:"RH"},{name:'ADMIN'}], component: AllCompetence },
  { path: '/competence/creation',exact: true, name: 'Creation d\'une compétence',role:[{name:"RH"},{name:'ADMIN'}], component: CreateCompetence },
  { path: '/competence/modification/:id',exact: true, name: 'Modification d\'une compétence',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateCompetence },
  { path: '/titre-poste', exact: true, name: 'Intilulés de poste',role:[{name:"RH"},{name:'ADMIN'}], component: AllTitrePoste },
  { path: '/titre-poste/liste',exact: true, name: 'Liste des intitulés de poste',role:[{name:"RH"},{name:'ADMIN'}], component: AllTitrePoste },
  { path: '/titre-poste/creation',exact: true, name: 'Creation d\'un intitulé de poste',role:[{name:"RH"},{name:'ADMIN'}], component: CreateTitrePoste },
  { path: '/formations', exact: true, name: 'Listes des formations',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: ListFormation },
  { path: '/formations/voir/:id', exact: true, name: 'Formation',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: Formation },
  { path: '/formations/creation',exact: true, name: 'Creation d\'une formation',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: CreateFormation },
  { path: '/formations/modification/:id',exact: true, name: 'Modification d\'une formation',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: UpdateFormation },
  { path: '/titre-poste/modification/:id',exact: true, name: 'Modification d\'un intitulé de poste',role:[{name:"RH"},{name:'ADMIN'}], component: UpdateTitrePoste },
  { path: '/poste', exact: true, name: 'Postes',role:[{name:"RH"},{name:'ADMIN'}], component: AllPoste },
  { path: '/poste/liste',exact: true, name: 'Liste des postes',role:[{name:"RH"},{name:'ADMIN'}], component: AllPoste },
  { path: '/poste/creation',exact: true, name: 'Création d\'un poste',role:[{name:"RH"},{name:'ADMIN'}], component: CreatePoste },
  { path: '/poste/modification/:id',exact: true, name: 'Modifier un poste',role:[{name:"RH"},{name:'ADMIN'}], component: UpdatePoste },
  { path: '/entretiens', exact: true, name: 'Entretiens',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: AllEntretien },
  { path: '/entretiens/liste', exact: true, name: 'Liste des entretiens',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: AllEntretien },
  { path: '/entretiens/creation',exact: true, name: 'Creation d\'un entretien',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: CreateEntretien },
  { path: '/entretiens/modification/:id',exact: true, name: 'Modifier un entretien',role:[{name:"RH"},{name:'ADMIN'},{name:'MANAGER'}], component: UpdateEntretien },
];

export default routes;
