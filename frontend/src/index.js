import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { history } from '_helpers';
import { Loader } from 'components';
import { App } from './App';
import { accountService } from './_services';
import './i18n';
import 'normalize.css';
import './styles/main.scss';

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  render(
    <React.StrictMode>
      <Suspense fallback={<Loader centered />}>
        <Router history={history}>
          <App />
        </Router>
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
