import { useState } from 'react';

const Register = (props) => {
  const { handleRegisterSubmit } = props;

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errors, setErrors] = useState([]);

  // functions wooooooo
  const submitForm = (e) => {
    e.preventDefault();

    // check passwords
    if (password === password2) {
      // submit
      handleRegisterSubmit(username, password, displayName);
    } else {
      // passwords don't match
      const passwordErrorMessage = 'Passwords do not match';
      // don't add if it's already there
      if (!errors.includes(passwordErrorMessage)) {
        const newErrors = [...errors];
        newErrors.push(passwordErrorMessage);
        setErrors(newErrors);
      }
    }
  }

  return (
    <main>
      <h1>Register</h1>
      { errors.length > 0 &&
        <div className='error'>
          Errors:
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      }
      <form onSubmit={submitForm} >
        <label htmlFor='username'>Email or username (private)</label>
        <input type='text'
          required
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <input type='password'
          required
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor='password2'>Re-enter your password</label>
        <input type='password'
          required
          id='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <label htmlFor='displayName'>Display name (public)</label>
        <input type='text'
          required
          id='displayName'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type='submit' />
        
      </form>
    </main>
  );
};

export default Register;