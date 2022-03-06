import './App.css';

// react
import { useState } from 'react';

// routing
import { Link, Outlet } from 'react-router-dom';

// components
import Menu from './components/Menu';

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
        <Link to='/signin'
          handleSigninSubmit={handleSigninSubmit}
        >Sign in</Link>
      </menu>

      <Outlet />
    </div>
  );
}

export default App;
