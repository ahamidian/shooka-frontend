import React from 'react';

import DefaultLayout from './components/DefaultLayout';
import TicketsTable from './components/Tickets/Tickets2';



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/tickets/', exact: true, name: 'Tickets', component: TicketsTable },
  { path: '/tickets/:query', exact: true, name: 'Tickets', component: TicketsTable },

];

export default routes;
