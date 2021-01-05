import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { PrivateRoute, Alert } from 'components';
import * as ROUTES from 'constants/routes';

import {
  Features,
  Home,
  Login,
  Dashboard,
  CustomerList,
  CustomerAddEdit,
  CustomerDetails,
  CustomerAddressList,
  CustomerAddressAddEdit,
} from './pages';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Alert />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.FEATURES} component={Features} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
        <PrivateRoute exact path={ROUTES.CUSTOMERS} component={CustomerList} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_ADD} component={CustomerAddEdit} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_EDIT} component={CustomerAddEdit} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_DETAILS} component={CustomerDetails} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_ADDRESSES} component={CustomerAddressList} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_ADDRESS_ADD} component={CustomerAddressAddEdit} />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_ADDRESS_EDIT}
          component={CustomerAddressAddEdit}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export { App };
