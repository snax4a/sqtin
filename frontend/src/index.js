import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { history } from '_helpers';
import { accountService } from './_services';

import { App } from './app';
import 'normalize.css';
import './styles/main.scss';

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
