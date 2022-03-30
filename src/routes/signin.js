// react
import { useState } from 'react';

// router

const SignIn = (props) => {
  // props
  const { handleSigninSubmit } = props;

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    handleSigninSubmit(username, password);
  }

  return (
    <main className='singlePage'>
      <header className='hero'>
        <div className='pageTitle'>
          <h1>Sign in</h1>
        </div>
      </header>
      
      <div className='singlePageWrapper'>

        { props.children }

        <form onSubmit={submitForm} >

          <label htmlFor='username'>Email or username</label>
          <input
            type='text'
            required
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            required={true}
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type='submit'>Sign in</button>

        </form>
      </div>
    </main>
  );
};

export default SignIn;