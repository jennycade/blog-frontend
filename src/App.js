import './App.css';

// react
import { useState } from 'react';

// routing
import {
  BrowserRouter, Routes, Route,
  Link, Outlet
} from 'react-router-dom';

// components
import Menu from './components/Menu';
import SignIn from './routes/signin';
import Home from './routes/home';
import Posts from './routes/posts'

function App() {
  // state
  const [token, setToken] = useState('');

  // first load -> get token from localStorage
  // TODO

  const saveToken = (token) => {
    // TODO
    // save in localStorage
    // set state
    setToken(token);
  }
  const destroyToken = (token) => {
    // TODO
  }

  const handleSigninSubmit = async (username, password) => {
    // send post to server
    fetch(
      `${process.env.REACT_APP_BACKEND_URI}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password })
      }
    ).then(response => {
      if (!response.ok) {
        const err = new Error(response.error);
        err.status = response.status;
        throw err;
      }
      return response.json();
    })
    .then(data => {
      saveToken(data.token);
    })
    .catch( (error) => {
      console.error(error);
    })
  }

  return (
    <div className="App">
      <menu>
        <Link to="/home">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to='/signin'>Sign in</Link>
      </menu>

      <Routes>
        <Route path='signin' element={
          <SignIn
            handleSigninSubmit={handleSigninSubmit}
          />
        } />

        <Route path='home' element={<Home />} />
        <Route path='posts' element={<Posts />} />
        

        <Route path='*' element={
          <main><p>404 not found</p></main>
        } />
      </Routes>
    </div>
  );
}

export default App;


