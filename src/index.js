import React from 'react';
import { render as Render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';1
import App from './App.jsx'
import sw from './sw'

Render(
  <Router basename='/'>
    <App />
  </Router>, document.getElementById('app')
)
sw();