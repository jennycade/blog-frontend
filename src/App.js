import './App.css';

// react
import { useEffect, useState } from 'react';

// routing
import {
  Routes, Route,
  Link,
  useNavigate,
} from 'react-router-dom';

// components
import SignIn from './routes/signin';
import Posts from './routes/posts'

function App() {
  // state
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  // routing
  const navigate = useNavigate();

  // error handling
  const handleResponse = async (response) => {
    if (!response.ok) {
      const err = new Error(response.error);
      err.status = response.status;
      throw err;
    }
    return await response.json();
  }

  // first load -> get token and user from localStorage
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken !== token) {
      setToken(localToken);
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [token]);

  const saveAuth = (token, user) => {
    // save in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // set state
    setToken(token);
    setUser(user);
  }
  const destroyToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser({});
  }
  const getHeaders = () => {
    const result = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    if (token !== '') {
      result.set('Authorization', `Bearer ${token}`);
    }
    return result;
  }

  const handleSigninSubmit = async (username, password) => {
    // send post to server
    fetch(
      `${process.env.REACT_APP_BACKEND_URI}/login`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username, password })
      }
    ).then(response => handleResponse(response))
    .then(data => {
      saveAuth(data.token, data.user);
      
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
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/posts`,
      { headers: getHeaders(), }
    )
    if (!response.ok) {
      const err = new Error(response.error);
      err.status = response.status;
      throw err;
    }
    const json = await response.json();
    return json;
  }

  return (
    <div className="App">
      <menu>
        <Link to="/">All posts</Link>
        { !!token ?
          <>
            <p>Welcome {user.displayName}</p>
            <button onClick={destroyToken}>
              Sign out
            </button>
          </>
          :
          <>
            <Link to='/signup'>Register</Link>
            <p> or </p>
            <Link to='/signin'>Sign in</Link>
          </>
          
        }
        
      </menu>

      <Routes>
        <Route path='signin' element={
          <SignIn
            handleSigninSubmit={handleSigninSubmit}
          />
        } />

        <Route index element={<Posts getPosts={getPosts} />} />
        

        <Route path='*' element={
          <main><p>404 not found</p></main>
        } />
      </Routes>
    </div>
  );
}

export default App;


