import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { PrivateRoute, Alert } from 'components';
import * as ROUTES from 'constants/routes';

import { Features, Home, Login, Dashboard, CustomerList, CustomerAddEdit } from './pages';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.FEATURES} component={Features} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
        <PrivateRoute path={ROUTES.CUSTOMERS} component={CustomerList} />
        <PrivateRoute path={ROUTES.CUSTOMER_ADD} component={CustomerAddEdit} />
        <PrivateRoute path={ROUTES.CUSTOMER_EDIT} component={CustomerAddEdit} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export { App };
