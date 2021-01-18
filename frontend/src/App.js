import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { PrivateRoute, Alert } from 'components';
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/role';

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
  CustomerAddressDetails,
  QuoteList,
  QuoteAddEdit,
  QuoteDetails,
  AccountList,
  AccountAddEdit,
  AccountDetails,
  AccountSettings,
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
        <PrivateRoute exact path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
        <PrivateRoute exact path={ROUTES.QUOTES} component={QuoteList} />
        <PrivateRoute exact path={ROUTES.QUOTE_ADD} component={QuoteAddEdit} />
        <PrivateRoute exact path={ROUTES.QUOTE_EDIT} component={QuoteAddEdit} />
        <PrivateRoute exact path={ROUTES.QUOTE_DETAILS} component={QuoteDetails} />
        <PrivateRoute exact path={ROUTES.QUOTES} component={QuoteList} />
        <PrivateRoute exact path={ROUTES.CUSTOMERS} component={CustomerList} />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_ADD}
          component={CustomerAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_EDIT}
          component={CustomerAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute exact path={ROUTES.CUSTOMER_DETAILS} component={CustomerDetails} />
        <PrivateRoute exact path={ROUTES.CUSTOMER_ADDRESSES} component={CustomerAddressList} />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_ADDRESS_ADD}
          component={CustomerAddressAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_ADDRESS_EDIT}
          component={CustomerAddressAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute
          exact
          path={ROUTES.CUSTOMER_ADDRESS_DETAILS}
          component={CustomerAddressDetails}
        />
        <PrivateRoute exact path={ROUTES.ACCOUNTS} component={AccountList} roles={ROLES.Manager} />
        <PrivateRoute
          exact
          path={ROUTES.ACCOUNT_ADD}
          component={AccountAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute
          exact
          path={ROUTES.ACCOUNT_EDIT}
          component={AccountAddEdit}
          roles={ROLES.Manager}
        />
        <PrivateRoute
          exact
          path={ROUTES.ACCOUNT_DETAILS}
          component={AccountDetails}
          roles={ROLES.Manager}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export { App };
