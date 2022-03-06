import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// routes
import Home from './routes/home';
import Posts from './routes/posts';

import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='home' element={<Home />} />
          <Route path='posts' element={<Posts />} />

          <Route path='*' element={
            <main><p>404 not found</p></main>
          } />
        </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

