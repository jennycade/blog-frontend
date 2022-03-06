// react
import { useState } from 'react';

const SignIn = (props) => {
  // props
  const { handleSigninSubmit } = props;
  // TODO

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    handleSigninSubmit(username, password);
  }

  return (
    <main>
      <h1>Sign in</h1>
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

        <input type='submit'/>

      </form>
    </main>
  );
};

export default SignIn;