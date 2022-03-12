import './App.css';

// react
import { useEffect, useState } from 'react';

// routing
import {
  Routes, Route,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';

// route components
import SignIn from './routes/signin';
import Posts from './routes/posts'
import SinglePost from './routes/singlePost';
import User from './components/User';
import Register from './routes/register';
import ErrorsList from './components/ErrorsList';

function App() {
  // state
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);

  // routing
  const navigate = useNavigate();

  // error handling
  const handleResponse = (response) => {
    if (!response.ok) {
      const err = new Error(response.error);
      err.status = response.status;
      throw(err);
    }
    return response;
  }
  const getErrors = () => {
   return errors; 
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
  const destroyAuthData = () => {
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
    ).then(response => handleResponse(response)) // TODO: check this
    .then(response => response.json())
    .then(data => {
      saveAuth(data.token, data.user);
      
      // redirect
      navigate(`/`);
    })
    .catch( (error) => {
      // TODO: Catch sign in errors
      setErrors({...errors, error});
    });
  }
  const handleRegisterSubmit = async (username, password, displayName) => {
    // send post to server
    try { 
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/users`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ username, password, displayname: displayName, iscommenter: 'true' })
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setErrors({...errors, err});
    }
  }

  // post comment
  const postComment = async (postId, text) => {
    // TODO
    console.log(text);
  }

  // update comment
  // TODO

  // delete comment
  // TODO

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

  // get one posts
  const getPost = async (postId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}`,
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

  // get one user
  const getUser = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/users/${userId}`,
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
      <menu className={`mainNav${token === '' ? ' notSignedIn' : ''}`}>
        <Link to="/">All posts</Link>
        <div className='authWrapper'>
          { !!token ?
          <>
            <Link to={`/users/${user._id}`}>{user.displayName}</Link>
            <button onClick={destroyAuthData}>
              Sign out
            </button>
          </>
          :
          <>
            <Link to='/register'>Register</Link>
            <Link to='/signin'>Sign in</Link>
          </>
          }
        </div>
        
      </menu>
      { errors.length > 0 &&
        <ErrorsList errors={errors} />
      }

      <Routes>

        {/* auth */}
        <Route path='signin' element={
          <SignIn
            handleSigninSubmit={handleSigninSubmit}
            getErrors={getErrors}
          />
        } />
        <Route path='register' element={
          <Register
            handleRegisterSubmit={handleRegisterSubmit}
            getErrors={getErrors}
          />
        } />

        {/* index - posts */}
        <Route index element={<Posts getPosts={getPosts} />} />
        
        {/* posts */}
        <Route path='posts' element={<><Outlet /></> }>
          <Route index element={<Posts getPosts={getPosts} /> } />
          <Route path=':postId' element={
            <SinglePost
              getPost={getPost}
              postComment={postComment}
              isLoggedIn={token !== ''}
            />
          } />
        </Route>
        <Route path='users' element={<><Outlet /></>} >
          <Route path=':userId' element={<User getUser={getUser} />} />
        </Route>
        

        <Route path='*' element={
          <main><p>404 not found</p></main>
        } />
      </Routes>
    </div>
  );
}

export default App;


