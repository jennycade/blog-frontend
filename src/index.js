import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

// routes
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

