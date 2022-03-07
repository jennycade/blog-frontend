import './App.css';

// react
import { useState } from 'react';

// routing
import {
  Routes, Route,
  Link,
  useNavigate,
} from 'react-router-dom';

// components
import SignIn from './routes/signin';
import Home from './routes/home';
import Posts from './routes/posts'

function App() {
  // state
  const [token, setToken] = useState('');

  // routing
  const navigate = useNavigate();

  // error handling
  const handleResponse = (response) => {
    if (!response.ok) {
      const err = new Error(response.error);
      err.status = response.status;
      throw err;
    }
    return response.json();
  }

  // first load -> get token from localStorage
  // TODO

  const saveToken = (token) => {
    // save in localStorage
    localStorage.setItem('token', token);
    // set state
    setToken(token);
  }
  const destroyToken = (token) => {
    localStorage.removeItem('token');
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
    ).then(response => handleResponse(response))
    .then(data => {
      saveToken(data.token);
      // redirect
      navigate(`/`);
    })
    .catch( (error) => {
      // TODO: Catch sign in errors
      console.error(error);
    });
  }

  // get all posts
  const getPosts = async () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URI}/posts`,
      {
        headers: {
          'Authorization': `Bearer: ${token}`
        }
      }
    ).then(response => handleResponse(response))
    .then(data => {
      return data;
    })
    .catch( (err) => {
      console.error(err);
    });
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
        <Route path='posts' element={<Posts getPosts={getPosts} />} />
        

        <Route path='*' element={
          <main><p>404 not found</p></main>
        } />
      </Routes>
    </div>
  );
}

export default App;


