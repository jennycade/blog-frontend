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
  }
  const destroyToken = (token) => {
    // TODO
  }

  const handleSigninSubmit = async (username, password) => {
    // send post to server
    fetch(
      process.env.REACT_APP_BACKEND_URI,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }
    ).then(response => response.json())
    .then(data => console.log('Signed in!' + data))
  }

  return (
    <div className="App">
      <menu>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to='/signin'>Sign in</Link>
      </menu>

      <BrowserRouter>
        <Routes>
          
            <Route path='signin' element={
              <SignIn
                handleSigninSubmit
              />
            } />

            <Route path='home' element={<Home />} />
            <Route path='posts' element={<Posts />} />
            

            <Route path='*' element={
              <main><p>404 not found</p></main>
            } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


