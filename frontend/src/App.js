import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages';
import * as ROUTES from './constants/routes';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}