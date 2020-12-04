import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Features, Home, Login, Dashboard } from './pages';
import * as ROUTES from './constants/routes';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route exact path={ROUTES.FEATURES}>
          <Features />
        </Route>
        <Route exact path={ROUTES.LOGIN}>
          <Login />
        </Route>
        <Route exact path={ROUTES.DASHBOARD}>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}
