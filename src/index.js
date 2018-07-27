import React from 'react';
import { render as Render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createHashHistory } from 'history';
import App from './App.jsx'

const HashHistory = createHashHistory();

Render(
  <Router history={HashHistory}
    basename='/'
  >
    <App />
  </Router>, document.getElementById('app')
)