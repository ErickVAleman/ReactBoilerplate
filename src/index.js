import React from 'react';
import { render as Render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { History as HashHistory } from 'history';
import App from './App.jsx'

Render(
  <Router history={HashHistory}
    basename='/'
  >
    <App />
  </Router>, document.getElementById('app')
)