import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'normalize.css';
import './styles/main.scss';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
