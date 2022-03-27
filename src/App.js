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
import SuccessMessage from './components/SuccessMessage';

function App() {
  // state
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]); // TODO: unset errors appropriately
  const [successMessage, setSuccessMessage] = useState(''); // e.g. "You have successfully registered"

  // routing
  const navigate = useNavigate();

  // AUTH

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
    setErrors([]);
    setSuccessMessage('Signed out');
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
    // TODO: wrap in try/catch block?
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/login`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username, password })
      }
    );
    const json = await response.json();
    
    // errors?
    if (!response.ok) {
      setErrors([json.error]);
      setSuccessMessage('');
    } else {
      setErrors([]);
      setSuccessMessage('Successfully signed in');
      saveAuth(json.token, json.user);
      
      // redirect
      navigate(`/`);
      // TODO: navigate to previous page? At least sometimes?
    }
  }

  const handleRegisterSubmit = async (username, password, displayName) => {

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/users`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ username, password, displayname: displayName, iscommenter: 'true' })
      }
    );
    const json = await response.json();
    
    if (!response.ok) {
      setErrors([json.error]);
      // TODO: Split list of validation errors e.g.
      // "Validation errors: Username required, Password required, Display name required"
      setSuccessMessage('');
    } else {
      setErrors([]);

      setSuccessMessage('You have successfully registered. Sign in with your new username and password.');

      // TODO: navigate to /signin with timeout
    }
  }

  // COMMENTS

  // post comment
  const postComment = async (postId, text) => {
    if (token === '') { // not logged in
      setErrors(['You must be logged in to post a comment']);
      setSuccessMessage('');
    } else {
      // data to send
      const commentData = {
        text,
      };

      // fetch
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(commentData),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setErrors([json.error]);
        setSuccessMessage('');
      } else {
        setErrors([]);
        setSuccessMessage('Comment posted');
        // TODO: prompt post comments to re-render?
      }
    }
  }

  // update comment
  const updateComment = async (commentId, text) => {
    if (token === '') { // not logged in
      setErrors(['You are not logged in']);
      setSuccessMessage('');
    } else {
      // data to send
      const commentData = {
        text,
      };

      // fetch
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/comments/${commentId}`,
        {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(commentData),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setErrors([json.error]);
        setSuccessMessage('');
      } else {
        setErrors([]);
        setSuccessMessage('Comment updated');
      }
    }
  }

  // delete comment
  const deleteComment = async (commentId) => {
    if (token === '') { // not logged in
      setErrors(['You are not logged in']);
      setSuccessMessage('');
    } else {
      // fetch
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URI}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: getHeaders(),
        }
      );
      if (!response.ok) {
        const json = await response.json();
        setErrors([json.error]);
        setSuccessMessage('');
      } else {
        setErrors([]);
        setSuccessMessage('Comment deleted');
      }
    }
  }

  // get all posts
  const getPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/posts`,
      { headers: getHeaders(), }
    )
    const json = await response.json();
    if (!response.ok) {
      setErrors([json.error]);
      setSuccessMessage('');
      return [];
    } else {
      setErrors([]);
      setSuccessMessage('');
      return json;
    }
  }

  // get one post
  const getPost = async (postId) => {
    // TODO: Handle error (e.g. not authorized -> display message and redirect)
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/posts/${postId}`,
      { headers: getHeaders(), }
    );
    const json = await response.json();
    if (!response.ok) {
      setErrors([json.error]);
      setSuccessMessage('');
      return {};
    } else {
      setErrors([]);
      setSuccessMessage('');
      return json;
    }
  }

  // get one user
  const getUser = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URI}/users/${userId}`,
      { headers: getHeaders(), }
    );
    const json = await response.json();
    if (!response.ok) {
      setErrors([json.error]);
      setSuccessMessage('');
      return {};
    } else {
      setErrors([]);
      setSuccessMessage('');
      return json;
    }
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

      <Routes>

        {/* auth */}
        <Route path='signin' element={
          <SignIn
            handleSigninSubmit={handleSigninSubmit}
          >
            <ErrorsList errors={errors} />
            <SuccessMessage successMessage={successMessage} />
          </SignIn>
        } />
        <Route path='register' element={
          <Register
            handleRegisterSubmit={handleRegisterSubmit}
          >
            <ErrorsList errors={errors} />
            <SuccessMessage successMessage={successMessage} />
          </Register>
        } />

        {/* index - posts */}
        <Route index element={<Posts getPosts={getPosts}>
            <ErrorsList errors={errors} />
            <SuccessMessage successMessage={successMessage} />
          </Posts>}
        />
        
        {/* posts */}
        <Route path='posts' element={<><Outlet /></> }>
          <Route index element={<Posts getPosts={getPosts}>
              <ErrorsList errors={errors} />
              <SuccessMessage successMessage={successMessage} />
            </Posts> }
          />
          <Route path=':postId' element={
            <SinglePost
              getPost={getPost}
              postComment={postComment}
              updateComment={updateComment}
              deleteComment={deleteComment}
              isLoggedIn={token !== ''}
              userId={user._id}
            >
              <ErrorsList errors={errors} />
              <SuccessMessage successMessage={successMessage} />
            </SinglePost>
          } />
        </Route>
        <Route path='users' element={<><Outlet /></>} >
          <Route path=':userId' element={
            <User getUser={getUser}>
              <ErrorsList errors={errors} />
              <SuccessMessage successMessage={successMessage} />
            </User>}
          />
        </Route>
        

        <Route path='*' element={
          <main><ErrorsList errors={['404 Not found']} />
          <SuccessMessage successMessage={successMessage} /></main>
        } />
      </Routes>
      
    </div>
  );
}

export default App;


